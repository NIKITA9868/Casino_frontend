import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Button, Box,
    Chip, Collapse, List, ListItem, ListItemText, Avatar
} from '@mui/material';
import { ExpandMore, ExpandLess, People } from '@mui/icons-material';

const TournamentCard = ({ tournament }) => {
    const [showPlayers, setShowPlayers] = useState(false);

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{tournament.name}</Typography>
                    <Chip label={`$${tournament.prizePool}`} color="primary" />
                </Box>

                <Button
                    startIcon={showPlayers ? <ExpandLess /> : <ExpandMore />}
                    onClick={() => setShowPlayers(!showPlayers)}
                    size="small"
                    sx={{ mt: 1 }}
                >
                    {tournament.players?.length || 0} участников
                </Button>

                <Collapse in={showPlayers}>
                    <List dense sx={{ mt: 1 }}>
                        {tournament.players?.map(player => (
                            <ListItem key={player.id}>
                                <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                                    {player.name.charAt(0)}
                                </Avatar>
                                <ListItemText
                                    primary={player.name}
                                    secondary={`Ставок: ${player.bets?.length || 0}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </CardContent>
        </Card>
    );
};