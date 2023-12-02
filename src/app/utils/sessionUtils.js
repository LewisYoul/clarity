import { getServerSession } from 'next-auth/next'
import { options } from "../api/auth/[...nextauth]/options";
import { PrismaClient } from '@prisma/client';

export async function authorizeRequest() {
  const session = await getServerSession(options)
  const unauthorizedObject = { currentUser: null, currentTeam: null };

  if (!session || !session.user || !session.team) {
    return unauthorizedObject;
  }

  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

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
      id: session.team.id
    }
  })

  if (!currentTeam) {
    return unauthorizedObject;
  }

  return { currentUser, currentTeam };
}