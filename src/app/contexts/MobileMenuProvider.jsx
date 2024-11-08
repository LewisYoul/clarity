import { useState, createContext, useEffect, useRef, useCallback } from 'react';
import { useContext } from 'react';
import { ListsContext } from './ListsProvider';
import { PlusIcon } from '@heroicons/react/24/outline';
import ListListItem from '../components/ListListItem';
import CreateList from '../components/CreateList';
import { ModalContext } from './modalContext';

export const MobileMenuContext = createContext();

const MobileMenuProvider = ({ children }) => {
  const { teamsData, fetchLists } = useContext(ListsContext)
  const { setModalContent } = useContext(ModalContext)
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const mobileTeamMenuRef = useRef()

  const handleOutsideClick = useCallback((event) => {
    console.log('handleOutsideClickmobileMenu', event.target)

    if (mobileTeamMenuRef?.current?.contains(event.target)) { return }
    if (isTeamMenuOpen) { setIsTeamMenuOpen(false) }
  }, [isTeamMenuOpen])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const openNewWorkspaceModal = () => {
    setIsTeamMenuOpen(false)
    setModalContent(<CreateList onCreate={async () => {
      await fetchLists()
      setModalContent(null)
    }}/>)
  }

  return (
    <MobileMenuContext.Provider value={{ isTeamMenuOpen, setIsTeamMenuOpen }}>
      {children}
      <div 
        className={`lg:hidden fixed h-screen w-screen inset-x-0 top-0 z-40 text-gray-300 ${
          isTeamMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Background overlay with fade transition */}
        <div 
          className={`absolute inset-0 bg-gray-500/70 transition-opacity duration-300 ${
            isTeamMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Menu panel with slide transition */}
        <div 
          className={`absolute bg-gray-900 w-3/4 h-full transform transition-transform duration-300 ease-in-out ${
            isTeamMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div ref={mobileTeamMenuRef} className="h-full w-full relative divide-y divide-gray-500/10">
            <nav className="flex items-center justify-between px-4 py-3">
              <div onClick={() => { setIsTeamMenuOpen(false) }} className="-m-1.5 p-1.5 flex items-center gap-2">
                <img
                  className="h-10 w-auto"
                  src="/logo.svg"
                  alt=""
                />
                <span className="text-md">{teamsData?.currentTeam?.name}</span>
              </div>
            </nav>

            <div className="flow-root">
              <div className="divide-y divide-gray-500/10">
                <div className="">
                  {teamsData && (
                    <>
                      <button
                        onClick={openNewWorkspaceModal}
                        className="inline-flex items-center justify-between w-full rounded-lg px-4 py-2.5 text-sm font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                      >
                        Lists
                        <PlusIcon className="w-4 h-4 ml-2" />
                      </button>
                      {teamsData.teams.map((team) => (
                        <ListListItem key={team.id} list={team} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuProvider;
