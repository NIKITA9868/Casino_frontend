import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Autocomplete,
    CircularProgress
} from '@mui/material';
import { createBet } from "../../api/betsApi";
import { getPlayers } from "../../api/playersApi";

const BetForm = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        playerId: '',
        amount: '',
        eventId: '1'
    });
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(false);

    useEffect(() => {
        const loadPlayers = async () => {
            setLoadingPlayers(true);
            try {
                const data = await getPlayers();
                setPlayers(data);
            } catch (error) {
                console.error('Failed to load players:', error);
            } finally {
                setLoadingPlayers(false);
            }
        };

        if (open) loadPlayers();
    }, [open]);

    const handleSubmit = async () => {
        try {
            await createBet(formData.playerId, {
                amount: parseFloat(formData.amount),
                eventId: formData.eventId
            });
            onSuccess();
        } catch (error) {
            console.error('Error creating bet:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Place New Bet</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    <Autocomplete
                        options={players}
                        loading={loadingPlayers}
                        getOptionLabel={(player) => player.name}
                        onChange={(e, player) => {
                            setFormData({
                                ...formData,
                                playerId: player?.id || ''
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Player"
                                required
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingPlayers ? <CircularProgress size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />

                    <TextField
                        label="Bet Amount ($)"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        inputProps={{
                            step: "0.01",
                            min: "0.01"
                        }}
                        required
                        fullWidth
                    />


                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!formData.playerId || !formData.amount || !formData.eventId}
                >
                    Place Bet
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BetForm;