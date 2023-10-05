export type TTicket = {
	id: string;
	title: string;
	description: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	analyst: {
		name: string;
	};
	user: {
		name: string;
	};
};
