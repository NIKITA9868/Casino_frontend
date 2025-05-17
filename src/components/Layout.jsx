import { Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from "./Layout/Footer";

const Layout = ({ children }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4, display: 'flex', gap: 2 }}>

            </Box>
            {children}

        </Container>
    );
};

export default Layout;