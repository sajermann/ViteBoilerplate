import { useParams } from 'react-router-dom';
import { useUserLogged } from '~/App/Shared/Hooks/useUserLogged';
import { managerClassNames } from '~/App/Shared/Utils/ManagerClassNames';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useTicket } from '../../Hooks/UseTicket';

export function AnalystInfo() {
	const { translate } = useTranslation();
	const { id: ticketId } = useParams<{ id: string }>();
	const { ticket, signTicketToMe, isLoadingSignTicketToMe } = useTicket(
		ticketId,
		'Analyst',
	);
	const { userLogged } = useUserLogged();

	if (ticket?.analyst?.name) return ticket.analyst.name;
	if (!userLogged?.roles.includes('analyst') || ticket?.status === 'closed')
		return null;
	return (
		<button
			disabled={isLoadingSignTicketToMe}
			className={managerClassNames([
				{ 'text-blue-500 hover:text-blue-700 transition-all': true },
				{ 'duration-500 disabled:cursor-not-allowed  ': true },
				{ 'disabled:opacity-50 disabled:active:opacity-50 ': true },
				{ 'disabled:active:opacity-50 disabled:hover:opacity-50': true },
			])}
			type="button"
			onClick={() => signTicketToMe()}
		>
			{!isLoadingSignTicketToMe
				? translate('SIGN_TICKET_TO_ME')
				: translate('IS_LOADING')}
		</button>
	);
}
