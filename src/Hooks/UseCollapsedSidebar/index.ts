import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Props {
	isCollapsed: boolean;
	setIsCollapsed: (data?: boolean) => void;
}

export const useCollapsedSidebar = create<Props>()(
	persist(
		set => ({
			isCollapsed: false,
			setIsCollapsed: (data?: boolean) =>
				set(state => ({
					...state,
					isCollapsed: data || !state.isCollapsed,
				})),
		}),
		{
			name: `${
				import.meta.env.VITE_APPLICATION_IDENTIFICATOR
			}:collapsed-sidebar`, // name of the item in the storage (must be unique)
		},
	),
);
window.store = useCollapsedSidebar;
