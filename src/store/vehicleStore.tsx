import { create } from 'zustand';
import type { Vehicle, VehicleTelemetry } from '../types/vehicle';

interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicle: VehicleTelemetry | null;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetail: (id: number) => Promise<void>;
  clearError: () => void;
}

// Mock API data
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-01-23T10:00:00Z"
  },
  {
    id: 2,
    name: "Honda CR-V",
    status: "ACTIVE",
    speed: 45,
    updated_at: "2025-01-23T09:45:00Z"
  },
  {
    id: 3,
    name: "Mazda CX-5",
    status: "MAINTENANCE",
    speed: 0,
    updated_at: "2025-01-23T08:30:00Z"
  },
  {
    id: 4,
    name: "Toyota Camry",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-01-23T07:15:00Z"
  },
  {
    id: 5,
    name: "Daihatsu Terios",
    status: "ACTIVE",
    speed: 55,
    updated_at: "2025-01-23T10:10:00Z"
  },
  {
    id: 6,
    name: "Mitsubishi Xpander",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-01-23T06:50:00Z"
  }
];

const mockTelemetry: Record<number, VehicleTelemetry> = {
  1: {
    vehicleId: 1,
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: "2025-01-23T10:00:00Z",
    latitude: -6.12,
    longitude: 106.85,
    speed: 60
  },
  2: {
    vehicleId: 2,
    odometer: 89234.45,
    fuel_level: 45.8,
    timestamp: "2025-01-23T09:45:00Z",
    latitude: -6.15,
    longitude: 106.88,
    speed: 45
  },
  3: {
    vehicleId: 3,
    odometer: 67890.12,
    fuel_level: 25.3,
    timestamp: "2025-01-23T08:30:00Z",
    latitude: -6.18,
    longitude: 106.82,
    speed: 0
  },
  4: {
    vehicleId: 4,
    odometer: 156789.33,
    fuel_level: 80.7,
    timestamp: "2025-01-23T07:15:00Z",
    latitude: -6.21,
    longitude: 106.79,
    speed: 0
  },
  5: {
    vehicleId: 5,
    odometer: 54321.0,
    fuel_level: 65.0,
    timestamp: "2025-01-23T10:10:00Z",
    latitude: -6.14,
    longitude: 106.87,
    speed: 55
  },
  6: {
    vehicleId: 6,
    odometer: 120000.0,
    fuel_level: 30.5,
    timestamp: "2025-01-23T06:50:00Z",
    latitude: -6.25,
    longitude: 106.77,
    speed: 0
  }
};

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ vehicles: mockVehicles, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vehicles', loading: false });
    }
  },

  fetchVehicleDetail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const telemetry = mockTelemetry[id];
      if (!telemetry) {
        throw new Error('Vehicle not found');
      }
      set({ selectedVehicle: telemetry, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch vehicle details', loading: false });
    }
  },

  clearError: () => set({ error: null })
}));
