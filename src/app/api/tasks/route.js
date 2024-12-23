import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

export async function GET(req) {
  const { currentUser, currentTeam } = await authorizeRequest();
  
  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let openTasks = await prisma.Task.findMany({
    where: {
      teamId: currentTeam.id,
      completedAt: null,
    },
    orderBy: {
      id: 'desc',
    },
  })

  let completedTasks = await prisma.Task.findMany({
    where: {
      teamId: currentTeam.id,
      completedAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of current day
        not: null,
      },
    },
    orderBy: {
      completedAt: 'desc',
    },
  })

  const response = {
    openTasks,
    completedTasks,
  }

  return Response.json({ data: response })
}

export async function DELETE(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  const params = req.nextUrl.searchParams;
  const taskId = Number(params.get('id'));

  try {
    await prisma.Task.delete({
      where: {
        id: taskId,
        teamId: currentTeam.id,
      },
    })

    return Response.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error);
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}


export async function POST(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await req.json();

  try {
    const task = await prisma.Task.create({
      data: {
        teamId: currentTeam.id,
        userId: currentUser.id,
        title: body.title,
      }
    })

    console.log('TASK', task)

    return Response.json({ message: 'Task created', data: task })
  } catch(error) {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  const params = req.nextUrl.searchParams;
  const taskId = Number(params.get('id'));
  const body = await req.json();

  try {
    const task = await prisma.Task.update({
      where: {
        id: taskId,
        teamId: currentTeam.id,
      },
      data: {
        completedAt: body.completedAt,
      }
    })

    return Response.json({ message: 'Task updated', data: task })
  } catch(error) {
    return Response.json({ message: 'Task not found' }, { status: 404 })
  }
}