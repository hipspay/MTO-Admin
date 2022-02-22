import HttpService from '../services/http.service';

export const getDisputes = async () => HttpService.get('/admin/disputes');
export const getDispute = async (id) => HttpService.get(`/admin/disputes/${id}`);
