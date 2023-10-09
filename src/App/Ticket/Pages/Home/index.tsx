import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Table } from '~/App/Shared/Components/Table';

import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { Search } from '~/App/Ticket/Components/Search';
import { useTicket } from '../../Hooks/UseTicket';

export function TicketHomePage() {
	const { tickets, isFetching, pageCount, pagination, setPagination } =
		useTicket();
	const { translate } = useTranslation();
	const columns = useMemo<ColumnDef<TTicket>[]>(
		() => [
			{
				accessorKey: 'title',
				header: translate('TITLE'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'description',
				header: translate('DESCRIPTION'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
			},
			{
				accessorKey: 'createdAt',
				header: translate('CREATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'updatedAt',
				header: translate('UPDATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'user.name',
				header: translate('USER'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'analyst.name',
				header: translate('ANALYST'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
		],
		[translate],
	);
	return (
		<div>
			<Search onChange={console.log} />
			<Table
				columns={columns}
				data={tickets || []}
				pagination={{
					pageCount,
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					setPagination,
					disabledActions: isFetching,
				}}
			/>
		</div>
	);
}
