import { useState } from 'react';
import { useTranslation } from '../../i18n/UseTranslation';

export default function Home() {
	const { translate } = useTranslation();
	const [newItem, setNewItem] = useState('');
	const [list, setList] = useState(['Bruno', 'Marcia']);

	function addToList() {
		setTimeout(() => {
			setList(state => [...state, newItem]);
		}, 500);
	}

	function removeFromList(itemRemove: string) {
		setTimeout(() => {
			setList(state => state.filter(item => item !== itemRemove));
		}, 500);
	}
	return (
		<div data-testid="Batata">
			<h1>{translate('WELCOME_TO_VITE_BOILERPLATE')}</h1>
			<input
				type="text"
				data-testid="inputNewItem"
				placeholder="Novo Item"
				value={newItem}
				onChange={e => setNewItem(e.target.value)}
			/>
			<button type="button" onClick={addToList} className="bg-brand-500">
				Adicionar
			</button>
			<ul>
				{list.map(item => (
					<li key={item}>
						{item}
						<button type="button" onClick={() => removeFromList(item)}>
							Remover
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
