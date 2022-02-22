import HttpService from '../services/http.service';

export const getMerchants = async () => HttpService.get('/admin/merchants');
export const getMerchant = async (id) => HttpService.get(`/admin/merchants/${id}`);
export const getMerchantProducts = async (id) => HttpService.get(`/admin/merchants/products/${id}`);
