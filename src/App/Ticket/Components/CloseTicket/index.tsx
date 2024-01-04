import { Button } from '~/App/Shared/Components/Button';
import { Modal } from '~/App/Shared/Components/Modal';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserLogged } from '~/App/Shared/Hooks/useUserLogged';
import { useTicket } from '../../Hooks/UseTicket';

type TProps = {
	isDisabled?: boolean;
};

export function CloseTicket({ isDisabled }: TProps) {
	const { id: ticketId } = useParams<{ id: string }>();
	const [showButton, setShowButton] = useState(false);
	const { ticket, isFetching } = useTicket(ticketId);
	const { translate } = useTranslation();
	const { userLogged } = useUserLogged();
	const {
		closeTicket,
		isLoadingCloseTicket,
		isOpenModalCloseTicket,
		setIsOpenModalCloseTicket,
	} = useTicket(ticketId);

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

	if (!showButton) return null;
	return (
		<>
			<Button
				disabled={isDisabled}
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
							disabled={isLoadingCloseTicket}
							onClick={() => setIsOpenModalCloseTicket(false)}
							variant="option"
						>
							{translate('CANCEL')}
						</Button>

						<Button
							disabled={isLoadingCloseTicket}
							onClick={() => closeTicket()}
							withFeedback={{
								loadingOptions: {
									isLoading: isLoadingCloseTicket,
									typeLoadingIcon: 'Points',
								},
							}}
						>
							{translate('CONFIRM')}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
