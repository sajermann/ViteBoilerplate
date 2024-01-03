import { create } from 'zustand';
import { TUser } from '../../Types/TUser';
import { useToken } from '../UseToken';

type TProps = {
	userLogged: TUser | null;
	setUserLogged: (data: TUser | null) => void;
};

export const useUserLogged = create<TProps>()(set => ({
	userLogged: null,
	setUserLogged: data => set(state => ({ ...state, userLogged: data })),
}));

async function initializeUserLoggedData() {
	const result = await useToken.getState().extractUserInfoFromJwt();
	useUserLogged.setState(data => ({ ...data, userLogged: result }));
}

initializeUserLoggedData();
