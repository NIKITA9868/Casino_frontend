import { Box, Typography, Button } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                textAlign: 'center'
            }}
        >
            <Typography variant="body1">
                Betting App © {new Date().getFullYear()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Все права защищены
            </Typography>

            {/* Простые кнопки без роутера */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.location.href = '/'}
                >
                    Главная
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.location.href = '/players'}
                >
                    Игроки
                </Button>
            </Box>
        </Box>
    );
};

export default Footer;