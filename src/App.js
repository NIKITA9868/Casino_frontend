import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import TournamentsPage from './pages/TournamentsPage';
import BetsPage from './pages/BetsPage';
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import {Box} from "@mui/material";

function App() {
    return (
        <Router>
          
            <Header />

            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/tournaments" element={<TournamentsPage />} />
                    <Route path="/bets" element={<BetsPage />} />
                </Routes>
            </Layout>

        </Router>

    );
}

export default App;