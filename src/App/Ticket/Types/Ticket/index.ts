import { TMessage } from '../Message';

export type TTicket = {
	id: string;
	title: string;
	description: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	analyst: string;
	messages: TMessage[];
	user: {
		name: string;
		id: string;
	};
};
