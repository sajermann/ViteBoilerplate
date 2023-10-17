/* eslint-disable react/button-has-type */
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { managerClassNames } from '../../Utils/ManagerClassNames';

type Props = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: 'Outlined' | 'Option';
	colorStyle?: 'Secondary' | 'Success' | 'Warning';
};

export function Button({ colorStyle, className, variant, ...rest }: Props) {
	return (
		<button
			{...rest}
			className={managerClassNames({
				'disabled:opacity-50 disabled:cursor-not-allowed': true,
				'p-4 border hover:opacity-70 transition-all duration-500 rounded': true,
				'bg-blue-500 text-white outline-blue-700': !colorStyle && !variant,
				'bg-red-500 text-white outline-red-700': colorStyle === 'Secondary',
				'bg-green-500 text-white outline-green-700': colorStyle === 'Success',
				'bg-yellow-500 text-white outline-yellow-700': colorStyle === 'Warning',
				'border-blue-500 text-blue-500 outline-blue-700':
					variant === 'Outlined' && !colorStyle,
				[className as string]: className,

				'border-0 text-black outline-0': variant === 'Option' && !colorStyle,
				[className as string]: className,
			})}
		/>
	);
}
