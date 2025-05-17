import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const TournamentPlayers = ({ tournament }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Registered Players</Typography>
                <Button variant="outlined" startIcon={<Add />}>
                    Add Player
                </Button>
            </Box>

            {tournament.players.length > 0 ? (
                <List>
                    {tournament.players.map((player) => (
                        <ListItem key={player.id}>
                            <ListItemText primary={player.username} secondary={player.email} />
                            <Button size="small" color="error">
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    No players registered yet
                </Typography>
            )}
        </Box>
    );
};

export default TournamentPlayers;