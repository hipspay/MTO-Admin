import HttpService from '../services/http.service';

export const auth = async (signature) => HttpService.post('/auth/admin', undefined, { signature });
export const profile = async () => HttpService.get('admin/profile');
