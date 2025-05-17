import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from '@mui/material';
import {createPlayer, updatePlayer} from "../../api/playersApi";

const PlayerForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        balance: 0,
        ...initialData
    });

    useEffect(() => {
        setFormData({
            name: '',
            balance: 0,
            ...initialData
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'balance' ? parseFloat(value || 0) : value
        }));
    };

    const handleSubmit = async () => {
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error saving player:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData ? 'Edit Player' : 'Add New Player'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="balance"
                        label="Balance"
                        type="number"
                        value={formData.balance || 0}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{ step: "0.01" }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PlayerForm;