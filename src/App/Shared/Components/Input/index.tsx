/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';

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
