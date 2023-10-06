/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: 'Default' | 'Outlined' | 'Option';
	colorStyle?: 'Primary' | 'Secondary' | 'Success' | 'Warning';
};

export function Button({ colorStyle, className, ...rest }: Props) {
	return (
		<button
			{...rest}
			className={clsx({
				'disabled:opacity-50 disabled:cursor-not-allowed': true,
				'p-4 border hover:opacity-70 transition-all duration-500 rounded': true,
				'bg-blue-500 text-white outline-blue-700': !colorStyle,
				'bg-red-500 text-white outline-red-700': colorStyle === 'Secondary',
				'bg-green-500 text-white outline-green-700': colorStyle === 'Success',
				'bg-yellow-500 text-white outline-yellow-700': colorStyle === 'Warning',
				[className as string]: className,
			})}
		/>
	);
}
