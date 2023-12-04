import {
	ChangeEvent,
	DetailedHTMLProps,
	forwardRef,
	InputHTMLAttributes,
	useEffect,
	useState,
} from 'react';
import { tv } from 'tailwind-variants';
import { TCnpj } from '~/App/Shared/Types/TCnpj';
import { TCep } from '~/App/Shared/Types/TCep';
import { TCpf } from '~/App/Shared/Types/TCpf';
import { TCurrency } from '~/App/Shared/Types/TCurrency';
import { mask } from '~/App/Shared/Utils/Mask';

type TInput = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	iserror?: boolean;
	onBeforeChange?: {
		removeNumber?: boolean;
		removeUpperCase?: boolean;
		removeLowerCase?: boolean;
		removeSpecialCharacter?: boolean;
		regexForReplace?: RegExp;
		fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
		applyMask?: TCurrency | TCnpj | TCpf | TCep;
	};
	debounce?: number;
};

const input = tv({
	slots: {
		inputPropsInternal: [
			'group outline-none focus:ring-1 border h-11 py-1 px-2 rounded w-full text-black',
			'transition-all duration-500',
		],
	},
	variants: {
		color: {
			primary: {
				inputPropsInternal:
					'focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500',
			},
			error: {
				inputPropsInternal:
					'focus:ring-red-500 group-hover:border-red-500 focus:border-red-500',
			},

			normal: {
				inputPropsInternal: '',
			},
		},
	},

	defaultVariants: {
		color: 'normal',
	},
});

export const Input = forwardRef<HTMLInputElement, TInput>(
	(
		{ iserror, onBeforeChange, onChange, debounce, className, ...rest },
		ref,
	) => {
		const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
		const { inputPropsInternal } = input({
			color: iserror ? 'error' : 'primary',
		});

		async function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
			if (!onBeforeChange && onChange) {
				onChange(e);
				return;
			}

			const temp = { ...e };
			let valueTemp = temp.target.value;

			if (onBeforeChange?.removeLowerCase) {
				valueTemp = valueTemp.replace(/[a-z]/g, '');
			}

			if (onBeforeChange?.removeUpperCase) {
				valueTemp = valueTemp.replace(/[A-Z]/g, '');
			}

			if (onBeforeChange?.removeNumber) {
				valueTemp = valueTemp.replace(/\d/g, '');
			}

			if (onBeforeChange?.removeSpecialCharacter) {
				valueTemp = valueTemp.replace(
					/[!@#$%&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
					'',
				);
			}

			if (onBeforeChange?.regexForReplace) {
				valueTemp = valueTemp.replace(onBeforeChange?.regexForReplace, '');
			}

			if ((onBeforeChange?.applyMask as TCurrency)?.currency) {
				valueTemp = mask.real({
					value: valueTemp,
					decimalPlace: (onBeforeChange?.applyMask as TCurrency).currency
						?.decimalPlace,
				});
			}

			if ((onBeforeChange?.applyMask as TCnpj)?.cnpj) {
				valueTemp = mask.cnpj(valueTemp);
			}

			if ((onBeforeChange?.applyMask as TCpf)?.cpf) {
				valueTemp = mask.cpf(valueTemp);
			}

			if ((onBeforeChange?.applyMask as TCep)?.cep) {
				valueTemp = mask.cep(valueTemp);
			}

			temp.target.value = valueTemp;

			if (onBeforeChange?.fn && onChange) {
				const newEvent = onBeforeChange?.fn(temp);
				onChange(newEvent);
				return;
			}

			if (onChange) {
				onChange(temp);
			}
		}

		async function preOnChange(e: React.ChangeEvent<HTMLInputElement>) {
			if (!debounce) {
				onChangeCustom(e);
				return;
			}
			setEvent(e);
		}

		useEffect(() => {
			const timer = setTimeout(() => {
				if (debounce && event) {
					onChangeCustom(event);
				}
			}, debounce);

			return () => clearTimeout(timer);
		}, [event]);

		return (
			<input
				{...rest}
				ref={ref}
				className={inputPropsInternal({
					class: className,
				})}
				onChange={preOnChange}
			/>
		);
	},
);
