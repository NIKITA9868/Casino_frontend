import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Box, CircularProgress, Alert, Snackbar, Grid,
    Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Chip,
    TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Add, ExpandMore, EmojiEvents } from '@mui/icons-material';
import { getPlayers, deletePlayer, updatePlayer, createPlayer, getPlayerWithTournaments } from '../api/playersApi';
import { createBet } from '../api/betsApi';

const PlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [openPlayerForm, setOpenPlayerForm] = useState(false);
    const [openBetForm, setOpenBetForm] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [expandedPlayer, setExpandedPlayer] = useState(null);
    const [betData, setBetData] = useState({ amount: '', eventId: '' });
    const [newPlayerData, setNewPlayerData] = useState({ name: '', balance: '' });

    const handleAddPlayerClick = () => {
        setSelectedPlayer(null); // Сбрасываем выбранного игрока
        setNewPlayerData({ name: '', balance: '' }); // Инициализируем данные нового игрока
        setOpenPlayerForm(true);
    };

    const handlePlayerSubmit = async (playerData) => {
        try {
            if (selectedPlayer) {
                // Редактирование существующего игрока
                await updatePlayer(selectedPlayer.id, {
                    name: playerData.name,
                    balance: parseFloat(playerData.balance)
                });
                showSnackbar('Player updated successfully');
            } else {
                // Создание нового игрока - используем newPlayerData
                await createPlayer({
                    name: newPlayerData.name,
                    balance: parseFloat(newPlayerData.balance || 0)
                });
                showSnackbar('Player created successfully');
            }
            setOpenPlayerForm(false);
            await fetchPlayers();
        } catch (err) {
            showSnackbar(err.response?.data?.message || 'Operation failed'); // Добавляем более детальное сообщение об ошибке
        }
    };

    const fetchPlayers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPlayers();
            setPlayers(data);
        } catch (err) {
            setError(err.message);
            showSnackbar(err.message || 'Failed to load players');
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message) => {
        setSnackbar({ open: true, message });
    };

    const handleDeletePlayer = async (id) => {
        try {
            await deletePlayer(id);
            await fetchPlayers();
            showSnackbar('Player deleted successfully');
        } catch (err) {
            showSnackbar(err.message || 'Failed to delete player');
        }
    };

    const handleExpandPlayer = async (playerId) => {
        setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
    };


    const handleBetSubmit = async () => {
        if (!selectedPlayer || !betData.amount || !betData.eventId) return;

        try {
            await createBet(selectedPlayer.id, {
                amount: parseFloat(betData.amount),
                eventId: betData.eventId
            });
            showSnackbar('Bet placed successfully');
            setOpenBetForm(false);
            setBetData({ amount: '', eventId: '' });
            await fetchPlayers();
        } catch (err) {
            showSnackbar(err.message || 'Failed to place bet');
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Players</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddPlayerClick} // Используем новую функцию
                >
                    Add Player
                </Button>
            </Box>

            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={2}>
                    {players.map(player => (
                        <Grid item xs={12} sm={6} key={player.id}>
                            <Accordion
                                expanded={expandedPlayer === player.id}
                                onChange={() => handleExpandPlayer(player.id)}
                                sx={{
                                    transition: 'all 0.2s ease',
                                    '&.Mui-expanded': { margin: '16px 0' }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h6">{player.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Balance: ${player.balance?.toFixed(2) || '0.00'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <EmojiEvents fontSize="small" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {player.tournaments?.length || 0}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {expandedPlayer === player.id && (
                                        <>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Tournaments:
                                                </Typography>
                                                {player.tournaments?.length > 0 ? (
                                                    <List dense>
                                                        {player.tournaments.map(tournament => (
                                                            <ListItem key={tournament.id}>
                                                                <ListItemText
                                                                    primary={tournament.name}
                                                                    secondary={`Prize: $${tournament.prizePool?.toFixed(2) || '0.00'}`}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        No tournaments
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setSelectedPlayer(player);
                                                        setOpenPlayerForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDeletePlayer(player.id)}
                                                >
                                                    Delete
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        setSelectedPlayer(player);
                                                        setOpenBetForm(true);
                                                    }}
                                                >
                                                    Place Bet
                                                </Button>
                                            </Box>
                                        </>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Player Form */}
            <Dialog open={openPlayerForm} onClose={() => setOpenPlayerForm(false)}>
                <DialogTitle>{selectedPlayer ? 'Edit Player' : 'Add Player'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 400, p: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={selectedPlayer ? selectedPlayer.name : newPlayerData.name}
                            onChange={(e) => selectedPlayer
                                ? setSelectedPlayer({...selectedPlayer, name: e.target.value})
                                : setNewPlayerData({...newPlayerData, name: e.target.value})
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Balance"
                            type="number"
                            value={selectedPlayer ? selectedPlayer.balance : newPlayerData.balance}
                            onChange={(e) => selectedPlayer
                                ? setSelectedPlayer({...selectedPlayer, balance: e.target.value})
                                : setNewPlayerData({...newPlayerData, balance: e.target.value})
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPlayerForm(false)}>Cancel</Button>
                    <Button
                        onClick={() => handlePlayerSubmit(selectedPlayer || newPlayerData)}
                        variant="contained"
                        disabled={!(selectedPlayer ? selectedPlayer.name : newPlayerData.name)}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Bet Form */}
            <Dialog open={openBetForm} onClose={() => setOpenBetForm(false)}>
                <DialogTitle>Place Bet for {selectedPlayer?.name}</DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 400, p: 2 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Amount"
                            type="number"
                            value={betData.amount}
                            onChange={(e) => setBetData({...betData, amount: e.target.value,eventId: 1})}

                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenBetForm(false)}>Cancel</Button>
                    <Button
                        onClick={handleBetSubmit}
                        variant="contained"
                        disabled={!betData.amount || !betData.eventId}
                    >
                        Place Bet
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
};

export default PlayersPage;