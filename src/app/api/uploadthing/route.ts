import { createRouteHandler } from "uploadthing/next";
import { filerouter } from "./core";
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: filerouter,
});
