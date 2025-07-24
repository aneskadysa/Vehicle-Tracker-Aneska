import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-[#A3A3A3] mb-4">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          className="bg-[#7B1C1C] hover:bg-[#5A1515] text-white"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};