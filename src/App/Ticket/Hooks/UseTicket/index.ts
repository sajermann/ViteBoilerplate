import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { TTicket } from '../../Types/Ticket';

export function useTicket(id?: string) {
	const { fetchData } = useAxios();
	const { data: ticket, isFetching } = useQuery<TTicket>({
		queryKey: ['ticket', JSON.stringify(id)],
		queryFn: async () => {
			if (!id) return null;
			const result = await fetchData({
				method: 'get',
				url: `v1/ticket/getbyid/${id}`,
			});
			if (result?.status === 200) {
				return result.data;
			}
			return null;
		},
		keepPreviousData: false,
		// staleTime: 1000 * 60, // 1 minute
	});

	const memoizedValue = useMemo(
		() => ({
			ticket,
			isFetching,
		}),
		[ticket, isFetching],
	);
	return memoizedValue;
}
