import { useParams } from 'react-router-dom';
import { Status } from '~/App/Shared/Components/Status';
import Skeleton from 'react-loading-skeleton';
import { PropsWithChildren } from 'react';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { FormatedDate } from '~/App/Shared/Components/FormatedDate';
import { useTicket } from '../../Hooks/UseTicket';
import { Message } from '../../Components/Message';
import { AnalystInfo } from '../../Components/AnalystInfo';

function ContentOrSkeleton({
	children,
	isLoading,
}: PropsWithChildren<{ isLoading?: boolean }>) {
	if (isLoading) return <Skeleton />;

	return <span className="italic">{children}</span>;
}

export function TicketPage() {
	const { id: ticketId } = useParams<{ id: string }>();
	const { translate } = useTranslation();
	const { ticket, isFetching } = useTicket(ticketId);
	console.log({ isFetching });
	return (
		<div className="flex flex-col gap-4">
			<h1 className="italic">
				<ContentOrSkeleton isLoading={isFetching}>
					{ticket?.title}
				</ContentOrSkeleton>
			</h1>

			<div className="grid grid-cols-12 gap-6 flex-wrap">
				<div className="flex flex-col col-span-3">
					<span className="font-bold">Status</span>
					<ContentOrSkeleton isLoading={isFetching}>
						<Status status={ticket?.status} />
					</ContentOrSkeleton>
				</div>

				<div className="flex flex-col col-span-3">
					<span className="font-bold">{translate('CREATED_AT')}</span>
					<ContentOrSkeleton isLoading={isFetching}>
						<FormatedDate date={ticket?.createdAt} />
					</ContentOrSkeleton>
				</div>

				<div className="flex flex-col col-span-3">
					<span className="font-bold">{translate('UPDATED_AT')}</span>
					<ContentOrSkeleton isLoading={isFetching}>
						<FormatedDate date={ticket?.updatedAt} />
					</ContentOrSkeleton>
				</div>

				<div className="flex flex-col col-span-3">
					<span className="font-bold">{translate('ANALYST')}</span>
					<ContentOrSkeleton isLoading={isFetching}>
						<AnalystInfo />
					</ContentOrSkeleton>
				</div>
			</div>

			<Message />
		</div>
	);
}
