import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Home, Users } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCollapsedSidebar } from '~/Hooks/UseCollapsedSidebar';
import { useToken } from '~/Hooks/UseToken';
import { verifyRoles } from '~/Utils/VerifyRoles';

const OPTIONS = [
	{ description: 'Tickets', path: '/tickets', icon: <Home /> },
	{
		description: 'Usuários',
		path: '/users',
		icon: <Users />,
		roles: ['admin'],
	},
];

export function Sidebar() {
	const { isCollapsed, setIsCollapsed } = useCollapsedSidebar();
	const location = useLocation();
	const { getUserInfo } = useToken();
	const [showHeader, setShowHeader] = useState(false);
	const [rolesUser, setRolesUser] = useState<string[]>([]);

	async function loadRoles() {
		const result = await getUserInfo();
		setRolesUser(result?.roles || []);
	}

	useLayoutEffect(() => {
		if (location.pathname !== '/login') {
			loadRoles();
			setShowHeader(true);
			return;
		}
		setShowHeader(false);
	}, [location.pathname]);

	if (!showHeader) return null;

	return (
		<aside
			className={clsx([
				{ 'border-r h-full overflow-hidden': true },
				{ 'transition-all duration-500': true },
				{ 'w-48 min-w-[12rem]': !isCollapsed },
				{ 'w-16 min-w-[4rem]': isCollapsed },
			])}
		>
			<ul>
				<li className="flex items-center h-full">
					<button
						type="button"
						className={clsx([
							{ 'flex items-center gap-2 border-b p-2 w-full': true },
							{ 'transition-all duration-500': true },
							{ 'hover:bg-red-400 hover:text-white': true },
							{ 'justify-center': isCollapsed },
						])}
						onClick={() => setIsCollapsed()}
					>
						<div className="w-min">
							{isCollapsed ? <ChevronRight /> : <ChevronLeft />}
						</div>

						<span className={clsx([{ hidden: isCollapsed }])}>Esconder</span>
					</button>
				</li>
				{OPTIONS.map(
					item =>
						verifyRoles({
							allowRoles: item.roles || [],
							rolesForVerify: rolesUser,
						}) && (
							<li key={item.description} title={item.description}>
								<Link
									to={item.path}
									className={clsx([
										{ 'flex gap-2 border-b p-2': true },
										{ 'transition-all duration-500': true },
										{ 'hover:bg-red-400 hover:text-white': true },
										{ 'justify-center': isCollapsed },
									])}
								>
									<div className="w-min">{item.icon}</div>
									<span className={clsx([{ hidden: isCollapsed }])}>
										{item.description}
									</span>
								</Link>
							</li>
						),
				)}
			</ul>
		</aside>
	);
}
