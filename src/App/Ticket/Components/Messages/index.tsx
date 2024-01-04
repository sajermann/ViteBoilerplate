import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { LoadingBar } from '~/App/Shared/Components/LoadingBar';
import { managerClassNames } from '~/App/Shared/Utils/ManagerClassNames';
import { useMessage } from '../../Hooks/UseMessage';
import { MessageItem } from '../MessageItem';
import { useTicket } from '../../Hooks/UseTicket';

export function Messages() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { translate } = useTranslation();
	const {
		messages = [],
		refContainerMessages,
		isLoading,
	} = useMessage(ticketId);
	const { ticket } = useTicket(ticketId);
	if (isLoading && !ticket) return <Skeleton height={384 + 24 + 16} />;
	return (
		<>
			{messages.length > 0 && <h2>{translate('MESSAGES')}</h2>}
			<div className="border h-[390px] rounded-lg px-1 flex flex-col justify-center">
				<LoadingBar
					show={isLoading}
					external={{ className: 'rounded-lg' }}
					internal={{ className: 'rounded-lg' }}
				/>
				<div
					ref={refContainerMessages}
					className={managerClassNames({
						'h-96 overflow-y-auto p-4 w-full': true,
						'scrollbar-thin': true,
						'scrollbar-thumb-blue-500': true,
						'scrollbar-track-blue-300': true,
						'scrollbar-thumb-rounded-full': true,
						'scrollbar-track-rounded-full': true,
					})}
				>
					{messages.length < 1 && (
						<h2>{translate('ADD_YOUR_FIRST_MESSAGE_TO_TICKET')}</h2>
					)}
					<div className="w-full flex flex-col-reverse gap-4">
						{messages.map(item => (
							<MessageItem key={item.id} item={item} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}