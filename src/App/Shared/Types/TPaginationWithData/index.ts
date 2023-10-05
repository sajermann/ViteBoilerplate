export type TPaginationWithData<T> = {
	data: T;
	totalCount: number;
	pageCount: number;
};
