export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  licenseNumber?: string;
  vehicleInfo?: VehicleInfo;
  rating?: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  type: 'sedan' | 'suv' | 'hatchback' | 'truck' | 'motorcycle';
}

