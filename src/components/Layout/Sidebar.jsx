import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, People, SportsEsports, MonetizationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <List>
                {[
                    { text: 'Home', icon: <Home />, path: '/' },
                    { text: 'Players', icon: <People />, path: '/players' },
                    { text: 'Tournaments', icon: <SportsEsports />, path: '/tournaments' },
                    { text: 'Bets', icon: <MonetizationOn />, path: '/bets' },
                ].map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;