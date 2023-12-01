// import { getServerSession } from 'next-auth/next'
// import { options } from "../api/auth/[...nextauth]/options";
// import { PrismaClient } from '@prisma/client';

// export async function authorizeSession() {
//   const session = await getServerSession(options)

//   console.log('session', session)

//   if (!session || !session.user || !session.team) {
//     return Response.json({ message: 'Unauthorized' }, { status: 401 })
//   }

//   const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//   })

//   const currentUser = await prisma.user.findUnique({
//     where: {
//       id: session.user.id
//     }
//   })

//   if (!currentUser) {
//     return Response.json({ message: 'Unauthorized' }, { status: 401 })
//   }

//   const currentTeam = await prisma.team.findUnique({
//     where: {
//       id: session.team.id
//     }
//   })

//   if (!currentTeam) {
//     return Response.json({ message: 'Unauthorized' }, { status: 401 })
//   }
// }