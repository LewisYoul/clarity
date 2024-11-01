import LoggedInHeader from "../components/LoggedInHeader"
import { authorizeRequest } from "../utils/sessionUtils"
import dynamic from 'next/dynamic'
import ListList from "../components/ListList"


const TasksList = dynamic(() => import('../components/TasksList'), {
  ssr: false
})

export default async function Dashboard() {
  const { currentTeam } = await authorizeRequest()

  return (
    <div className="bg-white h-full min-h-screen flex flex-col">
      <LoggedInHeader initialTeam={currentTeam} />

      <div className="flex flex-1 w-full border-t border-gray-200">
        <ListList />

        <div className="w-full">
          <TasksList />
        </div>
      </div>
    </div>
  )
}