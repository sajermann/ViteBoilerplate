import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

type TInput = DetailedHTMLProps<
	InputHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
> & {
	iserror?: boolean;
};

const textareaVariant = tv({
	slots: {
		textareaPropsInternal: [
			'group outline-none focus:ring-1 border h-11 py-1 px-2 rounded w-full text-black',
			'transition-all duration-500',
		],
	},
	variants: {
		color: {
			primary: {
				textareaPropsInternal:
					'focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500',
			},
			error: {
				textareaPropsInternal:
					'focus:ring-red-500 group-hover:border-red-500 focus:border-red-500',
			},

			normal: {
				textareaPropsInternal: '',
			},
		},
	},

	defaultVariants: {
		color: 'normal',
	},
});

export const Textarea = forwardRef<HTMLTextAreaElement, TInput>(
	({ iserror, className, ...rest }, ref) => {
		const { textareaPropsInternal } = textareaVariant({
			color: iserror ? 'error' : 'primary',
		});

		return (
			<textarea
				{...rest}
				ref={ref}
				className={textareaPropsInternal({
					class: className,
				})}
			/>
		);
	},
);
