import axios from 'axios';
import Interceptor from './interceptor';

const baseURL = import.meta.env.VITE_URL_API;

const headers = {
	'Access-Control-Origin': '*',
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json;charset=utf-8',
	'Access-Control-Allow-Method': 'POST,GET,DELETE',
	Timezone: new Date().toTimeString().split(' ')[1] || '',
};

export const api = axios.create({
	baseURL,
	headers,
});

Interceptor(api);
