import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { objectToQuery } from '~/Utils/ObjectToQuery';
import { removeParamsFromQuery } from '~/Utils/RemoveParamsFromQuery';
import { TSearchParams } from '~/Types/TSearchParams';
import { TPaginationWithData } from '~/Types/TPaginationWithData';
import { ticketService } from '~/Services/Ticket';
import { TTicket } from '~/Types/TTicket';

const KEY_TICKETS = 'tickets';

export function useTicket() {
	const [searchParams, setSearchParams] = useState<TSearchParams>({});

	function handlePage(pageIndex: number) {
		const result = JSON.parse(
			removeParamsFromQuery(JSON.stringify(searchParams), 'pageIndex'),
		);
		setSearchParams({ ...result, pageIndex });
	}

	const { data: tickets, isFetching } = useQuery<
		TPaginationWithData<TTicket[]>
	>({
		queryKey: [KEY_TICKETS, JSON.stringify(searchParams)],
		queryFn: () => ticketService.getTickets(objectToQuery(searchParams)),
		keepPreviousData: true,
		// staleTime: 1000 * 60, // 1 minute
	});

	const memoizedValue = useMemo(
		() => ({
			tickets,
			isFetching,
			searchParams,
			handlePage,
		}),
		[tickets, isFetching, searchParams],
	);
	return memoizedValue;
}
