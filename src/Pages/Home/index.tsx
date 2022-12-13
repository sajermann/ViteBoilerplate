import React, { useState } from 'react';
import { useTranslation } from '~/Hooks/UseTranslation';
import { delay } from '~/Utils/Delay';

import styles from './index.module.css';

export default function Home() {
	const { translate } = useTranslation();
	const [newItem, setNewItem] = useState('');
	const [list, setList] = useState(['Bruno', 'Marcia']);
	const [isLoading, setIsLoading] = useState(false);
	const [isRemoving, setIsRemoving] = useState<string | null>(null);

	async function addToList(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		if (list.find(item => item === newItem)) {
			setNewItem('');
			setIsLoading(false);
			return;
		}
		await delay(1000);
		setList(state => [...state, newItem]);
		setNewItem('');
		setIsLoading(false);
	}

	async function removeFromList(itemForRemove: string) {
		setIsRemoving(itemForRemove);
		await delay(1000);
		setList(state => state.filter(item => item !== itemForRemove));
		setIsRemoving(null);
	}
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>
				{translate('WELCOME_TO_VITE_BOILERPLATE')} - {translate('TODO_LIST')}
			</h1>
			<form onSubmit={addToList} className={styles.form}>
				<input
					disabled={isLoading}
					required
					type="text"
					data-testid="inputNewItem"
					placeholder={translate('NEW_ITEM')}
					value={newItem}
					onChange={e => setNewItem(e.target.value)}
					className={styles.input}
				/>
				<button
					type="submit"
					className={styles.buttonSubmit}
					disabled={isLoading}
				>
					{isLoading ? translate('ADDING...') : translate('ADD')}
				</button>
			</form>
			{list.length > 0 && (
				<h2 className={styles.subHeading}>{translate('ADDED_ITEMS')}</h2>
			)}
			<ul className={styles.containerList}>
				{list.map(item => (
					<li key={item}>
						<span>{item}</span>
						<button
							disabled={isRemoving === item}
							type="button"
							className={styles.buttonRemove}
							onClick={() => removeFromList(item)}
						>
							{isRemoving === item
								? translate('REMOVING...')
								: translate('REMOVE')}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
