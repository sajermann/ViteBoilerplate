import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { objectToQuery } from '~/App/Shared/Utils/ObjectToQuery';
import { useTranslation } from '../../../Shared/Hooks/UseTranslation';

type Props = {
	onChange: (data: string) => void;
};

export function useSearch({ onChange }: Props) {
	const { translate } = useTranslation();

	const formSchema = z.object({
		title: z.string(),
		createdAt: z.string(),
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

	const handleSearch: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		onChange(objectToQuery(data));
	};

	const memoizedValue = useMemo(
		() => ({
			handleSubmit: handleSubmit(handleSearch),
			register,
			errors,
			setValue,
			getValues,
			reset,
		}),
		[errors],
	);
	return memoizedValue;
}
