import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

export async function DELETE(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const params = req.nextUrl.searchParams;
  const listId = Number(params.get('id'));

  try {
    await prisma.$transaction(async (tx) => {
      await tx.Task.deleteMany({
        where: {
          teamId: currentTeam.id,
        },
      })

      const personalTeamId = await tx.Team.findFirst({
        where: {
          name: "Personal",
          teamUsers: {
            some: {
              userId: currentUser.id
            }
          }
        },
        select: {
          id: true
        }
      }).then(team => team.id)

      // Update users' currentTeamId who have this team as their current team
      await tx.User.updateMany({
        where: {
          currentTeamId: listId
        },
        data: {
          // Set to their personal team (where name is "Personal" and they are a member)
          currentTeamId: personalTeamId
        }
      });

      await tx.TeamUser.deleteMany({
        where: {
          teamId: listId
        }
      })

      await tx.Team.delete({
        where: {
          id: listId
        }
      })
    })

    return Response.json({ message: 'List deleted successfully' })
  } catch (error) {
    console.error(error)

    return Response.json({ message: 'There was a problem deleting this list. If this problem continues please contact us.' }, { status: 500 })
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

export async function POST(req) {
  const { currentUser } = await authorizeRequest();

  if (!currentUser) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, collaborators } = body;

  try {
    await prisma.$transaction(async (tx) => {
      const newTeam = await tx.Team.create({
        data: {
          name: name,
        }
      })

      await tx.TeamUser.create({
        data: {
          userId: currentUser.id,
          teamId: newTeam.id,
        }
      })

      // Find all users in the collaborators array
      const collaboratorUsers = await Promise.all(
        collaborators.map(async (email) => {
          return await tx.User.findUnique({
            where: { email: email },
          });
        })
      );

      // Filter out any null results (emails not found)
      const existingUsers = collaboratorUsers.filter((user) => user !== null);

      // Create TeamUser entries for existing users
      for (const user of existingUsers) {
        await tx.TeamUser.create({
          data: {
            userId: user.id,
            teamId: newTeam.id,
          },
        });
      }

      // Update the currentTeamId for the currentUser
      await tx.User.update({
        where: { id: currentUser.id },
        data: { currentTeamId: newTeam.id },
      });
    })

    return Response.json({ message: 'Team created successfully' });
  } catch (error) {
    console.error('Error creating team:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

