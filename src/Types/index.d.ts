// eslint-disable-next-line prettier/prettier
export { };

declare global {
	interface Window {
		store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
	}
}
