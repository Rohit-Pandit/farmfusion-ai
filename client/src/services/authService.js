import api from './api.js';


const register = async (userData) => {
    try {

        const response = await api.post('/auth/register', userData);
        return response.data;
        
    } catch (error) {
        throw error;    
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }   
};

export { register, loginUser }; 