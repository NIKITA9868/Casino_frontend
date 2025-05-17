import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to Betting App
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Manage players, tournaments and bets
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    component={Link}
                    to="/players"
                    variant="contained"
                    size="large"
                >
                    Players
                </Button>
                <Button
                    component={Link}
                    to="/tournaments"
                    variant="contained"
                    size="large"
                >
                    Tournaments
                </Button>
                <Button
                    component={Link}
                    to="/bets"
                    variant="contained"
                    size="large"
                >
                    Bets
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;