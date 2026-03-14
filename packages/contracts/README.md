# xPilot Contracts

This package contains the Foundry contracts for xPilot v1.

## Contract Goals

- store a user's portfolio profile
- record target weights for supported xStocks symbols
- emit events when profiles are created or updated
- avoid custody in v1

## Commands

```bash
forge build
forge test
forge script script/Deploy.s.sol:Deploy --rpc-url sepolia --broadcast
```
