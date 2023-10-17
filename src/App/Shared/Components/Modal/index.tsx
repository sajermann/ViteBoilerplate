import * as Dialog from '@radix-ui/react-dialog';
import {
	DetailedHTMLProps,
	ForwardRefExoticComponent,
	HTMLAttributes,
	RefAttributes,
	useEffect,
	useState,
} from 'react';
import { Icons } from '../Icons';
import { managerClassNames } from '../../Utils/ManagerClassNames';
import { Button } from '../Button';

type Props = {
	children: React.ReactNode;
	title?: string;
	isOpen: boolean;
	onClose: () => void;
	closeByBackdrop?: boolean;
	closeByEsc?: boolean;
	contentProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
	overlayProps?: object;
	closeButton?: boolean;
	expand?: {
		resetOnClose: boolean;
	};
};

export function Modal({
	children,
	title,
	isOpen,
	onClose,
	closeByBackdrop,
	closeByEsc,
	contentProps,
	overlayProps,
	closeButton,
	expand,
}: Props) {
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (expand && expand.resetOnClose && !isOpen) {
			setIsExpanded(false);
		}
	}, [isOpen]);

	return (
		<Dialog.Root open={isOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					{...overlayProps}
					className={managerClassNames([
						{ 'bg-black/60 inset-0 fixed z-[2]': true },
						// Look tailwind.config.cjs
						{ 'data-[state=open]:animate-overlayShow': true },
						{ 'data-[state=closed]:animate-overlayClose': true },
					])}
					onClick={closeByBackdrop ? onClose : undefined}
				/>
				<Dialog.Content
					{...(contentProps as ForwardRefExoticComponent<
						Dialog.DialogContentProps & RefAttributes<HTMLDivElement>
					>)}
					onEscapeKeyDown={closeByEsc ? onClose : undefined}
					className={managerClassNames([
						{ 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ': true },
						{ 'shadow-lg shadow-black/25 z-[3] dark:bg-slate-900 ': true },
						{ 'fixed rounded bg-white ': true },
						// Look tailwind.config.cjs
						{ 'data-[state=open]:animate-contentShow': true },
						{ 'data-[state=closed]:animate-contentClose': true },
						{ 'transition-all duration-300': true },
						{ '!w-full !h-full': isExpanded },
						{ [contentProps?.className as string]: contentProps?.className },
					])}
				>
					{title && (
						<Dialog.Title className="h-12 px-6 py-3 text-primary-500 font-bold flex items-center dark:bg-slate-900 border-b-[#dee2e6] border-b-2">
							{title}
							{expand && (
								<Button
									className="absolute top-2 right-16 text-primary-500 hover:text-primary-300 transition-colors duration-500"
									onClick={() => setIsExpanded(prev => !prev)}
								>
									{!isExpanded ? (
										<Icons nameIcon="arrowsOutSimple" />
									) : (
										<Icons nameIcon="arrowsInSimple" />
									)}
								</Button>
							)}

							{closeButton && (
								<Button
									variant="Option"
									className={managerClassNames({
										'absolute top-2 right-6 transition-colors': true,
										'duration-500 rounded-full w-8 h-w-8': true,
										'!p-2 flex items-center justify-center': true,
										'hover:bg-slate-200 text-slate-600': true,
									})}
									onClick={onClose}
									data-testid="closeButtonModal"
								>
									<Icons nameIcon="close" />
								</Button>
							)}
						</Dialog.Title>
					)}
					<main className="h-[calc(100%_-_48px)] dark:bg-gray-800 py-2">
						{children}
					</main>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
