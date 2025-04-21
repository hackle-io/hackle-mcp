import { MCPTool } from "mcp-framework";
import { z } from "zod";
import WebClient from "../module/WebClient.js";

interface ActiveUserSeriesInput {
  unit: "DAY" | "WEEK" | "MONTH";
  date?: string;
}

class ActiveUserSeriesTool extends MCPTool<ActiveUserSeriesInput> {
  name = "active-user-series";
  description = "Fetches active user series";

  schema = {
    unit: {
      type: z.enum(["DAY", "WEEK", "MONTH"]),
      description:
        "Specifies the time unit for metric data. Data can be aggregated on a daily (DAY), weekly (WEEK), or monthly (MONTH) basis.",
    },
    date: {
      type: z.string().optional(),
      description: "The date in yyyy-mm-dd format to query to (inclusive)",
    },
  };

  async execute({ unit = "DAY", date }: ActiveUserSeriesInput) {
    return await WebClient.get(
      `/api/v1/workspaces/auto-metrics/active-user-series?unit=${unit}&date=${date}`
    );
  }
}

export default ActiveUserSeriesTool;
