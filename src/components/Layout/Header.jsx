import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Betting App
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"
                        sx={{ color: 'white' }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/players"
                        variant="contained"
                        size="large"
                        sx={{ color: 'white' }}
                    >
                        Players
                    </Button>
                    <Button
                        component={Link}
                        to="/tournaments"
                        variant="contained"
                        size="large"
                        sx={{ color: 'white' }}
                    >
                        Tournaments
                    </Button>
                    <Button
                        component={Link}
                        to="/bets"
                        variant="contained"
                        size="large"
                        sx={{ color: 'white' }}
                    >
                        Bets
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;