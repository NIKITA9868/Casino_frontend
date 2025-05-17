import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Box, CircularProgress, Alert, Snackbar, Grid,
    Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemAvatar, Avatar, ListItemText
} from '@mui/material';
import { Add, ExpandMore, People } from '@mui/icons-material';
import TournamentForm from '../components/Tournaments/TournamentForm';
import { getTournaments, deleteTournament, updateTournament, createTournament, getTournamentWithPlayers } from '../api/tournamentsApi';

const TournamentsPage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [openForm, setOpenForm] = useState(false);
    const [currentTournament, setCurrentTournament] = useState(null);
    const [expandedTournament, setExpandedTournament] = useState(null);

    const fetchTournaments = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTournaments();
            setTournaments(data);
        } catch (err) {
            setError(err.message);
            showSnackbar(err.message || 'Failed to load tournaments');
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message) => {
        setSnackbar({ open: true, message });
    };

    const handleDelete = async (id) => {
        try {
            await deleteTournament(id);
            await fetchTournaments();
            showSnackbar('Tournament deleted successfully');
        } catch (err) {
            showSnackbar(err.message || 'Failed to delete tournament');
        }
    };

    const handleExpand = async (tournamentId) => {
        setExpandedTournament(expandedTournament === tournamentId ? null : tournamentId);
    };

    const handleSubmit = async (tournamentData) => {
        try {
            if (currentTournament) {
                await updateTournament(currentTournament.id, tournamentData);
                showSnackbar('Tournament updated successfully');
            } else {
                await createTournament({
                    name: tournamentData.name,
                    prizePool: parseFloat(tournamentData.prizePool)
                });
                showSnackbar('Tournament created successfully');
            }
            setOpenForm(false);
            await fetchTournaments();
        } catch (err) {
            showSnackbar(err.message || 'Operation failed');
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Tournaments</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setCurrentTournament(null);
                        setOpenForm(true);
                    }}
                >
                    Add Tournament
                </Button>
            </Box>

            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={2}>
                    {tournaments.map(tournament => (
                        <Grid item xs={12} sm={6} key={tournament.id}>
                            <Accordion
                                expanded={expandedTournament === tournament.id}
                                onChange={() => handleExpand(tournament.id)}
                                sx={{
                                    transition: 'all 0.2s ease',
                                    '&.Mui-expanded': { margin: '16px 0' }
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h6">{tournament.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Prize: ${tournament.prizePool?.toFixed(2) || '0.00'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <People fontSize="small" sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {tournament.players?.length || 0}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {expandedTournament === tournament.id && (
                                        <>
                                            {tournament.players?.length > 0 ? (
                                                <List dense>
                                                    {tournament.players.map(player => (
                                                        <ListItem key={player.id}>
                                                            <ListItemAvatar>
                                                                <Avatar>{player.name?.charAt(0) || 'P'}</Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={player.name || `Player ${player.id}`}
                                                                secondary={`Balance: $${player.balance?.toFixed(2) || '0.00'}`}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No players registered
                                                </Typography>
                                            )}
                                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setCurrentTournament(tournament);
                                                        setOpenForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(tournament.id)}
                                                >
                                                    Delete
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

            <TournamentForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                onSubmit={handleSubmit}
                initialData={currentTournament}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
};

export default TournamentsPage;