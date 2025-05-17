import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import BetCard from '../components/Bets/BetCard';
import BetForm from '../components/Bets/BetForm';
import {getAllBetsWithPlayers, deleteBet, getAllBetsWithPlayerNames} from '../api/betsApi';

const BetsPage = () => {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [formOpen, setFormOpen] = useState(false);

    const fetchBets = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllBetsWithPlayerNames(); // Используем новый метод
            setBets(data);
        } catch (err) {
            setError(err.message);
            showSnackbar(err.message || 'Failed to load bets');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (playerId, betId) => {
        try {
            await deleteBet(playerId, betId);
            await fetchBets();
            showSnackbar('Bet deleted successfully');
        } catch (err) {
            showSnackbar(err.message || 'Failed to delete bet');
        }
    };

    const handleFormSuccess = () => {
        setFormOpen(false);
        fetchBets();
    };

    const showSnackbar = (message) => {
        setSnackbar({ open: true, message });
    };

    useEffect(() => {
        fetchBets();
    }, []);

    return (
        <Container maxWidth="lg">
            {/* Навигация и заголовок */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Bets Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setFormOpen(true)}
                >
                    New Bet
                </Button>
            </Box>

            {/* Состояния загрузки/ошибки */}
            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {/* Список ставок */}
            {!loading && !error && (
                <Box sx={{ '& > *': { mb: 2 } }}>
                    {bets.length > 0 ? (
                        bets.map(bet => (
                            <BetCard
                                key={bet.id}
                                bet={bet}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No bets found
                        </Typography>
                    )}
                </Box>
            )}

            {/* Форма создания ставки */}
            <BetForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSuccess={handleFormSuccess}
            />

            {/* Уведомления */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Container>
    );
};

export default BetsPage;