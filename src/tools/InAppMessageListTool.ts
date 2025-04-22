import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface InAppMessageListInput {
  pageNumber?: number;
  pageSize?: number;
  searchKeyword?: string;
}

class InAppMessageListTool extends MCPTool<InAppMessageListInput> {
  name = "in-app-message-list";
  description = "Fetches in-app-message list";

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
        "Parameter used to filter in-app-message by keyword. Allows searching for in-app-message containing the specified text. ",
    },
  };

  async execute({
    pageNumber = 0,
    pageSize = 100,
    searchKeyword = "",
  }: InAppMessageListInput) {
    return await WebClient.get(
      `/api/v1/in-app-messages?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`
    );
  }
}

export default InAppMessageListTool;
