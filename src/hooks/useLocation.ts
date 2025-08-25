import { useEffect, useState, useCallback, useRef } from 'react';
import LocationManager from '../utils/LocationManager';
import {
  LocationData,
  LocationError,
  LocationOptions,
  LocationWatchOptions,
} from '../types/location';

interface UseLocationReturn {
  location: LocationData | null;
  lastKnownLocation: LocationData | null;
  error: LocationError | null;
  loading: boolean;
  getCurrentLocation: (options?: LocationOptions) => Promise<void>;
  startWatching: (options?: LocationWatchOptions) => void;
  stopWatching: () => void;
  isWatching: boolean;
  refreshLocation: () => Promise<void>;
}

export const useLocation = (
  autoStart: boolean = false,
  watchOptions?: LocationWatchOptions,
): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [lastKnownLocation, setLastKnownLocation] =
    useState<LocationData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWatching, setIsWatching] = useState<boolean>(false);

  const watchIdRef = useRef<string | null>(null);
  const locationManagerRef = useRef<LocationManager>(
    LocationManager.getInstance(),
  );

  useEffect(() => {
    // Get last known location on mount
    const lastLocation = locationManagerRef.current.getLastKnownLocation();
    setLastKnownLocation(lastLocation);
    setLocation(lastLocation);

    // Auto start watching if requested
    if (autoStart) {
      startWatching(watchOptions);
    }

    // Cleanup on unmount
    return () => {
      if (watchIdRef.current) {
        locationManagerRef.current.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const getCurrentLocation = useCallback(async (options?: LocationOptions) => {
    setLoading(true);
    setError(null);

    try {
      const currentLocation =
        await locationManagerRef.current.getCurrentLocation(options);
      setLocation(currentLocation);
      setLastKnownLocation(currentLocation);
    } catch (err) {
      setError(err as LocationError);
    } finally {
      setLoading(false);
    }
  }, []);

  const startWatching = useCallback(
    (options?: LocationWatchOptions) => {
      if (isWatching || watchIdRef.current) {
        return; // Already watching
      }

      setError(null);

      const watchId = locationManagerRef.current.watchLocation(
        (newLocation: LocationData) => {
          setLocation(newLocation);
          setLastKnownLocation(newLocation);
          setError(null);
        },
        options,
      );

      watchIdRef.current = watchId;
      setIsWatching(true);
    },
    [isWatching],
  );

  const stopWatching = useCallback(() => {
    if (!isWatching || !watchIdRef.current) {
      return; // Not watching
    }

    locationManagerRef.current.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
    setIsWatching(false);
  }, [isWatching]);

  const refreshLocation = useCallback(async () => {
    await getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    location,
    lastKnownLocation,
    error,
    loading,
    getCurrentLocation,
    startWatching,
    stopWatching,
    isWatching,
    refreshLocation,
  };
};

export default useLocation;

