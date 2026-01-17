import { ErrorResponse } from "./Response";

export const asyncHandler =
  (fn: (event: any, context: any) => Promise<any>) =>
  async (event: any, context: any) => {
    try {
      return await fn(event, context);
    } catch (err: any) {
      console.error("Lambda Error:", err);

      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      return ErrorResponse(statusCode, message);
    }
  };
