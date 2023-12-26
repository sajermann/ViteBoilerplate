import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '~/App/Shared/Hooks/UseAxios';
import { customToast } from '~/App/Shared/Utils/CustomToast';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TTicket } from '../../Types/Ticket';

export function useTicket(id?: string) {
	const { fetchData } = useAxios();
	const { translate } = useTranslation();
	const queryClient = useQueryClient();
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
	});

	async function signTicketToMe() {
		const result = await fetchData({
			method: 'put',
			url: `v1/ticket/signTicketToMe`,
			data: {
				ticketId: id,
			},
		});
		if (result?.status === 200) {
			customToast({
				type: 'success',
				msg: translate('THIS_TICKET_IS_YOUR_NOW'),
			});
			queryClient.invalidateQueries({
				queryKey: ['ticket', JSON.stringify(id)],
			});
			return;
		}
		customToast({
			type: 'error',
			msg: translate('FAILED_TO_SIGN_TICKET_FOR_YOU'),
		});
	}

	const memoizedValue = useMemo(
		() => ({
			ticket,
			isFetching,
			signTicketToMe,
		}),
		[ticket, isFetching],
	);
	return memoizedValue;
}
