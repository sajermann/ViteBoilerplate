import { TAttachment } from '../Attachment';

export type TMessage = {
	id: string;
	attachments: TAttachment[];
	description: string;
	createdAt: string;
	author: {
		name: string;
		role: string;
	};
};
