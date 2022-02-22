import HttpService from '../services/http.service';

export const getOrders = async () => HttpService.get('/admin/orders');
export const getOrder = async (id) => HttpService.get(`/admin/orders/${id}`);
