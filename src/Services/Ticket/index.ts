import { AxiosError } from 'axios';
import { api } from '~/Config/Api';
import { TPaginationWithData } from '~/Types/TPaginationWithData';
import { TTicket } from '~/Types/TTicket';
import { managerErrors } from '~/Utils/ManagerErrors';

const BASE_URL = 'v1/ticket';

async function getTickets(filter?: string) {
	try {
		const { data } = await api.get<TPaginationWithData<TTicket[]>>(
			`${BASE_URL}?${filter}`,
		);
		return data;
	} catch (error) {
		managerErrors(error as AxiosError);
		return {
			data: [],
			totalCount: 0,
			pageCount: 0,
		};
	}
}

export const ticketService = {
	getTickets,
};
