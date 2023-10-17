/* eslint-disable react/no-unstable-nested-components */
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Table } from '~/App/Shared/Components/Table';
import { format } from 'date-fns';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { TTicket } from '~/App/Shared/Types/TTicket';
import { Search } from '~/App/Ticket/Components/Search';
import { Input } from '~/App/Shared/Components/Input';
import { useTicket } from '../../Hooks/UseTicket';

export function TicketCreatePage() {
	const {
		tickets,
		isFetching,
		pageCount,
		pagination,
		setPagination,
		setFilterQuery,
	} = useTicket();
	const { translate } = useTranslation();

	return (
		<form>
			<Input
				inputProps={{
					placeholder: 'Buscar pelo Título',
					id: 'title',
					// ...register('title'),
				}}
				labelProps={{
					children: 'Título',
				}}
			/>
		</form>
	);
}
