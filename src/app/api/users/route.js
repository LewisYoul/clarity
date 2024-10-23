import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

export async function PUT(req) {
  const { currentUser } = await authorizeRequest();

  if (!currentUser) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { currentTeamId } = body;

  if (!currentTeamId) {
    return Response.json({ message: 'currentTeamId is required' }, { status: 400 });
  }

  // Check if the currentTeamId is in the list of teams the currentUser has access to
  const userTeams = await prisma.TeamUser.findMany({
    where: {
      userId: currentUser.id
    },
    select: {
      teamId: true
    }
  });

  const userTeamIds = userTeams.map(team => team.teamId);

  if (!userTeamIds.includes(currentTeamId)) {
    return Response.json({ message: 'User does not have access to this team' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.User.update({
      where: { id: currentUser.id },
      data: { currentTeamId: currentTeamId },
    });

    return Response.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


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

