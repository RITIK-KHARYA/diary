import { CreateOrganization } from "@clerk/nextjs";
import { createRouteHandler } from "uploadthing/next";
import { filerouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: filerouter,
});
