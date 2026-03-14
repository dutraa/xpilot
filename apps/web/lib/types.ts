export interface PortfolioAsset {
  symbol: string;
  weight: number;
}

export interface PortfolioResponse {
  strategy: string;
  risk: string;
  assets: PortfolioAsset[];
  explanation: string[];
}

export interface SavedPortfolio {
  id: string;
  owner: string;
  prompt: string;
  strategy: string;
  risk: string;
  assets: string[];
  weights: number[];
  createdAt: string;
}

export interface LoadedPortfolioFromChain {
  prompt: string;
  portfolio: PortfolioResponse;
  savedPortfolioId: string;
}
