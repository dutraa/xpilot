import { XPILOT_PORTFOLIO_REGISTRY_ABI } from "./abi/xpilotPortfolioRegistry";

type HexAddress = `0x${string}`;

export const XPILOT_PORTFOLIO_REGISTRY_ADDRESS =
  process.env.NEXT_PUBLIC_REGISTRY_ADDRESS as HexAddress;

export { XPILOT_PORTFOLIO_REGISTRY_ABI };
