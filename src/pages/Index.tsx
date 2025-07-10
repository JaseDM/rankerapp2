
import { useNavigate } from 'react-router-dom';
import { Trophy, UserPlus, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
          <h1 className="text-3xl font-bold text-center">Sistema de Ranking</h1>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Ver Ranking
              </CardTitle>
              <CardDescription>
                Consulta la clasificación actual de todos los jugadores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/ranking')} className="w-full">
                <List className="h-4 w-4 mr-2" />
                Ver Solo Ranking
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-blue-500" />
                Gestión Completa
              </CardTitle>
              <CardDescription>
                Registra jugadores, modifica puntuaciones y gestiona el ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/register')} className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Gestionar Jugadores
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
