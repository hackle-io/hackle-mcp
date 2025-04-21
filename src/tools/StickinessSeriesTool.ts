import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface StickinessSeriesInput {
  unit: "DAY" | "WEEK" | "MONTH";
  date?: string;
}

class StickinessSeriesTool extends MCPTool<StickinessSeriesInput> {
  name = "stickiness-series";
  description = "Fetches stickiness series";

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

  async execute({ unit = "DAY", date }: StickinessSeriesInput) {
    return await WebClient.get(
      `/api/v1/workspaces/auto-metrics/stickiness-series?unit=${unit}&date=${date}`
    );
  }
}

export default StickinessSeriesTool;
