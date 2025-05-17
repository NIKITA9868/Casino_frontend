import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from '@mui/material';

const TournamentForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        prizePool: 0,
        ...initialData
    });

    useEffect(() => {
        setFormData({
            name: '',
            prizePool: 0,
            ...initialData
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'prizePool' ? parseFloat(value || 0) : value
        }));
    };

    const handleSubmit = async () => {
        try {
            await onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Error saving tournament:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{initialData ? 'Edit Tournament' : 'Add New Tournament'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="prizePool"
                        label="Prize Pool ($)"
                        type="number"
                        value={formData.prizePool}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{
                            step: "0.01",
                            min: "0.01"
                        }}
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

export default TournamentForm;