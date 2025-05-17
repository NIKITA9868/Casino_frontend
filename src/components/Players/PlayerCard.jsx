import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Button, Box,
    Chip, Collapse, List, ListItem, ListItemText
} from '@mui/material';
import { ExpandMore, ExpandLess, EmojiEvents } from '@mui/icons-material';

const PlayerCard = ({ player }) => {
    const [showTournaments, setShowTournaments] = useState(false);

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{player.name}</Typography>
                    <Chip label={`$${player.balance}`} color="secondary" />
                </Box>

                <Button
                    startIcon={showTournaments ? <ExpandLess /> : <ExpandMore />}
                    onClick={() => setShowTournaments(!showTournaments)}
                    size="small"
                    sx={{ mt: 1 }}
                >
                    {player.tournaments?.length || 0} турниров
                </Button>

                <Collapse in={showTournaments}>
                    <List dense sx={{ mt: 1 }}>
                        {player.tournaments?.map(tournament => (
                            <ListItem key={tournament.id}>
                                <ListItemText
                                    primary={tournament.name}
                                    secondary={`Призовой фонд: $${tournament.prizePool}`}
                                />
                                <Chip
                                    label={`Участников: ${tournament.players?.length || 0}`}
                                    size="small"
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </CardContent>
        </Card>
    );
};