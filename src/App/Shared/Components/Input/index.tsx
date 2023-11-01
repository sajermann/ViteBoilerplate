/* eslint-disable jsx-a11y/label-has-associated-control */
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
	slots: {
		containerPropsInternal: 'group flex flex-col gap-1 w-full',
		labelPropsInternal: [
			'text-sm text-gray-500',
			'transition-all duration-500',
		],
		inputPropsInternal: [
			'group border p-4 rounded w-full text-black',
			'transition-all duration-500',
		],
	},
	variants: {
		color: {
			primary: {
				labelPropsInternal:
					'group-hover:text-blue-500 group-focus-within:text-blue-500',
				inputPropsInternal: 'outline-blue-700 group-hover:border-blue-500',
			},
			error: {
				labelPropsInternal:
					'group-hover:text-red-500 group-focus-within:text-red-500',
				inputPropsInternal: 'outline-red-700 group-hover:border-red-500',
			},

			normal: {
				labelPropsInternal: '',
				inputPropsInternal: '',
			},
		},
	},

	defaultVariants: {
		// size: 'md',
		color: 'normal',
	},
});

export function Input({ inputProps, labelProps, containerProps }: Props) {
	const { labelPropsInternal, inputPropsInternal, containerPropsInternal } =
		input({
			color: 'primary',
		});

	return (
		<div
			{...containerProps}
			className={containerPropsInternal({ class: containerProps?.className })}
		>
			{labelProps && (
				<label
					{...labelProps}
					htmlFor={inputProps?.id}
					className={labelPropsInternal({ class: labelProps.className })}
				/>
			)}
			<input
				{...inputProps}
				className={inputPropsInternal({ class: inputProps?.className })}
			/>
			{inputProps?.error && (
				<span className="text-sm text-red-500">{inputProps.error}</span>
			)}
		</div>
	);
}
