import { NextRequest, NextResponse } from "next/server";
import {
  createPublicClient,
  createWalletClient,
  decodeEventLog,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import {
  XPILOT_PORTFOLIO_REGISTRY_ABI,
  XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
} from "../../../lib/contract";

type HexPrivateKey = `0x${string}`;

type SaveResponse = {
  success: true;
  portfolioId: string | null;
  txHash: `0x${string}`;
  blockNumber: string;
  logCount: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, strategy, risk, assets } = body ?? {};

    if (!prompt || !strategy || !risk || !assets || !Array.isArray(assets)) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const account = privateKeyToAccount(
      process.env.ANVIL_PRIVATE_KEY as HexPrivateKey
    );

    const walletClient = createWalletClient({
      account,
      chain: foundry,
      transport: http("http://127.0.0.1:8545"),
    });

    const publicClient = createPublicClient({
      chain: foundry,
      transport: http("http://127.0.0.1:8545"),
    });

    const symbols = assets.map((asset: any) => asset.symbol);
    const weights = assets.map((asset: any) => asset.weight);

    const hash = await walletClient.writeContract({
      address: XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
      abi: XPILOT_PORTFOLIO_REGISTRY_ABI,
      functionName: "createPortfolio",
      args: [prompt, strategy, risk, symbols, weights],
      account,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    let portfolioId: string | null = null;

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: XPILOT_PORTFOLIO_REGISTRY_ABI,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName === "PortfolioCreated") {
          const args = decoded.args as { portfolioId: bigint };
          portfolioId = args.portfolioId.toString();
          break;
        }
      } catch {
        // ignore unrelated logs
      }
    }

    const response: SaveResponse = {
      success: true,
      portfolioId,
      txHash: hash,
      blockNumber: receipt.blockNumber.toString(),
      logCount: receipt.logs.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save portfolio onchain" },
      { status: 500 }
    );
  }
}
