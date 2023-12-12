import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { customToast } from '~/App/Shared/Utils/CustomToast';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { usePagination } from '~/App/Shared/Hooks/UsePagination';
import { TMessage } from '../../Types/Message';
import { useAttachments } from '../UseAttachments';

const KEY_MESSAGE = 'useMessage';
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'application/pdf',
];

const pageSize = 5;

type TInfinitePagination<T> = {
	data: T;
	nextPage: number;
};

export function useMessage(ticketId?: string) {
	const [modalAttachmentsIsOpen, setModalAttachmentsIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData, isLoading } = useAxios();
	const { files, setFiles, handleRemoveFile } = useAttachments();

	const {
		data: messages,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery<TInfinitePagination<TMessage[]>>({
		queryKey: [KEY_MESSAGE, ticketId],
		queryFn: async ({ pageParam = 0 }) => {
			if (!ticketId) {
				return {
					data: [],
					nextPage: 0,
				};
			}
			console.log({ pageParam }, pageParam ?? 0);
			const result = await fetchData({
				method: 'get',
				url: `v1/message/getByTicketId/${ticketId}?pageIndex=${
					pageParam || 0
				}&pageSize=${pageSize}`,
			});
			if (result?.status === 200) {
				const dataResult = [...result.data.data];
				return {
					data: dataResult,
					nextPage:
						dataResult.length === pageSize ? (pageParam as number) + 1 : null,
				};
			}
			return {
				data: [],
				nextPage: 0,
			};
		},
		initialPageParam: 0,
		getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
		staleTime: 0,
		refetchOnMount: false,
	});

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

	function afterPostMessageSuccess() {
		reset();

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
			fetchNextPage,
		}),
		[errors, modalAttachmentsIsOpen, isLoading, messages, files],
	);
	return memoizedValue;
}
