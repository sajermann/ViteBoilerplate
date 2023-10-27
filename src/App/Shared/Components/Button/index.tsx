/* eslint-disable react/button-has-type */
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

type TColor = 'primary' | 'error' | 'success' | 'warning';
type TVariant = 'contained' | 'outlined' | 'option';

type Props = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variantType?: TVariant;
	colorStyle?: TColor;
};

const button = tv({
	base: [
		'disabled:opacity-50 disabled:cursor-not-allowed',
		'p-4 border hover:opacity-70 transition-all duration-500 rounded',
	],
	variants: {
		contained: {
			primary: 'bg-blue-500 text-white outline-blue-700',
			error: 'bg-red-500 text-white outline-red-700',
			success: 'bg-green-500 text-white outline-green-700',
			warning: 'bg-yellow-500 text-white outline-yellow-700',
		},
		outlined: {
			primary: 'bg-transparent border-blue-500 text-blue-500 outline-blue-700',
			error: 'bg-transparent border-red-500 text-red-500 outline-red-700',
			success:
				'bg-transparent border-green-500 text-green-500 outline-green-700',
			warning:
				'bg-transparent border-yellow-500 text-yellow-500 outline-yellow-700',
		},
		option: {
			primary: 'bg-transparent text-blue-500 outline-blue-700',
			error: 'bg-transparent text-red-500 outline-red-700',
			success: 'bg-transparent text-green-500 outline-green-700',
			warning: 'bg-transparent text-yellow-500 outline-yellow-700',
		},
		icon: {
			square: '',
			circle: '',
		},
		size: {
			sm: 'text-sm',
			md: 'text-base',
			lg: 'px-4 py-3 text-lg',
		},
	},
	defaultVariants: {
		size: 'md',
		contained: 'primary',
	},
});

export function Button({ colorStyle, className, variantType, ...rest }: Props) {
	return (
		<button
			{...rest}
			className={button({
				className,
				[variantType as TVariant]: colorStyle,
				size: 'lg',
			})}
		/>
	);
}
