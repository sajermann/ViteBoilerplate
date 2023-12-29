import { create } from 'zustand';
import { TUser } from '../../Types/TUser';

type TProps = {
	userLogged?: TUser;
	setUserLogged: (data?: TUser) => void;
};

export const useUserLogged = create<TProps>()(set => ({
	userLogged: undefined,
	setUserLogged: data => set(state => ({ ...state, user: data })),
}));
