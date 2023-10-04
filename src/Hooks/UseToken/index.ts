import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as jose from 'jose';
import { customToast } from '~/Utils/CustomToast';
import { TUser } from '~/Types/TUser';

interface Props {
	accessToken: string | null;
	setAccessToken: (data: string | null) => void;
	refreshToken: string | null;
	setRefreshToken: (data: string | null) => void;
	clear: () => void;
	getUserInfo: () => Promise<TUser | null>;
}

export const useToken = create<Props>()(
	persist(
		(set, get) => ({
			accessToken: null,
			setAccessToken: (data: string | null) =>
				set(state => ({
					...state,
					accessToken: data,
				})),
			refreshToken: null,
			setRefreshToken: (data: string | null) =>
				set(state => ({
					...state,
					refreshToken: data,
				})),
			clear: () =>
				set(state => ({
					...state,
					accessToken: null,
					refreshToken: null,
				})),
			getUserInfo: async () => {
				try {
					const secret = new TextEncoder().encode(
						import.meta.env.VITE_ACCESS_TOKEN_SECRET,
					);
					const { payload } = await jose.jwtVerify(
						get().accessToken || '',
						secret,
						{
							clockTolerance: '2h',
						},
					);
					return payload as TUser;
				} catch (e) {
					console.log({ e });
					customToast({
						msg: 'Ocorreu um erro na decodificação do token',
						type: 'error',
						id: 'decode_token_invalid',
					});
					return null;
				}
			},
		}),
		{
			name: `${import.meta.env.VITE_APPLICATION_IDENTIFICATOR}:token`, // name of the item in the storage (must be unique)
		},
	),
);
window.store = useToken;
