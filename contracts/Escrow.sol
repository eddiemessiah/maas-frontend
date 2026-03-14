// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Escrow
 * @dev On-chain Escrow for Machine-to-Machine Payments using ERC-20 tokens (USDC, etc.).
 * Designed for x402 compliance to facilitate paid API services and compute tasks.
 */

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract Escrow {
    struct Job {
        uint256 jobId;
        address client; // The agent requesting work
        address provider; // The agent fulfilling work
        uint256 amount;
        address token;
        bool isCompleted;
        bool isRefunded;
    }

    uint256 public nextJobId;
    mapping(uint256 => Job) public jobs;

    event JobCreated(uint256 indexed jobId, address indexed client, address indexed provider, uint256 amount, address token);
    event JobCompleted(uint256 indexed jobId, string resultCid); // Emitting Filecoin CID of the computation result
    event JobRefunded(uint256 indexed jobId);

    // Creates an escrowed payment for an agent-to-agent task
    function createJob(address _provider, address _token, uint256 _amount) external returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer tokens from the calling agent to this escrow contract
        require(IERC20(_token).transferFrom(msg.sender, address(this), _amount), "Token transfer failed (check allowance)");

        uint256 jobId = nextJobId++;
        jobs[jobId] = Job({
            jobId: jobId,
            client: msg.sender,
            provider: _provider,
            amount: _amount,
            token: _token,
            isCompleted: false,
            isRefunded: false
        });

        emit JobCreated(jobId, msg.sender, _provider, _amount, _token);
        return jobId;
    }

    // Resolves the job, pushing funds to the provider agent. Includes the Filecoin CID of the result.
    function completeJob(uint256 _jobId, string memory _resultCid) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client || msg.sender == job.provider, "Not authorized to complete");
        require(!job.isCompleted && !job.isRefunded, "Job already resolved");

        job.isCompleted = true;
        
        // Pay the provider agent
        require(IERC20(job.token).transfer(job.provider, job.amount), "Transfer to provider failed");

        emit JobCompleted(_jobId, _resultCid);
    }

    // Refunds the client agent if the provider fails to complete the task
    function refundJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client || msg.sender == job.provider, "Not authorized to refund");
        require(!job.isCompleted && !job.isRefunded, "Job already resolved");

        job.isRefunded = true;
        
        // Return funds to the client agent
        require(IERC20(job.token).transfer(job.client, job.amount), "Refund transfer failed");

        emit JobRefunded(_jobId);
    }
}