import { useState } from 'react';
import { VehicleList } from './components/VehicleList';
import { VehicleDetail } from './components/VehicleDetail';

type AppView = 'list' | 'detail';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('list');
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleSelectVehicle = (id: number) => {
    setSelectedVehicleId(id);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedVehicleId(null);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'list' && (
          <VehicleList onSelectVehicle={handleSelectVehicle} />
        )}
        
        {currentView === 'detail' && selectedVehicleId && (
          <VehicleDetail 
            vehicleId={selectedVehicleId} 
            onBack={handleBackToList} 
          />
        )}
      </div>
    </div>
  );
}

export default App;