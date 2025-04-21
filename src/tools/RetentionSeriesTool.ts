import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface RetentionSeriesInput {
  unit: "DAY" | "WEEK" | "MONTH";
  date?: string;
}

class RetentionSeriesTool extends MCPTool<RetentionSeriesInput> {
  name = "retention-series";
  description = "Fetches user retention series";

  schema = {
    unit: {
      type: z.enum(["DAY", "WEEK", "MONTH"]),
      description:
        "Specifies the time unit for metric data. Data can be aggregated on a daily (DAY), weekly (WEEK), or monthly (MONTH) basis.",
    },
    date: {
      type: z.string(),
      description: "The date in yyyy-mm-dd format to query to (inclusive)",
    },
  };

  async execute({ unit = "DAY", date }: RetentionSeriesInput) {
    return await WebClient.get(
      `/api/v1/workspaces/auto-metrics/retention-series?unit=${unit}&date=${date}`
    );
  }
}

export default RetentionSeriesTool;
