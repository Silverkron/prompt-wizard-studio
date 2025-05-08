
interface TokenCostModel {
  model: string;
  inputPricePerMillion: number; // Price per 1M input tokens in USD
  outputPricePerMillion: number; // Price per 1M output tokens in USD
}

// Cost data from the OpenAI pricing page (as per the image)
const modelCosts: TokenCostModel[] = [
  {
    model: "gpt-4o-mini",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.60
  },
  {
    model: "gpt-4o",
    inputPricePerMillion: 2.50,
    outputPricePerMillion: 10.00
  },
  {
    model: "gpt-4.5-preview",
    inputPricePerMillion: 3.00, // Estimated, not in the provided image
    outputPricePerMillion: 15.00 // Estimated, not in the provided image
  },
  {
    model: "o1-mini",
    inputPricePerMillion: 1.10,
    outputPricePerMillion: 4.40
  },
  {
    model: "o1",
    inputPricePerMillion: 15.00,
    outputPricePerMillion: 60.00
  },
  {
    model: "o3-mini",
    inputPricePerMillion: 1.10,
    outputPricePerMillion: 4.40
  }
];

/**
 * Calculate the estimated cost for the API call based on token usage
 * @param model The model used for the API call
 * @param promptTokens Number of tokens in the prompt
 * @param completionTokens Number of tokens in the completion
 * @returns Cost in USD
 */
export function calculateTokenCost(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  const modelInfo = modelCosts.find(m => m.model === model) || modelCosts[0];
  
  const promptCost = (promptTokens / 1000000) * modelInfo.inputPricePerMillion;
  const completionCost = (completionTokens / 1000000) * modelInfo.outputPricePerMillion;
  
  return promptCost + completionCost;
}

/**
 * Format the cost as a USD currency string
 * @param cost Cost in USD
 * @returns Formatted cost string
 */
export function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}
