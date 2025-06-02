import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Fighter = {
    name: string;
    health: number;
    attack: () => number;
    color: string;
}

const createFighter = (name: string, color: string): Fighter => ({
    name,
    health: 100,
    color,
    attack: () => Math.floor(Math.random() * 15 + 5), 

})

export default function FightClub() {
    // Demonstarte a fight between two TypeScript functions
    // Create two fighters that battle until one wins
    // Each fighter will have health and attack properties
    // Each fighter will have its own color assosiated with it #f44336 and #2196f3


    // fighterA and fighterB variables that use state management
    const [fighterA, setFighterA] = useState(() => createFighter("Puncher", "#f44336"));
    const [fighterB, setFighterB] = useState(() => createFighter("Kicker", "#2196f3"));
    const [isFighting, setIsFighting] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout>;
        interval = setInterval(() => {
            if (isFighting && !winner) {
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
            }
        }, 1000);
    }, [isFighting, fighterA.health, fighterB.health, winner]);

    const resetGame = () => {
        setFighterA(createFighter("Puncher", "#f44336"));
        setFighterB(createFighter("Kicker", "#2196f3"));
        setIsFighting(false);
        setWinner(null);
    }

    return (
        <Box>
            <Typography variant="h4">
                Typescript Function Fight
            </Typography>

            <Grid container spacing={2} justifyContent="center">
            {[fighterA, fighterB].map((f: Fighter, i: number) => (
                <Grid item xs={12} md={5} key={i}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" style={{ color: f.color }}>
                                {f.name}
                            </Typography>
                            <Typography variant="body1">
                                Health: {f.health}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            ))}
            </Grid>

            <Box>
                {!winner ? (
                    <Button variant="outlined" onClick={() => setIsFighting(true)}>
                        {isFighting ? "Fighting..." : "Start Fight"}
                    </Button>
                ): (
                    <>
                        <Typography>
                            {winner} Function Wins !
                        </Typography>
                        <Button onClick={resetGame}> Rematch </Button>
                    </>
                )}
            </Box>

        </Box>
    )
}