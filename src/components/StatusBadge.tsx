import { Badge } from "../components/ui/badge"; // atau path relatif

interface StatusBadgeProps {
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'INACTIVE':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'MAINTENANCE':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <Badge className={getStatusStyle(status)}>
      {status}
    </Badge>
  );
};
