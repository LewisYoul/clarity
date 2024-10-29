import { useState, createContext, useEffect } from 'react';

export const ListsContext = createContext();

const ListsProvider = ({ children }) => {
  const [teamsData, setTeamsData] = useState(null);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams');
      if (response.ok) {
        const { data } = await response.json();
        console.log('data', data);
        setTeamsData(data);
      } else {
        console.error('Failed to fetch teams');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const changeList = async (teamId) => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        body: JSON.stringify({ currentTeamId: teamId })
      });

      if (response.ok) {
        console.log('List changed successfully');

        fetchTeams();
      } else {
        console.error('Failed to change list');
      }
    } catch (error) {
      console.error('Error changing list:', error);
    }
  };

  return (
    <ListsContext.Provider value={{ teamsData, setTeamsData, changeList }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsProvider;
