import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface ExperimentListInput {
  pageNumber?: number;
  pageSize?: number;
  searchKeyword?: string;
}

class ExperimentListTool extends MCPTool<ExperimentListInput> {
  name = "experiment-list";
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
    searchKeyword: {
      type: z.string(),
      description:
        "Parameter used to filter experiments by keyword. Allows searching for experiments containing the specified text. ",
    },
  };

  async execute({
    pageNumber = 0,
    pageSize = 100,
    searchKeyword = "",
  }: ExperimentListInput) {
    return await WebClient.get(
      `/api/v1/experiments?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`
    );
  }
}

export default ExperimentListTool;
