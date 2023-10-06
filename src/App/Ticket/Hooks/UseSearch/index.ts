import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../Shared/Hooks/UseTranslation';
import { useToken } from '../../../Shared/Hooks/UseToken';
import { useAxios } from '../../../Shared/Hooks/UseAxios';

export function useLogin() {
	const { fetchData, isLoading } = useAxios();
	const { translate } = useTranslation();
	const navigate = useNavigate();
	const { setAccessToken, setRefreshToken } = useToken();

	const formSchema = z.object({
		email: z
			.string()
			.nonempty(translate('FIELD_IS_REQUIRED'))
			.email(translate('DOES_NOT_LOOK_LIKE_A_VALID_EMAIL')),
		password: z.string().nonempty(translate('FIELD_IS_REQUIRED')),
	});

	type FormData = z.infer<typeof formSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const handleLogin: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		const result = await fetchData({
			method: 'post',
			url: 'v1/auth',
			data: {
				email: data.email,
				password: data.password,
			},
		});
		if (result?.status === 201) {
			setAccessToken(result.data.access_token);
			setRefreshToken(result.data.refresh_token);
			navigate('/');
		}
	};

	const memoizedValue = useMemo(
		() => ({
			isLoading,
			handleLogin,
			handleSubmit: handleSubmit(handleLogin),
			register,
			errors,
			setValue,
			getValues,
			reset,
		}),
		[isLoading, errors],
	);
	return memoizedValue;
}
