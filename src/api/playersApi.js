import axios from 'axios';

const API_URL = 'http://localhost:8080/players';


export const getPlayerById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};



export const updatePlayer = async (id, playerData) => {
    const response = await axios.put(`${API_URL}/${id}`, playerData);
    return response.data;
};

export const deletePlayer = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getPlayersWithBetsMoreThan = async (betsCount) => {
    const response = await axios.get(`${API_URL}/bets?bets=${betsCount}`);
    return response.data;
};


const API = axios.create({
    baseURL: 'http://localhost:8080', // Явно указываем базовый URL
    withCredentials: false, // Отключаем, если не используете куки
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем перехватчик для обработки ошибок
API.interceptors.response.use(
    response => response,
    error => {
        if (error.message === 'Network Error') {
            error.message = 'Не удалось подключиться к серверу. Проверьте соединение.';
        }
        return Promise.reject(error);
    }
);

export const getPlayers = async () => {
    try {
        const response = await API.get('/players');
        return response.data;
    } catch (error) {
        console.error('Ошибка при запросе игроков:', error);
        throw error;
    }
};

// Обработчик ошибок
const handleError = (error) => {
    if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
        console.error('Request error:', error.request);
        throw new Error('No response from server');
    } else {
        console.error('Error:', error.message);
        throw new Error('Request failed');
    }
};


export const createPlayer = async (playerData) => {
    try {
        const response = await API.post('/players', playerData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getPlayerWithTournaments = async (id) => {
    const response = await API.get(`/players/${id}?withTournaments=true`);
    return response.data;
};