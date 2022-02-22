import HttpService from '../services/http.service';

export const getAgents = async () => HttpService.get('/admin/agents');
export const getAgent = async (id) => HttpService.get(`/admin/agents/${id}`);
export const getAgentByStatus = async (status) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    HttpService.get(`/admin/agents?status=${status}`);
