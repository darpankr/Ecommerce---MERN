import API from './api';

export const getProfile = async () => API.get('/profile');
export const updateProfile = async (data) => API.put('/profile/update', data);