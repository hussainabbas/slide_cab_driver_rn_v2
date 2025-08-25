export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface LocationData {
  coords: LocationCoordinates;
  timestamp: number;
}

export interface LocationError {
  code: number;
  message: string;
  PERMISSION_DENIED?: number;
  POSITION_UNAVAILABLE?: number;
  TIMEOUT?: number;
}

export interface LocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  distanceFilter?: number;
  interval?: number;
  fastestInterval?: number;
  showLocationDialog?: boolean;
  forceRequestLocation?: boolean;
  forceLocationManager?: boolean;
  showsBackgroundLocationIndicator?: boolean;
  useSignificantChanges?: boolean;
}

export interface LocationWatchOptions extends LocationOptions {
  useSignificantChanges?: boolean;
}

export type LocationSuccessCallback = (position: LocationData) => void;
export type LocationErrorCallback = (error: LocationError) => void;
export type LocationUpdateCallback = (position: LocationData) => void;

