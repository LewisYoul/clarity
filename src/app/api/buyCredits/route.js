import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

const packs = {
  single: 1,
  basic: 3,
  medium: 5,
  large: 10
}


export async function POST(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  console.log('req', body)

  const creditsToCreate = new Array(packs[body.packType]).fill({ teamId: currentTeam.id })

  console.log('creditsToCreate', creditsToCreate)
  await prisma.credit.createMany({
    data: creditsToCreate
  })

  return Response.json({ message: "Purchase complete!" })
}