import { Row } from '@tanstack/react-table';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { TSelection } from '~/App/Shared/Types/Table/TSelection';
import { useDarkMode } from '~/App/Shared/Hooks/UseDarkMode';
import { managerClassNames } from '~/App/Shared/Utils/ManagerClassNames';
import { tableUtils } from '~/App/Shared/Utils/Table';
import styles from './index.module.css';

type Props<T> = DetailedHTMLProps<
	HTMLAttributes<HTMLTableRowElement>,
	HTMLTableRowElement
> & {
	row?: Row<T>;
	selection?: Omit<TSelection<T>, 'disableCheckbox'>;
	expandLine?: {
		render: (data: Row<T>) => React.ReactNode;
	};
};
export function Tr<T>({
	row,
	children,
	selection,
	expandLine,
	...rest
}: Props<T>) {
	const { darkMode } = useDarkMode();
	return (
		<tr
			{...rest}
			className={managerClassNames([
				{ [styles.tr]: true },
				{ [styles.even]: row && row.index % 2 > 0 && !darkMode },
				{ '!bg-dark-500': row && row.index % 2 > 0 && darkMode },
				{ [styles.isSelected]: selection && row && row.getIsSelected() },
				{ [styles.isExpanded]: expandLine && row && row.getIsExpanded() },
				{ [rest.className as string]: rest.className },
			])}
			onClick={() => tableUtils.onClickRow({ row, selection })}
		>
			{children}
		</tr>
	);
}
