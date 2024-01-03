import { useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { TMessage } from '../../Types/Message';
import { useAttachments } from '../UseAttachments';
import { TInfinitePagination } from '../../Types/InfinitePagination';

const KEY_MESSAGE = 'useMessage';
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'application/pdf',
];

const pageSize = 10;

export function useMessage(ticketId?: string) {
	const [modalAttachmentsIsOpen, setModalAttachmentsIsOpen] = useState(false);
	const { translate } = useTranslation();
	const { fetchData } = useAxios();
	const queryClient = useQueryClient();
	const { files, setFiles, handleRemoveFile } = useAttachments();
	const refContainerMessages = useRef<HTMLDivElement>(null);
	// const refDivisorFetch = useRef<HTMLDivElement>(null);

	// TODO: Add useMutation to add message

	const {
		data,
		fetchNextPage,
		refetch,
		isFetching: isLoading,
	} = useInfiniteQuery<TInfinitePagination<TMessage[]>>({
		queryKey: [KEY_MESSAGE, ticketId],
		queryFn: async ({ pageParam = 0 }) => {
			if (!ticketId) {
				return {
					data: [],
					nextPage: null,
				};
			}

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
				nextPage: null,
			};
		},
		initialPageParam: 0,
		getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
	});
	console.log({ data });
	// useEffect(() => {
	// 	const observer = new IntersectionObserver(
	// 		entries => {
	// 			console.log(entries);
	// 			if (entries[0].isIntersecting) {
	// 				fetchNextPage();
	// 			}
	// 		},
	// 		{ threshold: 1 },
	// 	);

	// 	if (refDivisorFetch.current) {
	// 		observer.observe(refDivisorFetch.current);
	// 	}

	// 	return () => {
	// 		if (refDivisorFetch.current) {
	// 			observer.unobserve(refDivisorFetch.current);
	// 		}
	// 	};
	// }, [refDivisorFetch]);

	const messages = useMemo(() => {
		const result: TMessage[] = [];
		if (data) {
			for (const item of data.pages) {
				result.push(...(item as { data: TMessage[] }).data);
			}
		}
		return [...result];
	}, [data]);

	function scrollToBottomContainerMessages() {
		console.log('Scrolling');
		refContainerMessages?.current?.scrollBy({
			top: 9e9,
			left: 0,
			behavior: 'smooth',
		});
	}

	useEffect(() => {
		if (data?.pages.length === 1) {
			scrollToBottomContainerMessages();
		}
	}, [messages]);

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
		refetch();
		setFiles([]);
		scrollToBottomContainerMessages();
		queryClient.invalidateQueries({
			queryKey: ['ticket', JSON.stringify(ticketId)],
		});
	}

	const { mutate: saveCreate, isPending: isLoadingCreateMessage } = useMutation(
		{
			mutationFn: async (form: globalThis.FormData) => {
				const result = await fetchData({
					method: 'post',
					url: 'v1/message',
					data: form,
				});
				if (result?.status === 201) {
					afterPostMessageSuccess();
				}
			},
		},
	);

	const handleCreate: SubmitHandler<FormData> = async messageToCreate => {
		formSchema.parse({ ...messageToCreate });
		const form = new FormData();
		form.append('description', messageToCreate.message);
		form.append('ticketId', ticketId || '');
		if (messageToCreate.attachments && messageToCreate.attachments.length > 0) {
			for (const item of messageToCreate.attachments) {
				form.append('files', item);
			}
		}
		saveCreate(form);
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
			refContainerMessages,
			pageSize,
			isLoadingCreateMessage,
		}),
		[
			errors,
			modalAttachmentsIsOpen,
			isLoading,
			messages,
			files,
			refContainerMessages,
			isLoadingCreateMessage,
		],
	);
	return memoizedValue;
}
