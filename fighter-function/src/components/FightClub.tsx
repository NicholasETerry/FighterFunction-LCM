import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

type Fighter = {
  name: string;
  health: number;
  attack: () => number;
  color: string;
};

const createFighter = (name: string, color: string): Fighter => ({
  name,
  health: 100,
  color,
  attack: () => Math.floor(Math.random() * 15 + 5),
});

export default function GameBoard() {
  const [fighterA, setFighterA] = useState(() => createFighter("Puncher", "#f44336"));
  const [fighterB, setFighterB] = useState(() => createFighter("Kicker", "#2196f3"));
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isFighting && !winner) {
      interval = setInterval(() => {
        setFighterA(prevA => {
          if (fighterB.health <= 0) return prevA;
          const dmg = fighterB.attack();
          const newHealth = prevA.health - dmg;
          if (newHealth <= 0) setWinner(fighterB.name);
          return { ...prevA, health: Math.max(0, newHealth) };
        });

        setFighterB(prevB => {
          if (fighterA.health <= 0) return prevB;
          const dmg = fighterA.attack();
          const newHealth = prevB.health - dmg;
          if (newHealth <= 0) setWinner(fighterA.name);
          return { ...prevB, health: Math.max(0, newHealth) };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isFighting, fighterA.health, fighterB.health, winner]);

  const resetGame = () => {
    setFighterA(createFighter("Puncher", "#f44336"));
    setFighterB(createFighter("Kicker", "#2196f3"));
    setWinner(null);
    setIsFighting(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Typescript Function Fight
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {[fighterA, fighterB].map((f: Fighter, i: number) => (
          <Grid item xs={12} md={5} key={i}>
            <Card variant="outlined" sx={{ borderColor: f.color }}>
              <CardContent>
                <Typography sx={{ color: f.color }}>
                  {f.name}
                </Typography>
                <Typography>Health: {f.health}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        {!winner ? (
            <Stack spacing={2} alignItems="center">
            <Typography color="primary" visibility={"hidden"}>
              Space holder
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsFighting(true)}
            >
                {isFighting ? "Fighting..." : "Start Fight"}
            </Button>
            </Stack>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography color="primary">
              {winner} Function Wins !
            </Typography>
            <Button variant="outlined" color="primary" onClick={resetGame}>
              Rematch
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
