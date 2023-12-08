import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TAttachment } from '../../Types/Attachment';
import { useAttachments } from '../../Hooks/UseAttachments';

export function AttachmentLink({
	attachment,
	index,
}: {
	attachment: TAttachment;
	index: number;
}) {
	const { translate } = useTranslation();
	const { generateAnchorForAttachment } = useAttachments();
	return (
		<a
			key={attachment.id}
			href={generateAnchorForAttachment(attachment.fileName)}
			target="_blank"
			rel="noreferrer"
			className="text-blue-500 hover:text-blue-700 text-xs italic"
		>
			{translate('ATTACHMENT')} {index + 1}
		</a>
	);
}
