
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface AddPlayerFormProps {
  onAddPlayer: (name: string, initialScore: number) => void;
}

const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [playerName, setPlayerName] = useState('');
  const [initialScore, setInitialScore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer(playerName, initialScore);
    setPlayerName('');
    setInitialScore(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Añadir Jugador</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerName">Nombre del jugador</Label>
              <Input
                id="playerName"
                placeholder="Nombre del jugador"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="initialScore">Puntos iniciales</Label>
              <Input
                id="initialScore"
                type="number"
                min={0}
                placeholder="Puntos iniciales"
                value={initialScore.toString()}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  // Elimina ceros a la izquierda
                  const cleanedValue = inputValue.replace(/^0+(?!$)/, '');

                  const parsed = parseInt(cleanedValue, 10);
                  setInitialScore(Number.isNaN(parsed) || parsed < 0 ? 0 : parsed);
                }}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!playerName.trim()}>
            <UserPlus className="mr-2 h-4 w-4" />
            Añadir Jugador
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPlayerForm;
