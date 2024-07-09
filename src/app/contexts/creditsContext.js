import { useState, createContext, useEffect } from 'react';
export const CreditsContext = createContext();

const CreditsProvider = ({children})=>{
  const [creditsCount, setCreditsCount] = useState();

  useEffect(() => {
    refreshCreditsCount()
  }, [])

  const refreshCreditsCount = async () => {
    console.log('refreshing credits count')
    
    try {
        const response = await fetch('/api/credits')
        const data = await response.json()
        setCreditsCount(data.creditsCount)
    } catch (error) {
        console.error('Error refreshing credits count:', error)
    }
  }

  return (
      <CreditsContext.Provider value={{ creditsCount, refreshCreditsCount }}>
          {children}
      </CreditsContext.Provider>
  )
}

export default CreditsProvider;

