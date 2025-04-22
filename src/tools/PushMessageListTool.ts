import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface PushMessageListInput {
  pageNumber?: number;
  pageSize?: number;
  searchKeyword?: string;
}

class PushMessageListTool extends MCPTool<PushMessageListInput> {
  name = "push-message-list";
  description = "Fetches push message list";

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
        "Parameter used to filter push messages by keyword. Allows searching for push messages containing the specified text.",
    },
  };

  async execute({
    pageNumber = 0,
    pageSize = 100,
    searchKeyword = "",
  }: PushMessageListInput) {
    return await WebClient.get(
      `/api/v1/push-messages?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`
    );
  }
}

export default PushMessageListTool;
