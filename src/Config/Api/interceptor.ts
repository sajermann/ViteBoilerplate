import {
	AxiosError,
	AxiosInstance,
	AxiosRequestHeaders,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

const APPLICATION_IDENTIFICATOR = import.meta.env
	.VITE_APPLICATION_IDENTIFICATOR;

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
	Authorization: string;
}

export default function Interceptor(api: AxiosInstance) {
	const onResponse = (response: AxiosResponse) => response;

	const onResponseError = async (error: AxiosError) => {
		if (!error.response) {
			// customToast({ type: "error", msg: "Sem conexão com o servidor" });
			return Promise.reject(error);
		}

		if (error.response?.status === 401) {
			console.log('ops');
			window.location.href = '/api/auth/logout';
			// expiredSession();
			return null;
		}

		if (error.response?.status === 500) {
			// internalServerError();
		}

		return Promise.reject(error);
	};

	api.interceptors.response.use(onResponse, onResponseError);

	const onRequest = (
		config: InternalAxiosRequestConfig<CustomAxiosRequestHeaders>,
	) => {
		const token = localStorage.getItem(`${APPLICATION_IDENTIFICATOR}:token`);
		const { headers } = config;
		// eslint-disable-next-line no-param-reassign
		config.headers = {
			...headers,
			Authorization: `Bearer ${token}`,
		} as CustomAxiosRequestHeaders;
		return config;
	};

	const onRequestError = (error: AxiosError): Promise<AxiosError> => {
		console.error(`[request error] [${JSON.stringify(error)}]`);
		return Promise.reject(error);
	};

	api.interceptors.request.use(e => onRequest(e), onRequestError);
}
