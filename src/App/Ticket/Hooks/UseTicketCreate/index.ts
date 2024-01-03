import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { customToast } from '~/App/Shared/Utils/CustomToast';
import { useMutation } from '@tanstack/react-query';
import { useTickets } from '../UseTickets';

export function useTicketCreate() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData } = useAxios();
	const { revalidateData } = useTickets(); // TODO: Não está funcionando, pois a instancia é diferente da chamada pelo home dos tickets, ver se quando arrumar a paginacao isso melhora ou devemos mudar como revalidar
	const formSchema = z.object({
		title: z
			.string()
			.min(5, translate('TITLE_TICKET_MUST_CONTAIN_AT_LEAST_5_CHARACTERS')),
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
	function closeModal() {
		setModalIsOpen(false);
		reset();
	}
	const { mutate: saveTicket, isPending: isLoadingCreateTicket } = useMutation({
		mutationFn: async (data: FormData) => {
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
				customToast({
					msg: translate('TICKET_CREATED_SUCCESS'),
					type: 'success',
				});
				revalidateData(); // Não funcionanao
			}
		},
	});

	function openModal() {
		setModalIsOpen(true);
		clearErrors();
	}

	const handleCreate: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		saveTicket(data);
	};

	const memoizedValue = useMemo(
		() => ({
			handleSubmit: handleSubmit(handleCreate),
			register,
			errors,
			setValue,
			getValues,
			reset,
			control,
			modalIsOpen,
			closeModal,
			openModal,
			isLoadingCreateTicket,
		}),
		[errors, modalIsOpen, isLoadingCreateTicket],
	);
	return memoizedValue;
}
