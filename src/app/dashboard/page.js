import LoggedInHeader from "../components/LoggedInHeader"
import { authorizeRequest } from "../utils/sessionUtils"
import ListList from "../components/ListList"
import AudioRecorder from "../components/AudioRecorder"
import TasksList from "../components/TasksList"

export default async function Dashboard() {
  const { currentTeam } = await authorizeRequest()

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col relative">
      <LoggedInHeader initialTeam={currentTeam} />

      <div className="flex flex-1 w-full border-t border-gray-700 h-full">
        <AudioRecorder />
        <ListList />

        <div className="w-full lg:border-l border-gray-700">
          <TasksList />
        </div>
      </div>
    </div>
  )
}