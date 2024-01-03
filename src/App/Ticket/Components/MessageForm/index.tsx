import Skeleton from 'react-loading-skeleton';
import { Textarea } from '~/App/Shared/Components/Textarea';
import { ContainerInput } from '~/App/Shared/Components/ContainerInput';
import { Label } from '~/App/Shared/Components/Label';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Button } from '~/App/Shared/Components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { CONSTANTS } from '~/App/Shared/Constants';
import { ErrorsInput } from '~/App/Shared/Components/ErrorsInput';

import { useQueryClient } from '@tanstack/react-query';
import { useMessage } from '../../Hooks/UseMessage';
import { UploadAttachments } from '../UploadAttachments';
import { AttachmentsList } from '../AttachmentsList';
import { CloseTicket } from '../CloseTicket';
import { useTicket } from '../../Hooks/UseTicket';

export function MessageForm() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { translate } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { ticket } = useTicket(ticketId);

	const {
		handleSubmit,
		register,
		errors,
		setValue,
		getValues,
		files,
		setFiles,
		handleRemoveFile,
		isLoading,
		isLoadingCreateMessage,
	} = useMessage(ticketId);

	if (
		isLoading &&
		!queryClient.getQueryData(['ticket', JSON.stringify(ticketId)])
	)
		return (
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<Skeleton height={68} />
				<div className="flex gap-4">
					<Skeleton height={44} width={180} />
					<div className="flex gap-4 w-full justify-end">
						<Skeleton height={44} width={180} />
						<Skeleton height={44} width={180} />
						<Skeleton height={44} width={180} />
					</div>
				</div>
			</form>
		);

	if (ticket?.status === 'closed') {
		return (
			<Button
				type="button"
				variant="outlined"
				onClick={() => navigate(CONSTANTS.URL.TICKET_ROOT)}
			>
				{translate('BACK')}
			</Button>
		);
	}

	return (
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
					type="button"
					variant="outlined"
					onClick={() => navigate(CONSTANTS.URL.TICKET_ROOT)}
				>
					{translate('BACK')}
				</Button>
				<div className="flex gap-4 w-full justify-end">
					<CloseTicket isDisabled={isLoadingCreateMessage} />
					<UploadAttachments
						isDisabled={isLoadingCreateMessage}
						onSaveFiles={e => {
							setFiles(prev => [...prev, ...e]);
							const oldValues = getValues('attachments');
							setValue('attachments', [...(oldValues || []), ...e]);
						}}
					/>
					<Button
						type="submit"
						disabled={isLoadingCreateMessage}
						withFeedback={{
							loadingOptions: {
								isLoading: isLoadingCreateMessage,
								typeLoadingIcon: 'Points',
							},
						}}
					>
						{translate('SEND_MESSAGE')}
					</Button>
				</div>
			</div>
		</form>
	);
}
