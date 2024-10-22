import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

export async function GET(req) {
  const { currentUser, currentTeam } = await authorizeRequest();
  
  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let teams = await prisma.Team.findMany({
    where: {
      teamUsers: {
        some: {
          userId: currentUser.id
        }
      }
    },
    include: {
      teamUsers: true
    },
  })

  console.log('teams', teams)

  const data = {
    currentTeam: currentTeam,
    teams: teams
  }

  return Response.json({ data })
}
