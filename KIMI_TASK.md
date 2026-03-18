# KIMI 2.5 TASK: Fix Frontend for Base Sepolia MVP

## CRITICAL: Ship Base-Only MVP Today

### Task 1: Update providers.tsx
**File:** `src/app/providers.tsx`
**Change:**
```typescript
// OLD (Celo):
import { celoSepolia } from 'wagmi/chains'
chains: [celoSepolia]

// NEW (Base):
import { baseSepolia } from 'wagmi/chains'
chains: [baseSepolia]
```

### Task 2: Update Dashboard Page
**File:** `src/app/dashboard/page.tsx`
**Changes needed:**
1. Update registry address to: `0x7B1EfF888ab6fA1C7a2ABbB8E61027B4fF332a0b`
2. Update Paymaster address: `0x87B66a6a033ECCec395E3C0FD33275755112FB07`
3. Add Deposit UI component with:
   - Input field for deposit amount (ETH)
   - "Connect Wallet" button (RainbowKit)
   - "Deposit to AgentPaymaster" button
   - Shows current balance from contract
   - Transaction status feedback

### Task 3: Create Deposit Component
**New file:** `src/app/components/DepositCard.tsx`
**Features:**
- wagmi hooks: useWriteContract, useReadContract
- Connect to AgentPaymaster.deposit() function
- Display formatted ETH values
- Loading states + success/error toasts

### Task 4: Test End-to-End
1. Connect wallet on Base Sepolia
2. Deposit 0.001 ETH to Paymaster
3. Verify balance updates in UI
4. Show working demo

## Contract Details (Base Sepolia)
- **AgentPaymaster:** `0x87B66a6a033ECCec395E3C0FD33275755112FB07`
- **AgentRegistry:** `0x7B1EfF888ab6fA1C7a2ABbB8E61027B4fF332a0b`
- **Network:** Base Sepolia (Chain ID: 84532)

## Deadline: EOD Today (Ship Mode)

Use ethskills best practices:
- Proper error handling
- Gas estimation
- Transaction confirmation waits
- Formatted ETH values (use formatEther from ethers)
