import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { Input } from '../../Input';

type Props = {
	globalFilter?: {
		filter: string;
		setFilter: Dispatch<SetStateAction<string>>;
		disableInput?: boolean;
	};
};

export function Search({ globalFilter }: Props) {
	const { translate } = useTranslation();
	if (!globalFilter || globalFilter.disableInput) return null;
	return (
		<Input
			inputProps={{
				value: globalFilter.filter,
				onChange: e => globalFilter?.setFilter(e.target.value),
				placeholder: translate('SEARCH'),
				type: 'search',
			}}
		/>
	);
}
