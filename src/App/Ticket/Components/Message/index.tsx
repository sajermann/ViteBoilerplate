import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
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
import { useAttachments } from '../../Hooks/UseAttachments';

export function Message() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { translate } = useTranslation();
	const navigate = useNavigate();
	const refContainerMessages = useRef<HTMLDivElement>(null);
	const {
		messages = [],
		handleSubmit,
		register,
		errors,
	} = useMessage(ticketId);
	const { files, setFiles, handleRemoveFile } = useAttachments();

	async function scrollContainerMessatesToBottom() {
		refContainerMessages?.current?.scrollBy({
			top: 9e9,
			left: 0,
			behavior: 'smooth',
		});
	}

	useEffect(() => {
		scrollContainerMessatesToBottom();
	}, [messages]);

	return (
		<div className="flex flex-col gap-4">
			{messages.length > 0 && <h2>{translate('MESSAGES')}</h2>}
			<div ref={refContainerMessages} className="border h-96 overflow-y-auto ">
				<div className="w-full flex flex-col-reverse gap-4">
					{messages.map(item => (
						<div key={item.createdAt} className="border rounded-lg h-10">
							<span>
								{format(
									new Date(item.createdAt as string),
									'dd/MM/yyyy, HH:mm',
								)}
							</span>
							<span>{item.description}</span>
						</div>
					))}
				</div>
			</div>

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
				</ContainerInput>
				<AttachmentsList files={files} onRemove={handleRemoveFile} />
				<div className="flex gap-4">
					<UploadAttachments
						onSaveFiles={e => setFiles(prev => [...prev, ...e])}
					/>
					<Button>{translate('SEND_MESSAGE')}</Button>
					<Button
						variant="outlined"
						onClick={() => navigate(CONSTANTS.URL.TICKET_ROOT)}
					>
						{translate('BACK')}
					</Button>
				</div>
			</form>
		</div>
	);
}
