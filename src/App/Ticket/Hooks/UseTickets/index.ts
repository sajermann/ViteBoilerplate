import { useMemo } from 'react';
import {
	useQuery,
	useQueryClient,
	keepPreviousData,
} from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { usePagination } from '~/App/Shared/Hooks/UsePagination';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';

interface Props {
	pageCountPersist: number;
	setPageCountPersist: (data: number) => void;
}

const useStorage = create<Props>()(
	persist(
		set => ({
			pageCountPersist: 0,
			setPageCountPersist: (data: number) =>
				set(state => ({
					...state,
					pageCountPersist: data,
				})),
		}),
		{
			name: `${import.meta.env.VITE_APPLICATION_IDENTIFICATOR}:ticket`, // name of the item in the storage (must be unique)
		},
	),
);
window.store = useStorage;

const KEY_TICKETS = 'tickets';

export function useTickets() {
	const { pageCountPersist, setPageCountPersist } = useStorage();
	const {
		setPageCount: setPageCountInternal,
		pagination,
		setPagination,
		setFilterQuery,
		backQuery,
		sorting,
		setSorting,
	} = usePagination();
	const { fetchData } = useAxios();
	const queryClient = useQueryClient();

	const { data: tickets, isFetching } = useQuery<TTicket[]>({
		queryKey: [KEY_TICKETS, JSON.stringify(backQuery)],
		queryFn: async () => {
			if (!backQuery) return null;
			const result = await fetchData({
				method: 'get',
				url: `v1/ticket?${backQuery}`,
			});
			if (result?.status === 200) {
				setPageCountInternal(
					Math.ceil(result.data.pagination.total / pagination.pageSize),
				);
				// É preciso atualizar ambos, para que não ocorra o bug da pág 0
				setPageCountPersist(
					Math.ceil(result.data.pagination.total / pagination.pageSize),
				);

				return result.data.data;
			}
			return null;
		},
		placeholderData: keepPreviousData,
	});

	function revalidateData() {
		queryClient.invalidateQueries({
			queryKey: [KEY_TICKETS],
		});
	}

	const memoizedValue = useMemo(
		() => ({
			tickets,
			isFetching,
			pageCount: pageCountPersist,
			pagination,
			setPagination,
			setFilterQuery,
			revalidateData,
			sorting,
			setSorting,
		}),
		[tickets, isFetching, pageCountPersist, pagination, sorting],
	);
	return memoizedValue;
}
