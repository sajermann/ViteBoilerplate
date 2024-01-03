import { User } from 'lucide-react';
import { useUserLogged } from '../../Hooks/useUserLogged';

export function UserInfo() {
	const { userLogged } = useUserLogged();

	return (
		<div className="flex items-center gap-2">
			<User />
			<div className="flex flex-col">
				<span className="text-base">
					{userLogged?.name || ''} - {userLogged?.roles[0] || ''}
				</span>
				<span className="text-sm">{userLogged?.email || ''}</span>
			</div>
		</div>
	);
}
