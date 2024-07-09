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

  try {
    const body = await req.json()
    const creditsToCreate = new Array(packs[body.packType]).fill({ teamId: currentTeam.id })
  
    await prisma.credit.createMany({
      data: creditsToCreate
    })

    const creditsCount = await prisma.credit.count({
      where: { teamId: currentTeam.id, qrCodeId: null }
    })

    const responseJson = {
      message: `Purchase complete! ${creditsToCreate.length} credit${creditsToCreate.length > 1 ? 's' : ''} ${creditsToCreate.length > 1 ? 'have' : 'has'} been added to your account.`,
      creditsCount
    }
    return Response.json(responseJson)
  } catch {
    return Response.json({ message: 'There was a problem purchasing your credits. If this problem continues please contact us.' }, { status: 400 })
  }

}