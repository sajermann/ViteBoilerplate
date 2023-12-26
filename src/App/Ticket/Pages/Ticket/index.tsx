import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Status } from '~/App/Shared/Components/Status';
import { useTicket } from '../../Hooks/UseTicket';
import { Message } from '../../Components/Message';
import { AnalystInfo } from '../../Components/AnalystInfo';

export function TicketPage() {
	const { id } = useParams<{ id: string }>();
	const { ticket } = useTicket(id);
	return (
		<div className="flex flex-col ga-4">
			<h1>
				Ticket: <span className="italic">{ticket?.title}</span>
			</h1>
			<span>
				Status: <Status status={ticket?.status} />
			</span>
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
			<span>
				Analista: <AnalystInfo analystName={ticket?.analyst?.name} id={id} />
			</span>

			<Message />
		</div>
	);
}
