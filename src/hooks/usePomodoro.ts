import { useState, useEffect, useCallback } from 'react';

interface PomodoroState {
  time: number;
  initialTime: number;
  isActive: boolean;
  mode: 'work' | 'break';
  isEditingTime: boolean;
  customWorkInput: string;
  customBreakInput: string;
}

interface PomodoroActions {
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  switchMode: () => void;
  setCustomWorkTime: (minutes: string) => void;
  setCustomBreakTime: (minutes: string) => void;
  toggleEditingTime: () => void;
  applyCustomTime: () => void;
}

export function usePomodoro(
  initialWorkTime: number = 25,
  initialBreakTime: number = 5,
  onCycleComplete?: (mode: 'work' | 'break') => void
): [PomodoroState, PomodoroActions] {
  const [time, setTime] = useState(initialWorkTime * 60);
  const [initialTime, setInitialTime] = useState(initialWorkTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customWorkInput, setCustomWorkInput] = useState(String(initialWorkTime));
  const [customBreakInput, setCustomBreakInput] = useState(String(initialBreakTime));

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            if (onCycleComplete) {
              onCycleComplete(mode);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, mode, onCycleComplete]);

  const startPomodoro = useCallback(() => {
    setIsActive(true);
  }, []);

  const pausePomodoro = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetPomodoro = useCallback(() => {
    setIsActive(false);
    setTime(initialTime);
  }, [initialTime]);

  const switchMode = useCallback(() => {
    setIsActive(false);
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    const newTime = newMode === 'work' ? initialWorkTime * 60 : initialBreakTime * 60;
    setTime(newTime);
    setInitialTime(newTime);
  }, [mode, initialWorkTime, initialBreakTime]);

  const setCustomWorkTimeHandler = useCallback((minutes: string) => {
    setCustomWorkInput(minutes);
  }, []);

  const setCustomBreakTimeHandler = useCallback((minutes: string) => {
    setCustomBreakInput(minutes);
  }, []);

  const toggleEditingTime = useCallback(() => {
    setIsEditingTime((prev) => !prev);
  }, []);

  const applyCustomTime = useCallback(() => {
    const workMinutes = parseInt(customWorkInput, 10);
    const breakMinutes = parseInt(customBreakInput, 10);

    if (workMinutes > 0 && breakMinutes > 0) {
      setIsEditingTime(false);
      setIsActive(false);

      if (mode === 'work') {
        const newTime = workMinutes * 60;
        setTime(newTime);
        setInitialTime(newTime);
      } else {
        const newTime = breakMinutes * 60;
        setTime(newTime);
        setInitialTime(newTime);
      }
    }
  }, [customWorkInput, customBreakInput, mode]);

  const state: PomodoroState = {
    time,
    initialTime,
    isActive,
    mode,
    isEditingTime,
    customWorkInput,
    customBreakInput,
  };

  const actions: PomodoroActions = {
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    switchMode,
    setCustomWorkTime: setCustomWorkTimeHandler,
    setCustomBreakTime: setCustomBreakTimeHandler,
    toggleEditingTime,
    applyCustomTime,
  };

  return [state, actions];
}
