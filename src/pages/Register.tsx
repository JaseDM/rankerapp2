
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlayerForm from '@/components/AddPlayerForm';
import { usePlayerManager } from '@/hooks/usePlayerManager';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RankingTable from '@/components/RankingTable';
import AdminActions from '@/components/AdminActions';

const Register = () => {
  const { 
    addPlayer, 
    getRankedPlayers,
    increaseScore,
    deletePlayer,
    resetAllScores,
    deleteAllPlayers
  } = usePlayerManager();
  
  const rankedPlayers = getRankedPlayers();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 mr-3 text-blue-500" />
          <h1 className="text-3xl font-bold text-center">Gestión de Jugadores</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Formulario para añadir jugadores */}
          <div className="md:col-span-1">
            <AddPlayerForm onAddPlayer={(name, initialScore) => addPlayer(name, initialScore)} />
            
            <div className="mt-8">
              <AdminActions 
                onResetScores={resetAllScores}
                onDeletePlayers={deleteAllPlayers}
              />
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate('/ranking')} className="px-6">
                Ver Solo Ranking
              </Button>
            </div>
          </div>
          
          {/* Tabla de ranking con funcionalidad */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Ranking y Gestión de Puntos</h2>
            <RankingTable 
              players={rankedPlayers}
              onIncreaseScore={increaseScore}
              onDeletePlayer={deletePlayer}
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => navigate('/')} className="px-6">
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
