import { usePlayerManager } from '@/hooks/usePlayerManager';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Player } from '@/models/Player';

const Ranking = () => {
  const { getRankedPlayers } = usePlayerManager();
  const [rankedPlayers, setRankedPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  // Poll for updates and watch for localStorage changes
  useEffect(() => {
    console.log('Ranking screen: Setting up update listeners');
    
    // Initial load
    setRankedPlayers(getRankedPlayers().slice(0, 20));
    
    // Set up interval for reactive updates
    const intervalId = setInterval(() => {
      setRankedPlayers(getRankedPlayers().slice(0, 20));
    }, 1000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [getRankedPlayers]);

  // Function to manually refresh the ranking list
  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    setRankedPlayers(getRankedPlayers().slice(0, 20));
  };

  // Function to determine rank style based on position
  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-500 font-bold text-shadow-lg"; // Gold for 1st
    if (index === 1) return "text-gray-400 font-bold text-shadow-lg"; // Silver for 2nd
    if (index === 2) return "text-amber-700 font-bold text-shadow-lg"; // Bronze for 3rd
    return "text-gray-300 font-semibold"; // Others
  };

  // Split players into two groups
  const firstTenPlayers = rankedPlayers.slice(0, 10);
  const nextTenPlayers = rankedPlayers.slice(10, 20);

  // Function to render a table with players
  const renderTable = (players: Player[], startIndex: number) => (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-900">
          <TableHead className="w-20 text-center text-2xl py-4 text-white font-bold">#</TableHead>
          <TableHead className="text-2xl py-4 text-white font-bold">Jugador</TableHead>
          <TableHead className="text-center text-2xl py-4 text-white font-bold">Puntos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-20">
              <div className="flex flex-col items-center justify-center text-gray-600">
                <Trophy className="h-24 w-24 mb-6 text-gray-400" />
                <p className="text-4xl font-semibold">No hay jugadores</p>
                <p className="text-3xl mt-4">en esta sección</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          players.map((player, index) => {
            const globalIndex = startIndex + index;
            return (
              <TableRow key={player.id} className={globalIndex < 3 ? "bg-gradient-to-r from-yellow-50 to-red-50" : "bg-white hover:bg-gray-50"}>
                <TableCell className={`text-center font-bold text-3xl py-3 ${getRankStyle(globalIndex)}`}>
                  {globalIndex + 1}
                </TableCell>
                <TableCell className="font-bold text-2xl py-3 text-gray-800">
                  {player.name}
                </TableCell>
                <TableCell className="text-center text-3xl font-black py-3" style={{color: '#DB0007'}}>
                  {player.score}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Discreet action buttons */}
      <div className="absolute top-6 left-6 flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={() => navigate('/')} 
          className="text-white hover:text-yellow-300 hover:bg-white/10 text-xl p-4"
        >
          <ArrowLeft className="h-6 w-6 text-black" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleRefresh}
          className="text-white hover:text-yellow-300 hover:bg-white/10 text-xl p-4"
        >
          
        </Button>
      </div>
      
      <div className="px-[4%] py-12 h-screen flex flex-col">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/5a594226-3461-40ca-9838-e0a75ef90f3e.png" 
            alt="McDonald's Logo" 
            className="w-10 object-contain"
          />
          <h1 className="px-10 text-4xl md:text-5xl font-bold text-center text-yellow-400 drop-shadow-2xl">
            Ranking de Jugadores 
          </h1>
          <img 
            src="/lovable-uploads/5a594226-3461-40ca-9838-e0a75ef90f3e.png" 
            alt="McDonald's Logo" 
            className="w-10 object-contain"
          />
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 w-full">
          {/* Primera tabla - Posiciones 1-10 */}
          <div className="h-full overflow-hidden rounded-2xl shadow-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
            {rankedPlayers.length === 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-900">
                    <TableHead className="w-20 text-center text-2xl py-4 text-white font-bold">#</TableHead>
                    <TableHead className="text-2xl py-4 text-white font-bold">Jugador</TableHead>
                    <TableHead className="text-center text-2xl py-4 text-white font-bold">Puntos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-20">
                      <div className="flex flex-col items-center justify-center text-gray-600">
                        <Trophy className="h-24 w-24 mb-6 text-gray-400" />
                        <p className="text-4xl font-semibold">No hay jugadores registrados</p>
                        <p className="text-3xl mt-4">Añade jugadores para comenzar</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              renderTable(firstTenPlayers, 0)
            )}
          </div>
          
          {/* Segunda tabla - Posiciones 11-20 */}
          <div className="h-full overflow-hidden rounded-2xl shadow-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
            {renderTable(nextTenPlayers, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;