export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Trip {
  id: string;
  driverId: string;
  passengerId: string;
  status: TripStatus;
  pickupLocation: Location;
  destination: Location;
  fare: number;
  distance: number; // in kilometers
  duration: number; // in minutes
  requestedAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  route?: Location[];
  paymentMethod: 'cash' | 'card' | 'wallet';
  rating?: {
    passengerRating?: number;
    driverRating?: number;
    feedback?: string;
  };
}

export type TripStatus =
  | 'requested'
  | 'accepted'
  | 'driver_arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface TripRequest {
  id: string;
  passengerId: string;
  passengerName: string;
  pickupLocation: Location;
  destination: Location;
  estimatedFare: number;
  estimatedDistance: number;
  estimatedDuration: number;
  requestedAt: string;
  expiresAt: string;
}


