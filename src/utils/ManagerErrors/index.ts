import { AxiosError } from 'axios';
import { customToast } from '../CustomToast';

type Props = {
	status: number;
	data: {
		message: unknown;
	};
};

type TMessageBack = {
	property: string;
	errors: string[];
};

export function managerErrors({ response }: AxiosError) {
	const { status, data } = response as Props;
	let errorString = '';
	console.log({ status, data });
	const objectWithErrors = Object.values(data.message as TMessageBack[]);
	for (const item of objectWithErrors) {
		errorString += `. ${item.errors.join(', ')}`;
	}
	console.log(errorString);
	if (status === 400) {
		customToast({
			msg: errorString.substring(2),
			type: 'error',
			id: 'ERROR_BAD_REQUEST',
		});
		return;
	}

	customToast({
		msg: 'Ocorreu um erro na aplicação',
		type: 'error',
		id: 'ERROR_BAD_REQUEST',
	});
}
