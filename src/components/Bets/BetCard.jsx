import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const BetCard = ({ bet, onDelete }) => {
    return (
        <Card sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {bet.playerName}
                    </Typography>

                    <Chip
                        label={`$${bet.amount?.toFixed(2)}`}
                        color="primary"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            px: 2,
                            py: 1
                        }}
                    />
                </Box>

                <Button
                    startIcon={<Delete />}
                    onClick={() => onDelete(bet.playerId, bet.id)}
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ mt: 2 }}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default BetCard;