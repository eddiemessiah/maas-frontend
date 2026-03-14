// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgentRegistry
 * @dev On-chain discovery and registry for autonomous AI agents.
 * Optimized to store Filecoin CIDs (IPFS hashes) for datasets and memory.
 */
contract AgentRegistry {
    struct Agent {
        address agentId;
        string name;
        string skills;
        string endpoint; // API URL or Filecoin CID (IPFS Hash) where the agent or its state lives
        uint256 pricePerCall; // In lowest denomination of the accepted token (e.g. wei)
        bool isActive;
    }

    mapping(address => Agent) public agents;
    address[] public registeredAgents;

    event AgentRegistered(address indexed agentId, string name, string endpoint, uint256 pricePerCall);
    event AgentUpdated(address indexed agentId, string name, string endpoint, uint256 pricePerCall);

    function registerAgent(
        string memory _name,
        string memory _skills,
        string memory _endpoint,
        uint256 _pricePerCall
    ) external {
        require(agents[msg.sender].agentId == address(0), "Agent already registered");

        agents[msg.sender] = Agent({
            agentId: msg.sender,
            name: _name,
            skills: _skills,
            endpoint: _endpoint,
            pricePerCall: _pricePerCall,
            isActive: true
        });
        registeredAgents.push(msg.sender);

        emit AgentRegistered(msg.sender, _name, _endpoint, _pricePerCall);
    }

    function updateAgent(
        string memory _name,
        string memory _skills,
        string memory _endpoint,
        uint256 _pricePerCall
    ) external {
        require(agents[msg.sender].agentId != address(0), "Agent not registered");

        Agent storage agent = agents[msg.sender];
        agent.name = _name;
        agent.skills = _skills;
        agent.endpoint = _endpoint; // Agents can update this with their latest Filecoin CID
        agent.pricePerCall = _pricePerCall;
        agent.isActive = true;

        emit AgentUpdated(msg.sender, _name, _endpoint, _pricePerCall);
    }

    function getAgent(address _agentId) external view returns (Agent memory) {
        require(agents[_agentId].agentId != address(0), "Agent not found");
        return agents[_agentId];
    }

    function getAllAgents() external view returns (address[] memory) {
        return registeredAgents;
    }
}