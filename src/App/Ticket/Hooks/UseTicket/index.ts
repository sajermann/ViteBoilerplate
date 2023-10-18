import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { usePagination } from '~/App/Shared/Hooks/UsePagination';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';

const KEY_TICKETS = 'tickets';

export function useTicket() {
	const {
		pageCount,
		setPageCount,
		pagination,
		setPagination,
		setFilterQuery,
		backQuery,
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
				setPageCount(
					Math.ceil(result.data.pagination.total / pagination.pageSize),
				);
				return result.data.data;
			}
			return null;
		},
		keepPreviousData: true,
		// staleTime: 1000 * 60, // 1 minute
	});

	function insertTicket(ticket: TTicket) {
		const oldData =
			queryClient.getQueryData<TTicket[]>([
				KEY_TICKETS,
				JSON.stringify(backQuery),
			]) || [];

		queryClient.setQueryData(
			[KEY_TICKETS, JSON.stringify(backQuery)],
			[{ ...ticket }, ...oldData.slice(0, -1)],
		);
	}

	const memoizedValue = useMemo(
		() => ({
			tickets,
			isFetching,
			pageCount,
			pagination,
			setPagination,
			setFilterQuery,
			insertTicket,
		}),
		[tickets, isFetching, pageCount, pagination],
	);
	return memoizedValue;
}
