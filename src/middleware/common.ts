import * as cookie from "cookie";

import type { Middleware } from "waku/config";

export const themeCookieKey = "waku-jereko-theme";

const commonMiddleware: Middleware = () => {
  return async (ctx, next) => {
    const ua = ctx.req.headers["user-agent"];
    const browserMatch = ua?.match(
      /(chrome|safari|firefox|msie|trident|edge)/i,
    );
    const accurateBrowser = browserMatch ? browserMatch[0] : "unknown";

    ctx.context.ua = ua;
    ctx.context.browser = accurateBrowser;

    await next();
  };
};

export default commonMiddleware;
