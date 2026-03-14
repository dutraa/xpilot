export type RiskLevel = 'low' | 'moderate' | 'high';

export interface AllocationItem {
  symbol: string;
  weight: number;
}

export interface Recommendation {
  strategy: string;
  risk: RiskLevel;
  amount: number;
  assets: AllocationItem[];
  reasoning: string[];
  rebalanceTrigger: string;
}
