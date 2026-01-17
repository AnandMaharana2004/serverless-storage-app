type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  path?: string;
  maxAge?: number;
};

function buildCookie(name: string, value: string, opts: CookieOptions = {}) {
  const parts = [`${name}=${value}`];

  if (opts.httpOnly) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  if (opts.path) parts.push(`Path=${opts.path}`);
  if (opts.maxAge) parts.push(`Max-Age=${opts.maxAge}`);

  return parts.join("; ");
}

export const SuccessResponse = (
  statusCode = 200,
  message = "Success",
  data: any = null,
  options?: {
    headers?: Record<string, string>;
    cookies?: string[];
  },
) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    cookies: options?.cookies || [],
    body: JSON.stringify({
      statusCode,
      message,
      data,
    }),
  };
};

export const ErrorResponse = (
  statusCode = 500,
  message = "Something went wrong",
  data: any = null,
) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusCode,
      message,
      data,
    }),
  };
};

export { buildCookie };
