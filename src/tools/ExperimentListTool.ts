import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface ExperimentListInput {
  pageNumber?: number;
  pageSize?: number;
}

class ExperimentListTool extends MCPTool<ExperimentListInput> {
  name = "fetch-experiment-list";
  description = "Fetches experiment(A/B Test) list";

  schema = {
    pageNumber: {
      type: z.number(),
      description: "page number (min 0, default 0)",
      default: 0,
    },
    pageSize: {
      type: z.number(),
      description: "Number of items to display per page (min 1, default 100)",
      default: 100,
    },
  };

  async execute({ pageNumber = 0, pageSize = 100 }: ExperimentListInput) {
    return await WebClient.get(
      `/api/v2/experiments?environmentKey=production&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}

export default ExperimentListTool;
