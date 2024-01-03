import { Button } from '~/App/Shared/Components/Button';
import { Modal } from '~/App/Shared/Components/Modal';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserLogged } from '~/App/Shared/Hooks/useUserLogged';
import { useTicket } from '../../Hooks/UseTicket';

export function CloseTicket() {
	const [showButton, setShowButton] = useState(false);
	const { id: ticketId } = useParams<{ id: string }>();
	const { ticket, isFetching } = useTicket(ticketId);
	const { translate } = useTranslation();
	const { userLogged } = useUserLogged();

	const {
		closeTicket,
		isLoadingCloseTicket,
		isOpenModalCloseTicket,
		setIsOpenModalCloseTicket,
	} = useTicket(ticketId);
	console.log('CloseTicket', { userLogged });

	async function load() {
		if (isFetching || !ticket) return;

		if (
			userLogged?.sub === ticket?.user.id ||
			(userLogged?.sub === ticket?.analyst?.id && ticket?.status !== 'closed')
		) {
			setShowButton(true);
		}
	}

	useEffect(() => {
		load();
	}, [ticket, isFetching]);

	// TODO: Funcao pra fechar o ticket

	if (!showButton) return null;
	return (
		<>
			<Button
				onClick={() => setIsOpenModalCloseTicket(true)}
				type="button"
				variant="option"
				colorStyle="secondary"
			>
				{translate('CLOSE_TICKET')}
			</Button>
			<Modal
				title={translate('CLOSE_TICKET')}
				isOpen={isOpenModalCloseTicket}
				onClose={() => setIsOpenModalCloseTicket(false)}
				closeButton
			>
				<div className="p-4 flex flex-col gap-4 max-w-[30rem]">
					<span>{translate('SURE_YOU_CLOSE_THIS_TICKET')}?</span>
					<span>{translate('AFTER_CLOSED_IS_NOT_POSSIBLE')}:</span>
					<ul className="list-disc ml-5 italic">
						<li>{translate('ADD_MESSAGE')}</li>
						<li>{translate('REOPEN_TICKET_AGAIN')}</li>
					</ul>

					<div className="flex w-full gap-2">
						<Button
							onClick={() => setIsOpenModalCloseTicket(false)}
							variant="option"
						>
							{translate('CANCEL')}
						</Button>

						<Button onClick={() => closeTicket()}>
							{translate('CONFIRM')}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
