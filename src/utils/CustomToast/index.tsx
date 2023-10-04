import clsx from 'clsx';
import toast from 'react-hot-toast';
import { Icons } from '~/Components/Shared/Icons';

type Props = {
	type: 'info' | 'success' | 'error' | 'warning';
	msg: string;
	id?: string;
};

const duration = 3000;

export function customToast({ type, msg, id }: Props) {
	const commonsType = {
		'bg-green-500 text-white': type === 'success',
		'bg-red-500 text-white': type === 'error',
		'bg-warning-500 text-warning-700': type === 'warning',
		'bg-info-500 text-info-700': type === 'info',
	};

	const icons = {
		info: <Icons nameIcon="info" />,
		success: <Icons nameIcon="checked" />,
		error: <Icons nameIcon="error" />,
		warning: <Icons nameIcon="info" />,
	};

	return toast.custom(
		t => (
			<div
				className={clsx({
					'max-w-2xl w-full shadow-lg rounded pointer-events-auto flex': true,
					'ring-1 ring-black ring-opacity-5  font-bold gap-1': true,
					' flex-col': true,
					'animate-enter': t.visible,
					'animate-leave': !t.visible,
					...commonsType,
				})}
			>
				<div className="flex w-full py-4 px-3">
					<div className="flex flex-1 w-0 items-center flex-row gap-2">
						<div
							className={clsx({
								'min-w-[1.75rem] w-7 max-w-[1.75rem]': true,
								'min-h-[1.75rem] h-7 max-h-[1.75rem]': true,
								...commonsType,
							})}
						>
							{icons[type]}
						</div>
						<div data-type={type}>{msg}</div>
					</div>

					<div className="flex items-center justify-center">
						<button
							type="button"
							data-role="close"
							onClick={() => {
								toast.dismiss(t.id);
							}}
							className={clsx({
								'w-5 h-4 flex items-center justify-center': true,
								...commonsType,
							})}
						>
							<Icons nameIcon="close" />
						</button>
					</div>
				</div>
			</div>
		),
		{
			duration,
			id,
		},
	);
}
