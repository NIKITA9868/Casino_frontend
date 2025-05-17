import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080', // Убедитесь, что порт совпадает с бэкендом
    timeout: 5000, // Таймаут запроса
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

API.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Обрабатываем стандартные HTTP ошибки
            switch (error.response.status) {
                case 404:
                    error.message = 'Ресурс не найден (проверьте URL)';
                    break;
                case 500:
                    error.message = 'Ошибка сервера';
                    break;
            }
        } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            error.message = 'Нет ответа от сервера';
        }
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    response => response,
    error => {
        if (error.message === 'Network Error') {
            error.message = 'Не удалось подключиться к серверу. Проверьте соединение.';
        }
        return Promise.reject(error);
    }
);

export const getTournaments = async () => {
    try {
        const response = await API.get('/tournaments');
        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch tournaments');
    }
};

export const getTournamentById = async (id) => {
    try {
        const response = await API.get(`/tournaments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tournament:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch tournament');
    }
};

export const createTournament = async (tournamentData) => {
    try {
        const response = await API.post('/tournaments', { // Обратите внимание на /api/
            name: tournamentData.name,
            prizePool: parseFloat(tournamentData.prizePool) // Преобразуем в число
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка создания турнира:', error);
        throw error; // Пробрасываем ошибку для обработки в компоненте
    }
};

export const updateTournament = async (id, tournamentData) => {
    try {
        const response = await API.put(`/tournaments/${id}`, {
            name: tournamentData.name,
            prizePool: parseFloat(tournamentData.prizePool)
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка обновления турнира:', error);
        throw error;
    }
};

export const deleteTournament = async (id) => {
    try {
        await API.delete(`/tournaments/${id}`);
    } catch (error) {
        console.error('Error deleting tournament:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete tournament');
    }
};

export const registerPlayer = async (tournamentId, playerId) => {
    try {
        const response = await API.post(`/tournaments/${tournamentId}/register/${playerId}`);
        return response.data;
    } catch (error) {
        console.error('Error registering player:', error);
        throw new Error(error.response?.data?.message || 'Failed to register player');
    }
};

export const unregisterPlayer = async (tournamentId, playerId) => {
    try {
        const response = await API.post(`/tournaments/${tournamentId}/unregister/${playerId}`);
        return response.data;
    } catch (error) {
        console.error('Error unregistering player:', error);
        throw new Error(error.response?.data?.message || 'Failed to unregister player');
    }
};

export const getTournamentWithPlayers = async (id) => {
    const response = await API.get(`/tournaments/${id}?withPlayers=true`);
    return response.data;
};