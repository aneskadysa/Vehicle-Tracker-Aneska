import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Car, Clock, Gauge } from "lucide-react";
import type { Vehicle } from "../types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetail: (id: number) => void;
}

export const VehicleCard = ({ vehicle, onViewDetail }: VehicleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="h-full rounded-2xl border border-[#3A3A3A] bg-[#1F1F1F] transition-all duration-300 hover:border-[#7B1C1C] hover:shadow-xl">
      <CardContent className="flex h-full flex-col justify-between p-5 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Vehicle Icon & Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7B1C1C] shadow-inner">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
              <p className="text-sm text-gray-400">ID: {vehicle.id}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="sm:ml-auto">
            <StatusBadge status={vehicle.status} />
          </div>
        </div>

        {/* Info Section */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Gauge className="h-4 w-4 text-gray-300" />
            <span>Speed:</span>
            <span className="font-semibold text-white">{vehicle.speed} km/h</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4 text-gray-300" />
            <span>Last Update:</span>
            <span className="font-medium text-white">{formatDate(vehicle.updated_at)}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={() => onViewDetail(vehicle.id)}
          className="w-full rounded-xl bg-[#7B1C1C] py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-[#5A1515]"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
