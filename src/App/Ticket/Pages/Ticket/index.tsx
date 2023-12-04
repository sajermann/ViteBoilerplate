import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useTicket } from '../../Hooks/UseTicket';
import { Message } from '../../Components/Message';

export function TicketPage() {
	const { id } = useParams<{ id: string }>();
	const { ticket } = useTicket(id);

	console.log({ ticket });
	return (
		<div className="flex flex-col ga-4">
			<h1>
				Ticket: <span className="italic">{ticket?.title}</span>
			</h1>
			<span>Status: {ticket?.status}</span>
			<span>
				Criado em:{' '}
				{ticket
					? format(new Date(ticket?.createdAt as string), 'dd/MM/yyyy, HH:mm')
					: ''}
			</span>
			<span>
				Atualizado em:{' '}
				{ticket
					? format(new Date(ticket?.updatedAt as string), 'dd/MM/yyyy, HH:mm')
					: ''}
			</span>
			<span>Analista: {ticket?.analyst}</span>

			<Message />
		</div>
	);
}
