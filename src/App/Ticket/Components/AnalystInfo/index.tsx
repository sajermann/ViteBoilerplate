import { useParams } from 'react-router-dom';
import { useUserLogged } from '~/App/Shared/Hooks/useUserLogged';
import { useTicket } from '../../Hooks/UseTicket';

export function AnalystInfo() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { ticket, signTicketToMe } = useTicket(ticketId, 'Analyst');
	const { userLogged } = useUserLogged();

	if (ticket?.analyst?.name) return ticket.analyst.name;
	if (!userLogged?.roles.includes('analyst')) return null;
	return (
		<button
			className="text-blue-500 hover:text-blue-700 transition-all duration-500"
			type="button"
			onClick={signTicketToMe}
		>
			Delegar pra mim
		</button>
	);
}
