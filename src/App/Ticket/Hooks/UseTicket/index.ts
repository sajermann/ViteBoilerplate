import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { usePagination } from '~/App/Shared/Hooks/UsePagination';
import { TTicket } from '../../../Shared/Types/TTicket';
import { useAxios } from '../../../Shared/Hooks/UseAxios';

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

	const memoizedValue = useMemo(
		() => ({
			tickets,
			isFetching,
			pageCount,
			pagination,
			setPagination,
			setFilterQuery,
		}),
		[tickets, isFetching, pageCount, pagination],
	);
	return memoizedValue;
}
