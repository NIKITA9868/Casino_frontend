import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getAllBetsWithPlayerNames = async () => {
    try {
        // Сначала получаем все ставки
        const betsResponse = await API.get('/bets');
        const bets = betsResponse.data;

        // Получаем всех игроков
        const playersResponse = await API.get('/players');
        const players = playersResponse.data;

        // Объединяем данные
        return bets.map(bet => {
            const player = players.find(p => p.id === bet.playerId);
            return {
                ...bet,
                playerName: player ? player.name : `Player ${bet.playerId}`
            };
        });
    } catch (error) {
        console.error('Error fetching bets with player names:', error);
        throw error;
    }
};

export const createBet = async (playerId, betData) => {
    try {
        // Отправляем только необходимые данные без ID
        const response = await API.post(`/players/${playerId}/bets`, {
            amount: betData.amount,
            eventId: betData.eventId
        });
        return response.data;
    } catch (error) {
        console.error('Error creating bet:', error);
        throw error;
    }
};

export const deleteBet = async (playerId, betId) => {
    try {
        await API.delete(`/players/${playerId}/bets/${betId}`);
    } catch (error) {
        console.error('Error deleting bet:', error);
        throw error;
    }
};