import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { useTicket } from '../UseTicket';

export function useTicketCreate() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData, isLoading } = useAxios();
	const { insertTicket } = useTicket();

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
		clearErrors,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	function openModal() {
		setModalIsOpen(true);
		clearErrors();
	}

	function closeModal() {
		setModalIsOpen(false);
		reset();
	}

	const handleSearch: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		const result = await fetchData({
			method: 'post',
			url: 'v1/ticket',
			data: {
				title: data.title,
				description: data.description,
			},
		});
		if (result?.status === 201) {
			closeModal();
			insertTicket(result.data);
		}
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
			modalIsOpen,
			closeModal,
			openModal,
			isLoading,
		}),
		[errors, modalIsOpen, isLoading],
	);
	return memoizedValue;
}
