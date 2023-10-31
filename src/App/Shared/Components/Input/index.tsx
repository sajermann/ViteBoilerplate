/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';
import { tv } from 'tailwind-variants';

type Props = {
	inputProps?: DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> & {
		error?: string;
	};
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	containerProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
};

const input = tv({
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

export function Input({ inputProps, labelProps, containerProps }: Props) {
	return (
		<div
			{...containerProps}
			className={clsx({
				'flex flex-col gap-1 w-full': true,
				[containerProps?.className as string]: containerProps?.className,
			})}
		>
			{labelProps && (
				<label
					{...labelProps}
					htmlFor={inputProps?.id}
					className={clsx({
						'text-sm text-gray-500': true,
						[labelProps?.className as string]: labelProps?.className,
					})}
				/>
			)}
			<input
				{...inputProps}
				className={clsx({
					'border p-4 rounded w-full text-black': true,
					[inputProps?.className as string]: inputProps?.className,
				})}
			/>
			{inputProps?.error && (
				<span className="text-sm text-red-500">{inputProps.error}</span>
			)}
		</div>
	);
}
