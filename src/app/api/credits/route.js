import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

export async function GET(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const creditsCount = await prisma.credit.count({
      where: { teamId: currentTeam.id }
    });

    return Response.json({ creditsCount });
  } catch (error) {
    console.error('Error fetching credits count:', error);
    return Response.json({ message: 'Failed to fetch credits count' }, { status: 500 });
  }
}
