export type TMessage = {
	attachments: [];
	description: string;
	createdAt: string;
	author: {
		name: string;
		role: string;
	};
};
