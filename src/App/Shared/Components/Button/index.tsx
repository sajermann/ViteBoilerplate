/* eslint-disable react/button-has-type */
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

type TColor = 'primary' | 'error' | 'success' | 'warning' | 'normal';
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
		'disabled:opacity-50 disabled:cursor-not-allowed h-14',
		'p-4 border hover:opacity-70 transition-all duration-500 rounded',
	],
	variants: {
		contained: {
			primary: 'bg-blue-500 text-white outline-blue-700',
			error: 'bg-red-500 text-white outline-red-700',
			success: 'bg-green-500 text-white outline-green-700',
			warning: 'bg-yellow-500 text-white outline-yellow-700',
			normal: 'bg-transparent text-current outline-current hover:bg-slate-200',
		},
		outlined: {
			primary: 'bg-transparent border-blue-500 text-blue-500 outline-blue-700',
			error: 'bg-transparent border-red-500 text-red-500 outline-red-700',
			success:
				'bg-transparent border-green-500 text-green-500 outline-green-700',
			warning:
				'bg-transparent border-yellow-500 text-yellow-500 outline-yellow-700',
			normal: 'bg-transparent text-current outline-current hover:bg-slate-200',
		},
		option: {
			primary:
				'bg-transparent border-0 text-blue-500 outline-blue-700 hover:bg-slate-200',
			error:
				'bg-transparent border-0 text-red-500 outline-red-700 hover:bg-slate-200',
			success:
				'bg-transparent border-0 text-green-500 outline-green-700 hover:bg-slate-200',
			warning:
				'bg-transparent border-0 text-yellow-500 outline-yellow-700 hover:bg-slate-200',
			normal:
				'bg-transparent border-0 text-current outline-current hover:bg-slate-200',
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
