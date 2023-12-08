import { managerClassNames } from '~/App/Shared/Utils/ManagerClassNames';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { format } from 'date-fns';

import { TMessage } from '../../Types/Message';
import { AttachmentLink } from '../AttachmentLink';

export function MessageItem({ item }: { item: TMessage }) {
	const { translate } = useTranslation();

	return (
		<div
			key={item.createdAt}
			className={managerClassNames([
				{ 'flex w-full': true },
				{ 'justify-end': item.author.role === 'user' },
			])}
		>
			<div className="flex flex-col gap-4 border rounded-lg p-2 hover:border-blue-500 transition-all duration-500">
				<span className="text-xs italic">
					{format(new Date(item.createdAt as string), 'dd/MM/yyyy, HH:mm')}
					{' - '}
					{translate('BY')} {item.author.name} ({item.author.role})
				</span>
				<span>{item.description}</span>
				<div className="flex gap-4 flex-wrap">
					{item.attachments.map((attachment, i) => (
						<AttachmentLink
							key={attachment.id}
							attachment={attachment}
							index={i}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
