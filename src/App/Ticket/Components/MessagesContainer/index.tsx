import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useMessage } from '../../Hooks/UseMessage';
import { MessageForm } from '../MessageForm';
import { Messages } from '../Messages';

export function MessagesContainer() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { fetchNextPage, refContainerMessages } = useMessage(ticketId);

	function handleScroll() {
		if (!refContainerMessages || !refContainerMessages.current) return;
		// Verify user reach div top
		const isAtTop = refContainerMessages.current.scrollTop === 10;

		// if is at top, fire fetch next page
		if (isAtTop) fetchNextPage();
	}

	useEffect(() => {
		if (!refContainerMessages || !refContainerMessages.current) {
			console.log('Deu ruim');

			return undefined;
		}
		// Add listener scrollevent to div
		refContainerMessages.current.addEventListener('scroll', handleScroll);

		// Remove listener in desmont component
		return () => {
			if (!refContainerMessages || !refContainerMessages.current) return;
			refContainerMessages.current.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<Messages />
			<MessageForm />
		</div>
	);
}
