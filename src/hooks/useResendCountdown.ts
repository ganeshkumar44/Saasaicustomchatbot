import { useCallback, useEffect, useState } from 'react';

const DEFAULT_COUNTDOWN_SECONDS = 60;

export function useResendCountdown(initialSeconds = DEFAULT_COUNTDOWN_SECONDS) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((previous) => previous - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsRemaining]);

  const restart = useCallback(() => {
    setSecondsRemaining(initialSeconds);
  }, [initialSeconds]);

  return {
    secondsRemaining,
    canResend: secondsRemaining <= 0,
    restart,
  };
}
