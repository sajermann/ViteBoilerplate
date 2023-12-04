import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { customToast } from '~/App/Shared/Utils/CustomToast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TMessage } from '../../Types/Message';

const KEY_TICKETS = 'messages';

export function useMessage(ticketId?: string) {
	const [modalAttachmentsIsOpen, setModalAttachmentsIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData, isLoading } = useAxios();
	const { data: messages } = useQuery<TMessage[]>({
		queryKey: [KEY_TICKETS, ticketId],
		queryFn: async () => {
			if (!ticketId) return [];
			const result = await fetchData({
				method: 'get',
				url: `v1/message/getByTicketId/${ticketId}?pageSize=10&pageIndex=0`,
			});
			if (result?.status === 200) {
				return result.data.data;
			}
			return [];
		},
		keepPreviousData: false,
	});
	const queryClient = useQueryClient();

	const formSchema = z.object({
		message: z.string().nonempty(translate('FIELD_IS_REQUIRED')),
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
		setModalAttachmentsIsOpen(true);
		clearErrors();
	}

	function closeModal() {
		setModalAttachmentsIsOpen(false);
		reset();
	}
	function revalidateData() {
		queryClient.invalidateQueries([KEY_TICKETS, ticketId]);
	}

	const handleCreate: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		const form = new FormData();
		form.append('description', data.message);
		form.append('ticketId', ticketId || '');
		// form.append('my_file', fileInput.files[0]);

		console.log({ form });

		const result = await fetchData({
			method: 'post',
			url: 'v1/message',
			data: form,
		});
		if (result?.status === 201) {
			closeModal();
			customToast({
				msg: translate('MESSAGE_ADDED_SUCCESS'),
				type: 'success',
			});
			revalidateData();
		}
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
			modalAttachmentsIsOpen,
			closeModal,
			openModal,
			isLoading,
			messages,
		}),
		[errors, modalAttachmentsIsOpen, isLoading, messages],
	);
	return memoizedValue;
}
