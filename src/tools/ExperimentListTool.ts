import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface ExperimentListInput {
  pageNumber?: number;
  pageSize?: number;
  experimentStatusList?: string[];
  searchKeyword?: string;
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
    searchKeyword: {
      type: z.string().optional(),
      description:
        "Parameter used to filter experiments by keyword. Allows searching for experiments containing the specified text. ",
    },
    experimentStatusList: {
      type: z.array(z.enum(["DRAFT", "EXECUTED", "COMPLETED", "ARCHIVED"])),
      description:
        "Parameter that accepts an array of experiment status values to filter experiments by their current status.",
    },
  };

  async execute({
    pageNumber = 0,
    pageSize = 100,
    searchKeyword = "",
    experimentStatusList,
  }: ExperimentListInput) {
    return await WebClient.get(
      `/api/v2/experiments?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&experimentStatusList=${
        experimentStatusList?.toString() ?? ""
      }`
    );
  }
}

export default ExperimentListTool;
