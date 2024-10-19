import LoggedInHeader from "../components/LoggedInHeader"
import { options } from "../api/auth/[...nextauth]/options"
import { authorizeRequest } from "../utils/sessionUtils"
import dynamic from 'next/dynamic'
import prisma from "../utils/prisma"


const TasksList = dynamic(() => import('../components/TasksList'), {
  ssr: false
})

export default async function Dashboard() {
  const { currentUser, currentTeam } = await authorizeRequest()
  const tasks = await prisma.Task.findMany({
    where: {
      teamId: currentTeam.id,
    },
  })

  const openNewTaskModal = () => {
    console.log('openNewTaskModal')


  }

  console.log('tasks', tasks)

  return (
    <div className="bg-white h-full min-h-screen">
      <div className="max-w-6xl m-auto">
        <LoggedInHeader/>

        <TasksList />
      </div>
    </div>
  )
}