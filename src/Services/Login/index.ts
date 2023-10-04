import { AxiosError } from 'axios';
import { api } from '~/Config/Api';
import { managerErrors } from '~/Utils/ManagerErrors';

const BASE_URL = 'v1/auth';

async function signup({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		const { data, status } = await api.post(`${BASE_URL}`, {
			email,
			password,
		});
		if (status === 201) return data;
		return false;
	} catch (error) {
		managerErrors(error as AxiosError);
		return false;
	}
}
export const loginService = {
	signup,
};
