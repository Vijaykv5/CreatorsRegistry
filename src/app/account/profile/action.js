"use server";

import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function profileUpdate(formData) {
  const bio = formData.get("bio");

  // check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    throw Error("Not authenticated");
  }

  // save to db
  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio },
  });
}
