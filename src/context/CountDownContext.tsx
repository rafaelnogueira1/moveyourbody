import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
  minutes: number
  seconds: number,
  hasFinish: boolean,
  isActive: boolean,
  startCountDown: () => void,
  resetCountDown: () => void,
}

interface CountDownProviderProps {
  children: ReactNode
}

let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData)

export const CountDownProvider = ({children}: CountDownProviderProps) => {
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);
  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinish(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider value={{
      minutes, seconds, hasFinish, isActive, startCountDown, resetCountDown
    }}>
      {children}
    </CountDownContext.Provider>
  )
}
