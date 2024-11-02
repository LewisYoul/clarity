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
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <LoggedInHeader initialTeam={currentTeam} />

      <div className="flex flex-1 w-full border-t border-gray-700 h-full">
        <ListList />

        <div className="w-full border-l border-gray-700">
          <TasksList />
        </div>
      </div>
    </div>
  )
}