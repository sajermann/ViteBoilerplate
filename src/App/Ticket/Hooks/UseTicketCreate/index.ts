import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';

export function useTicketCreate() {
	const { translate } = useTranslation();
	const formSchema = z.object({
		title: z.string().nonempty(translate('FIELD_IS_REQUIRED')),
		description: z.string().nonempty(translate('FIELD_IS_REQUIRED')),
	});

	type FormData = z.infer<typeof formSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		reset,
		control,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const handleSearch: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		console.log({ data });
	};

	const memoizedValue = useMemo(
		() => ({
			handleSubmit: handleSubmit(handleSearch),
			register,
			errors,
			setValue,
			getValues,
			reset,
			control,
		}),
		[errors],
	);
	return memoizedValue;
}
