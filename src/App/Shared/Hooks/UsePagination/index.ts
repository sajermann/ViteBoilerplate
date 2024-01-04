import { useEffect, useState } from 'react';
import { DEFAULT_PAG } from '../../Constants/Others';
import { objectToQuery } from '../../Utils/ObjectToQuery';
import { mapperSorting } from '../../Utils/MapperSorting';

export function usePagination() {
	const [backQuery, setBackQuery] = useState('');
	const [filterQuery, setFilterQuery] = useState('');
	const [pageCount, setPageCount] = useState(0);
	const [pagination, setPagination] = useState(DEFAULT_PAG);
	const [sorting, setSorting] = useState<Record<string, unknown>[]>([]);

	function resetPagination() {
		setPagination(prev => ({ ...prev, pageIndex: 0 }));
	}

	function mountQueryPagination() {
		const sortingMapped = mapperSorting(sorting);
		const queryPag = objectToQuery({ ...pagination, ...sortingMapped });
		setBackQuery(`${filterQuery}&${queryPag}`);
	}

	useEffect(() => {
		resetPagination();
	}, [filterQuery, pagination.pageSize]);

	useEffect(() => {
		mountQueryPagination();
	}, [pagination, sorting]);

	return {
		pagination,
		setPagination,
		pageCount,
		setPageCount,
		backQuery,
		filterQuery,
		setFilterQuery,
		sorting,
		setSorting,
	};
}
