/* eslint-disable react/no-unstable-nested-components */
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Table } from '~/App/Shared/Components/Table';
import { format } from 'date-fns';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { Search } from '~/App/Ticket/Components/Search';
import { useTicket } from '../../Hooks/UseTicket';

export function TicketHomePage() {
	const {
		tickets,
		isFetching,
		pageCount,
		pagination,
		setPagination,
		setFilterQuery,
	} = useTicket();
	const { translate } = useTranslation();
	const [sortingInternal, setSortingInternal] = useState<
		Record<string, unknown>[]
	>([]);
	const columns = useMemo<ColumnDef<TTicket>[]>(
		() => [
			{
				accessorKey: 'title',
				header: translate('TITLE'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
				enableMultiSort: true,
			},
			{
				accessorKey: 'description',
				header: translate('DESCRIPTION'),
				minSize: 60,
				size: 60,
				align: 'left',
				enableResizing: false,
				enableMultiSort: true,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'createdAt',
				header: translate('CREATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
				cell: ({ getValue }) => (
					<span>
						{format(new Date(getValue() as string), 'dd/MM/yyyy, HH:mm')}
					</span>
				),
			},
			{
				accessorKey: 'updatedAt',
				header: translate('UPDATED_AT'),
				minSize: 60,
				size: 60,
				align: 'center',
				enableResizing: false,
				cell: ({ getValue }) => (
					<span>
						{format(new Date(getValue() as string), 'dd/MM/yyyy, HH:mm')}
					</span>
				),
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

	console.log({ sortingInternal });
	return (
		<div>
			<Search onSubmitForm={setFilterQuery} />
			<Table
				isLoading={isFetching}
				columns={columns}
				data={tickets || []}
				pagination={{
					pageCount,
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					setPagination,
					disabledActions: isFetching,
				}}
				sorting={{
					manualSorting: {
						fn: setSortingInternal,
					},
				}}
			/>
		</div>
	);
}
