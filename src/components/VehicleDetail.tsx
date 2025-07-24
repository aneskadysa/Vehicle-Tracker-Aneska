import { useEffect } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  MapPin,
  Clock,
  Route,
} from 'lucide-react';

interface VehicleDetailProps {
  vehicleId: number;
  onBack: () => void;
}

export const VehicleDetail = ({ vehicleId, onBack }: VehicleDetailProps) => {
  const {
    selectedVehicle,
    loading,
    error,
    fetchVehicleDetail,
    clearError,
    vehicles,
  } = useVehicleStore();

  useEffect(() => {
    fetchVehicleDetail(vehicleId);
  }, [vehicleId, fetchVehicleDetail]);

  const handleRetry = () => {
    clearError();
    fetchVehicleDetail(vehicleId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const vehicleInfo = vehicles.find((v) => v.id === vehicleId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;
  if (!selectedVehicle)
    return <ErrorMessage message="Vehicle not found" onRetry={handleRetry} />;

  const stats = [
    {
      icon: <Gauge className="h-5 w-5 text-white" />,
      bg: 'bg-blue-600',
      title: 'Current Speed',
      value: `${selectedVehicle.speed} km/h`,
    },
    {
      icon: <Fuel className="h-5 w-5 text-white" />,
      bg: 'bg-green-600',
      title: 'Fuel Level',
      value: `${selectedVehicle.fuel_level}%`,
    },
    {
      icon: <Route className="h-5 w-5 text-white" />,
      bg: 'bg-red-700',
      title: 'Odometer',
      value: `${selectedVehicle.odometer.toLocaleString()} km`,
    },
    {
      icon: <Clock className="h-5 w-5 text-white" />,
      bg: 'bg-purple-600',
      title: 'Status',
      value: vehicleInfo?.status || 'Unknown',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          onClick={onBack}
          className="p-2 bg-[#2A2A2A] border border-[#4B4B4B] text-white rounded hover:bg-[#3A3A3A]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {vehicleInfo?.name || `Vehicle ${vehicleId}`}
          </h1>
          <p className="text-sm text-[#A3A3A3]">Real-time telemetry data</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center bg-[#2A2A2A] border border-[#4B4B4B] rounded-lg p-4 flex-1 min-w-[220px]"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${stat.bg}`}
            >
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#A3A3A3]">{stat.title}</span>
              <span className="text-lg font-semibold text-white">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Location */}
        <Card className="bg-[#2A2A2A] border border-[#4B4B4B]">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-[#7B1C1C]" />
              <span>Location Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Latitude:</span>
              <span className="text-white">{selectedVehicle.latitude}°</span>
            </div>
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Longitude:</span>
              <span className="text-white">{selectedVehicle.longitude}°</span>
            </div>
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Coordinates:</span>
              <span className="text-white">
                {selectedVehicle.latitude}, {selectedVehicle.longitude}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Telemetry */}
        <Card className="bg-[#2A2A2A] border border-[#4B4B4B]">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Car className="h-5 w-5 text-[#7B1C1C]" />
              <span>Telemetry Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Vehicle ID:</span>
              <span className="text-white">{selectedVehicle.vehicleId}</span>
            </div>
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Last Updated:</span>
              <span className="text-white">{formatDate(selectedVehicle.timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#A3A3A3]">
              <span>Data Source:</span>
              <span className="text-white">GPS Tracker</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fuel Progress */}
      <div className="mt-6">
        <Card className="bg-[#2A2A2A] border border-[#4B4B4B]">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Fuel className="h-5 w-5 text-[#7B1C1C]" />
              <span>Fuel Level Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#A3A3A3]">Current Level</span>
              <span className="text-white">{selectedVehicle.fuel_level}%</span>
            </div>
            <div className="w-full bg-[#4B4B4B] rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${selectedVehicle.fuel_level}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#A3A3A3]">
              <span>Empty</span>
              <span>Full</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
