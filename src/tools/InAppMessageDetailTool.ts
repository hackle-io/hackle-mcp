import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface InAppMessageDetailInput {
  inAppMessageId: number;
}

class InAppMessageDetailTool extends MCPTool<InAppMessageDetailInput> {
  name = "in-app-message-detail";
  description = "Fetch in-app-message detail.";

  schema = {
    inAppMessageId: {
      type: z.number(),
      description: "in-app-message id",
    },
  };

  async execute({ inAppMessageId }: InAppMessageDetailInput) {
    return await WebClient.get(`/api/v1/in-app-messages/${inAppMessageId}`);
  }
}

export default InAppMessageDetailTool;
