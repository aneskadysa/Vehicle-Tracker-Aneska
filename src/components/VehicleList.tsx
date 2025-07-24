import { useEffect } from "react";
import { useVehicleStore } from "../store/vehicleStore";
import { VehicleCard } from "./VehicleCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import type { Vehicle } from "../types/vehicle";

interface VehicleListProps {
  onSelectVehicle: (id: number) => void;
}

export const VehicleList = ({ onSelectVehicle }: VehicleListProps) => {
  const { vehicles, loading, error, fetchVehicles, clearError } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleRetry = () => {
    clearError();
    fetchVehicles();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen px-4 py-10 md:px-6 bg-background">
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Vehicle Fleet Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Monitor and track your vehicle fleet in real-time
          </p>
        </div>

        {/* Vehicle Grid */}
        {vehicles && vehicles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-6">
            {vehicles.map((vehicle: Vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetail={onSelectVehicle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-14 h-14 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            <p className="text-sm text-gray-400">No vehicles found</p>
          </div>
        )}
      </div>
    </div>
  );
};
