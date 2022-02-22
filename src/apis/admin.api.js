/* eslint-disable import/prefer-default-export */
import HttpService from '../services/http.service';

export const getStats = async () => HttpService.get('/admin/stats');
