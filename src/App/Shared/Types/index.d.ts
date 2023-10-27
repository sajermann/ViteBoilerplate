// eslint-disable-next-line prettier/prettier
import '@tanstack/react-table'

export {};

declare global {
	interface Window {
		store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
	}
}

declare module '@tanstack/table-core' {
	interface ColumnMeta {
		align: TextAlign;
	}
}
