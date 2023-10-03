import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { loginService } from '~/Services/Login';
import { useToast } from '../UseToast';
import { useTranslation } from '../UseTranslation';

export function useLogin() {
	const { translate } = useTranslation();
	const navigate = useNavigate();
	const { customToast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

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
		handleSubmit: handleSubmitForm,
		formState: { errors },
		setValue,
		getValues,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const handleLogin: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		setIsLoading(true);

		const hasCreated = await loginService.signup({
			email: data.email,
			password: data.password,
		});
		if (hasCreated) {
			navigate('/');
		}
		setIsLoading(false);
	};

	const memoizedValue = useMemo(
		() => ({
			isLoading,
			handleLogin,
			handleSubmitForm,
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
