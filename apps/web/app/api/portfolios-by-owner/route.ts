import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import {
  XPILOT_PORTFOLIO_REGISTRY_ABI,
  XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
} from "../../../lib/contract";

type HexPrivateKey = `0x${string}`;

type OwnerResponse = {
  success: true;
  owner: string;
  portfolioIds: string[];
};

export async function GET() {
  try {
    const account = privateKeyToAccount(
      process.env.ANVIL_PRIVATE_KEY as HexPrivateKey
    );

    const publicClient = createPublicClient({
      chain: foundry,
      transport: http("http://127.0.0.1:8545"),
    });

    const ids = await publicClient.readContract({
      address: XPILOT_PORTFOLIO_REGISTRY_ADDRESS,
      abi: XPILOT_PORTFOLIO_REGISTRY_ABI,
      functionName: "getPortfolioIdsByOwner",
      args: [account.address],
    });

    const response: OwnerResponse = {
      success: true,
      owner: account.address,
      portfolioIds: ids.map((id) => id.toString()),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch portfolio IDs by owner" },
      { status: 500 }
    );
  }
}
