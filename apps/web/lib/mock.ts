import type { Recommendation } from './types';

export const demoRecommendation: Recommendation = {
  strategy: 'AI Growth',
  risk: 'moderate',
  amount: 1000,
  assets: [
    { symbol: 'NVDAx', weight: 35 },
    { symbol: 'MSFTx', weight: 25 },
    { symbol: 'METAx', weight: 20 },
    { symbol: 'GOOGLx', weight: 20 }
  ],
  reasoning: [
    'Selected large-cap AI leaders with strong platform and infrastructure exposure.',
    'Capped single-name weight to reduce concentration risk.',
    'Built for medium-risk growth with diversified mega-cap exposure.'
  ],
  rebalanceTrigger: 'Weekly or if any position drifts by more than 5%.'
};
