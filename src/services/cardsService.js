import httpService from "./httpservice";
import usersService from "./usersService";



export const createCard = async (card) => {
    usersService.refreshToken();
    const res = await httpService.post('/cards', card);
    return res;
}

export const getCardById = async (cardId) => {
    const res = await httpService.get(`/cards/${cardId}`);
    return res;
}

export const getMyCards = async () => {
    usersService.refreshToken();
    const res = await httpService.get('/cards/my-cards');
    return res;
}

export const deleteCard = async (cardId) => {
    usersService.refreshToken();
    const res = await httpService.delete(`/cards/${cardId}`);
    return res;
}

export const toggleFavoriteCard = async (cardId) => {
    usersService.refreshToken();
    const res = await httpService.patch(`/cards/${cardId}`);
    return res;
}

const cardsService = {
    createCard,
    getCardById,
    getMyCards,
    toggleFavoriteCard,
}

export default cardsService