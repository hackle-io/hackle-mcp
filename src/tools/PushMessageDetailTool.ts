import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface PushMessageDetailInput {
  pushMessageId: number;
}

class PushMessageDetailTool extends MCPTool<PushMessageDetailInput> {
  name = "push-message-detail";
  description = "Fetch push message detail.";

  schema = {
    pushMessageId: {
      type: z.number(),
      description: "push message id",
    },
  };

  async execute({ pushMessageId }: PushMessageDetailInput) {
    return await WebClient.get(`/api/v1/push-messages/${pushMessageId}`);
  }
}

export default PushMessageDetailTool;
