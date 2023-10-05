import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ticketService } from '~/App/Ticket/Services/Ticket';
import { TSearchParams } from '../../Types/TSearchParams';
import { removeParamsFromQuery } from '../../Utils/RemoveParamsFromQuery';
import { TPaginationWithData } from '../../Types/TPaginationWithData';
import { TTicket } from '../../Types/TTicket';
import { objectToQuery } from '../../Utils/ObjectToQuery';

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
