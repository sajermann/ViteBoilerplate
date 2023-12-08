import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { customToast } from '~/App/Shared/Utils/CustomToast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePagination } from '~/App/Shared/Hooks/UsePagination';
import { TMessage } from '../../Types/Message';
import { useAttachments } from '../UseAttachments';

const KEY_TICKETS = 'messages';
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'application/pdf',
];

export function useMessage(ticketId?: string) {
	const [modalAttachmentsIsOpen, setModalAttachmentsIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData, isLoading } = useAxios();
	const { files, setFiles, handleRemoveFile } = useAttachments();
	const { setPageCount, pagination, setPagination, backQuery } =
		usePagination();
	const { data: messages } = useQuery<TMessage[]>({
		queryKey: [KEY_TICKETS, ticketId, backQuery],
		queryFn: async () => {
			if (!ticketId) return [];
			const result = await fetchData({
				method: 'get',
				url: `v1/message/getByTicketId/${ticketId}?pageSize=10&pageIndex=0`,
			});
			if (result?.status === 200) {
				setPageCount(
					Math.ceil(result.data.pagination.total / pagination.pageSize),
				);
				return result.data.data;
			}
			return [];
		},
		keepPreviousData: false,
	});
	const queryClient = useQueryClient();

	const filesSchema = z
		.any()
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, .png and .pdf formats are supported.',
		)
		.optional();

	const formSchema = z.object({
		message: z
			.string()
			.min(
				5,
				translate('PLEASE_ENTER_A_MINIMUM_OF_5_CHARACTERS_IN_THIS_FIELD'),
			),
		attachments: z.array(filesSchema).optional(),
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

	function afterPostMessageSuccess() {
		reset();
		revalidateData();
		setFiles([]);
	}

	const handleCreate: SubmitHandler<FormData> = async data => {
		formSchema.parse({ ...data });
		const form = new FormData();
		form.append('description', data.message);
		form.append('ticketId', ticketId || '');
		if (data.attachments && data.attachments.length > 0) {
			for (const item of data.attachments) {
				form.append('files', item);
			}
		}

		const result = await fetchData({
			method: 'post',
			url: 'v1/message',
			data: form,
		});
		if (result?.status === 201) {
			customToast({
				msg: translate('MESSAGE_ADDED_SUCCESS'),
				type: 'success',
			});
			afterPostMessageSuccess();
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
			files,
			setFiles,
			handleRemoveFile,
			setPagination,
			pagination,
		}),
		[errors, modalAttachmentsIsOpen, isLoading, messages, files, pagination],
	);
	return memoizedValue;
}
