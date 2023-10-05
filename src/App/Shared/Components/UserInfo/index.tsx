import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TUser } from '../../Types/TUser';
import { useToken } from '../../Hooks/UseToken';

export function UserInfo() {
	const [user, setUser] = useState<TUser | null>(null);
	const { getUserInfo } = useToken();

	async function load() {
		setUser(await getUserInfo());
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="flex items-center gap-2">
			<User />
			<div className="flex flex-col">
				<span className="text-base">
					{user?.name || ''} - {user?.roles[0] || ''}
				</span>
				<span className="text-sm">{user?.email || ''}</span>
			</div>
		</div>
	);
}
