import { useToken } from '~/App/Shared/Hooks/UseToken';
import { useEffect, useState } from 'react';
import { TUser } from '~/App/Shared/Types/TUser';
import { useParams } from 'react-router-dom';
import { useTicket } from '../../Hooks/UseTicket';

export function AnalystInfo() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { ticket } = useTicket(ticketId);
	const { signTicketToMe } = useTicket(ticketId);
	const [user, setUser] = useState<TUser | null>(null);
	const { getUserInfo } = useToken();

	async function load() {
		setUser(await getUserInfo());
	}

	useEffect(() => {
		load();
	}, []);

	if (ticket?.analyst?.name) return ticket.analyst.name;
	if (!user?.roles.includes('analyst')) return null;
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
