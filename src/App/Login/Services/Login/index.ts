import { AxiosError } from 'axios';
import { managerErrors } from '~/App/Shared/Utils/ManagerErrors';
import { api } from '~/Config/Api';

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
