import { useEffect, useRef } from 'react';
import {
  IDLE_ACTIVITY_STORAGE_KEY,
  IDLE_LOGOUT_STORAGE_KEY,
} from '@/constants/auth';

const ACTIVITY_EVENTS = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart',
  'click',
  'focus',
] as const;

const ACTIVITY_THROTTLE_MS = 1000;

function readLastActivityAt(): number {
  const storedValue = localStorage.getItem(IDLE_ACTIVITY_STORAGE_KEY);
  const parsedValue = Number(storedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function writeLastActivityAt(timestamp: number): void {
  localStorage.setItem(IDLE_ACTIVITY_STORAGE_KEY, String(timestamp));
}

export function useIdleLogout(
  onIdle: () => void,
  timeoutMs: number,
  enabled: boolean,
): void {
  const onIdleRef = useRef(onIdle);

  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  useEffect(() => {
    if (!enabled || timeoutMs <= 0) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleIdleCheck = (delayMs: number) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const lastActivityAt = readLastActivityAt();
        const idleDurationMs = Date.now() - lastActivityAt;

        if (idleDurationMs >= timeoutMs) {
          localStorage.setItem(IDLE_LOGOUT_STORAGE_KEY, String(Date.now()));
          onIdleRef.current();
          return;
        }

        scheduleIdleCheck(timeoutMs - idleDurationMs);
      }, delayMs);
    };

    const recordActivity = () => {
      writeLastActivityAt(Date.now());
      scheduleIdleCheck(timeoutMs);
    };

    let lastRecordedAt = 0;
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastRecordedAt < ACTIVITY_THROTTLE_MS) {
        return;
      }

      lastRecordedAt = now;
      recordActivity();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === IDLE_ACTIVITY_STORAGE_KEY && event.newValue) {
        const lastActivityAt = Number(event.newValue);
        if (!Number.isFinite(lastActivityAt)) {
          return;
        }

        const remainingMs = timeoutMs - (Date.now() - lastActivityAt);
        scheduleIdleCheck(Math.max(remainingMs, 0));
        return;
      }

      if (event.key === IDLE_LOGOUT_STORAGE_KEY) {
        onIdleRef.current();
      }
    };

    writeLastActivityAt(Date.now());
    scheduleIdleCheck(timeoutMs);

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });
    window.addEventListener('storage', handleStorage);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
      window.removeEventListener('storage', handleStorage);
    };
  }, [enabled, timeoutMs]);
}
