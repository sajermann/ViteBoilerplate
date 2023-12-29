import { useEffect } from 'react';
import { Textarea } from '~/App/Shared/Components/Textarea';
import { ContainerInput } from '~/App/Shared/Components/ContainerInput';
import { Label } from '~/App/Shared/Components/Label';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Button } from '~/App/Shared/Components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { CONSTANTS } from '~/App/Shared/Constants';
import { ErrorsInput } from '~/App/Shared/Components/ErrorsInput';

import { useMessage } from '../../Hooks/UseMessage';
import { UploadAttachments } from '../UploadAttachments';
import { AttachmentsList } from '../AttachmentsList';
import { MessageItem } from '../MessageItem';
import { CloseTicket } from '../CloseTicket';

export function Message() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { translate } = useTranslation();
	const navigate = useNavigate();

	const {
		messages = [],
		handleSubmit,
		register,
		errors,
		setValue,
		getValues,
		files,
		setFiles,
		handleRemoveFile,
		fetchNextPage,
		refContainerMessages,
	} = useMessage(ticketId);

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
			{/* <pre className="">{JSON.stringify({ messages }, null, 1)}</pre> */}
			{messages.length > 0 && <h2>{translate('MESSAGES')}</h2>}

			<div
				ref={refContainerMessages}
				className="border h-96 overflow-y-auto p-4"
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
			<span>
				{translate('COUNT_MESSAGES')}: {messages.length}
			</span>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<ContainerInput>
					<Label htmlFor="message" isError={!!errors.message?.message}>
						{translate('MESSAGE')}
					</Label>
					<Textarea
						id="message"
						{...register('message')}
						iserror={!!errors.message?.message}
					/>
					<ErrorsInput
						errors={
							errors.message?.message ? [errors.message?.message] : undefined
						}
					/>
					<ErrorsInput
						errors={
							errors.attachments?.message
								? [errors.attachments?.message]
								: undefined
						}
					/>
				</ContainerInput>
				<AttachmentsList
					files={files}
					onRemove={e => {
						const filesUpdateds = handleRemoveFile(e);
						setValue('attachments', [...filesUpdateds]);
					}}
				/>
				<div className="flex gap-4">
					<Button
						variant="outlined"
						onClick={() => navigate(CONSTANTS.URL.TICKET_ROOT)}
					>
						{translate('BACK')}
					</Button>
					<div className="flex gap-4 w-full justify-end">
						<CloseTicket />
						<UploadAttachments
							onSaveFiles={e => {
								setFiles(prev => [...prev, ...e]);
								const oldValues = getValues('attachments');
								setValue('attachments', [...(oldValues || []), ...e]);
							}}
						/>
						<Button>{translate('SEND_MESSAGE')}</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
