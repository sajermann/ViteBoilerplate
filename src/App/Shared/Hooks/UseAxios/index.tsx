import { useEffect, useRef, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Interceptor from '~/Config/Api/interceptor';
import { managerErrors } from '../../Utils/ManagerErrors';

axios.defaults.baseURL = import.meta.env.VITE_URL_API;
axios.defaults.headers.common.Authorization = '';
axios.defaults.headers.common.Timezone =
	new Date().toTimeString().split(' ')[1] || '';

Interceptor(axios);

type TAlter = {
	response?: AxiosResponse;
	error?: AxiosError;
	isLoading: boolean;
};

export function useAxios(axiosParams?: AxiosRequestConfig) {
	const [alter, setAlter] = useState<TAlter>({
		response: undefined,
		error: undefined,
		isLoading: false,
	});
	const controllerRef = useRef(new AbortController());

	function cancel() {
		controllerRef.current.abort();
	}

	async function fetchData(axiosParamsInternal?: AxiosRequestConfig) {
		if (!axiosParamsInternal) return null;
		try {
			setAlter({
				response: undefined,
				error: undefined,
				isLoading: true,
			});
			const result = await axios.request({
				...axiosParamsInternal,
				signal: controllerRef.current.signal,
			});
			setAlter(prev => ({ ...prev, response: result }));
			return result;
		} catch (err) {
			managerErrors(err as AxiosError);
			setAlter({
				response: undefined,
				error: err as AxiosError,
				isLoading: true,
			});
			return null;
		} finally {
			setAlter(prev => ({ ...prev, isLoading: false }));
		}
	}

	useEffect(() => {
		fetchData(axiosParams);
		return () => {
			if (import.meta.env.DEV) return;
			cancel();
		};
	}, [axiosParams?.url]);

	return {
		response: alter.response,
		error: alter.error,
		isLoading: alter.isLoading,
		fetchData,
		cancel,
	};
}
