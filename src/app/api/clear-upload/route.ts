import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer${process.env.CRON_SECRET}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("clearing unused media");
    const unusedMedia = await prisma.media.findMany({
      where: {
        postid: null,
        ...(process.env.NODE_ENV === "production"
          ? {
              createdAt: {
                lte: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            }
          : {}),
      },
      select: {
        id: true,
        url: true,
      },
    });
    new UTApi().deleteFiles(
      unusedMedia.map(
        (m) => m.url.split(`a/${process.env.UPLOADTHING_APP_ID}/`)[1]
      )
    );
    await prisma.media.deleteMany({
      where: {
        id: {
          in: unusedMedia.map((m) => m.id),
        },
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
