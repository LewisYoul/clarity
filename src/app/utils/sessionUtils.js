import { getServerSession } from 'next-auth/next'
import { options } from "../api/auth/[...nextauth]/options";
import prisma from "./prisma";

export async function authorizeRequest() {
  const session = await getServerSession(options)
  const unauthorizedObject = { currentUser: null, currentTeam: null };

  if (!session || !session.user) {
    return unauthorizedObject;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!currentUser) {
    return unauthorizedObject;
  }

  const currentTeam = await prisma.team.findUnique({
    where: {
      id: currentUser.currentTeamId
    }
  })

  if (!currentTeam) {
    return unauthorizedObject;
  }

  return { currentUser, currentTeam };
}