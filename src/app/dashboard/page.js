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
    <div className="bg-white h-full min-h-screen">
      <div className="max-w-6xl m-auto">
        <LoggedInHeader initialTeam={currentTeam} />
        <div className="flex w-full">
          <ListList />

          <div className="w-full">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  )
}