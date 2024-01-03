import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Table } from '~/App/Shared/Components/Table';
import { format } from 'date-fns';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { Search } from '~/App/Ticket/Components/Search';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/App/Shared/Components/Button';
import { Eye } from 'lucide-react';
import { Status } from '~/App/Shared/Components/Status';
import { useTickets } from '../../Hooks/UseTickets';

function buildColumns({
	navigate,
	translate,
}: {
	translate: (data: string) => string;
	navigate: (data: string) => void;
}): ColumnDef<TTicket>[] {
	return [
		{
			accessorKey: 'id',
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
			enableResizing: false,
			enableSorting: false,
			cell: ({ getValue }) => (
				<div className="w-full flex justify-center">
					<Button
						iconButton="squared"
						onClick={() => navigate(`/ticket/${getValue()}`)}
					>
						<Eye />
					</Button>
				</div>
			),
		},
		{
			accessorKey: 'title',
			header: translate('TITLE'),
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
			enableResizing: false,
			enableMultiSort: true,
		},
		{
			accessorKey: 'description',
			header: translate('DESCRIPTION'),
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
			enableResizing: false,
			enableMultiSort: true,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
			enableResizing: false,
			cell: ({ getValue }) => <Status status={getValue() as string} />,
		},
		{
			accessorKey: 'createdAt',
			header: translate('CREATED_AT'),
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
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
			meta: {
				align: 'center',
			},
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
			meta: {
				align: 'center',
			},
			enableResizing: false,
		},
		{
			accessorKey: 'analyst.name',
			header: translate('ANALYST'),
			minSize: 60,
			size: 60,
			meta: {
				align: 'center',
			},
			enableResizing: false,
		},
	];
}

export function TicketsPage() {
	const {
		tickets,
		isFetching,
		pageCount,
		pagination,
		setPagination,
		setFilterQuery,
	} = useTickets();
	const navigate = useNavigate();
	const { translate } = useTranslation();
	// TODO: Colocar o sorting no backend e usar do usequery
	const [sortingInternal, setSortingInternal] = useState<
		Record<string, unknown>[]
	>([]);

	const columns = buildColumns({ navigate, translate });

	return (
		<div className="w-full flex flex-col gap-4">
			<Search disabledButtons={isFetching} onSubmitForm={setFilterQuery} />
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
