import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface ExperimentDetailInput {
  experimentId: number;
}

class ExperimentDetailTool extends MCPTool<ExperimentDetailInput> {
  name = "experiment-detail";
  description = "Fetch a experiment(A/B Test) detail.";

  schema = {
    experimentId: {
      type: z.number(),
      description: "experiment id",
    },
  };

  async execute(input: ExperimentDetailInput) {
    return await WebClient.get(`/api/v1/experiments/${input.experimentId}`);
  }
}

export default ExperimentDetailTool;
