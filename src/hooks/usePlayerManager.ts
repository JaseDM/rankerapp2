
import { useState, useEffect } from 'react';
import { Player } from '../models/Player';
import { toast } from '@/components/ui/sonner';

export const usePlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  // Cargar jugadores desde localStorage al iniciar
  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error('Error al cargar jugadores:', error);
        toast.error('Error al cargar jugadores');
      }
    }
    
    // Detectar cambios en el localStorage desde otras ventanas/pestañas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'players' && e.newValue) {
        try {
          setPlayers(JSON.parse(e.newValue));
          console.log('Datos actualizados desde otra ventana');
        } catch (error) {
          console.error('Error al procesar datos de otra ventana:', error);
        }
      }
    };
    
    // Nos suscribimos a cambios en localStorage (eventos entre ventanas)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Guardar jugadores en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    // Añadimos una marca de tiempo para forzar el evento storage en otras ventanas
    localStorage.setItem('players_timestamp', Date.now().toString());
  }, [players]);

  // Añadir un nuevo jugador
  const addPlayer = (name: string, initialScore: number = 0) => {
    if (!name.trim()) {
      toast.error('El nombre del jugador no puede estar vacío');
      return;
    }

    const playerExists = players.some(
      (player) => player.name.toLowerCase() === name.toLowerCase()
    );

    if (playerExists) {
      toast.error(`El jugador "${name}" ya existe`);
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name.trim(),
      score: initialScore,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    toast.success(`Jugador "${name}" añadido`);
  };

  // Incrementar puntuación
  const increaseScore = (playerId: string, points: number = 1) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + points }
          : player
      )
    );
    toast.success(`Puntuación actualizada`);
  };

  // Eliminar un jugador
  const deletePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
    toast.success('Jugador eliminado');
  };

  // Resetear todas las puntuaciones
  const resetAllScores = () => {
    setPlayers((prev) => prev.map((player) => ({ ...player, score: 0 })));
    toast.success('Todas las puntuaciones han sido reseteadas');
  };

  // Eliminar todos los jugadores
  const deleteAllPlayers = () => {
    setPlayers([]);
    toast.success('Todos los jugadores han sido eliminados');
  };

  // Obtener jugadores ordenados por puntuación
  const getRankedPlayers = () => {
    return [...players].sort((a, b) => b.score - a.score);
  };

  return {
    players,
    addPlayer,
    increaseScore,
    deletePlayer,
    resetAllScores,
    deleteAllPlayers,
    getRankedPlayers,
  };
};
