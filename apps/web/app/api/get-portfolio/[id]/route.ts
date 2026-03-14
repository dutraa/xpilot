import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { foundry } from "viem/chains";
import {
  XPILOT_PORTFOLIO_REGISTRY_ABI,
  XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
} from "../../../../lib/contract";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const portfolioId = BigInt(params.id);

    const publicClient = createPublicClient({
      chain: foundry,
      transport: http("http://127.0.0.1:8545"),
    });

    const result = await publicClient.readContract({
      address: XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
      abi: XPILOT_PORTFOLIO_REGISTRY_ABI,
      functionName: "getPortfolio",
      args: [portfolioId],
    });

    const [owner, prompt, strategy, risk, assets, weights, createdAt] = result;

    return NextResponse.json({
      success: true,
      portfolio: {
        id: portfolioId.toString(),
        owner,
        prompt,
        strategy,
        risk,
        assets,
        weights: weights.map((weight) => Number(weight)),
        createdAt: createdAt.toString(),
      },
    });
  } catch (error: any) {
    const message =
      typeof error?.shortMessage === "string"
        ? error.shortMessage
        : typeof error?.message === "string"
        ? error.message
        : "Unknown error";

    const isMissingPortfolio =
      message.includes("Portfolio not found") ||
      message.includes('returned no data ("0x")') ||
      message.includes("address is not a contract");

    if (isMissingPortfolio) {
      return NextResponse.json(
        {
          success: false,
          error: "Portfolio not available on the current local chain",
        },
        { status: 404 }
      );
    }

    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio from registry" },
      { status: 500 }
    );
  }
}
