import { useToken } from '~/App/Shared/Hooks/UseToken';
import { useEffect, useState } from 'react';
import { TUser } from '~/App/Shared/Types/TUser';
import { useTicket } from '../../Hooks/UseTicket';

type TProps = {
	analystName?: string;
	id?: string;
};

export function AnalystInfo({ analystName, id }: TProps) {
	const { signTicketToMe } = useTicket(id);
	const [user, setUser] = useState<TUser | null>(null);
	const { getUserInfo } = useToken();

	async function load() {
		setUser(await getUserInfo());
	}

	useEffect(() => {
		load();
	}, []);

	if (analystName) return analystName;
	if (!user?.roles.includes('analyst')) return null;
	return (
		<button
			className="text-blue-500 hover:text-blue-700 transition-all duration-500"
			type="button"
			onClick={signTicketToMe}
		>
			Delegar pra mim
		</button>
	);
}
