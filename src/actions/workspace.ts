"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: { clerkId: user.id },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });
    if (isUserInWorkspace)
      return { status: 200, data: { workspace: isUserInWorkspace } };
    return { status: 403, data: { workspace: null } };
  } catch (error) {
    console.error("Error verifying access to workspace:", error);
    return { status: 500, data: { workspace: null } };
  }
};
