export type TPaginationWithData<T> = {
	data: T;
	pagination: {
		total: number;
	};
};
