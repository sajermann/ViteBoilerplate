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
		console.log({ data, status });
		return status === 201;
	} catch (error) {
		console.log({ error });
		// managerErrors(error as AxiosError);
		return false;
	}
}
export const loginService = {
	signup,
};
