import HttpService from '../services/http.service';

export const getProducts = async () => HttpService.get('/admin/products');
export const getProduct = async (id) => HttpService.get(`/admin/products/${id}`);
