import React, { useState } from 'react';

import { useTranslation } from '~/hooks/useTranslation';
import { delay } from '~/utils/delay';

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
    <div className="flex flex-col max-w-xl m-auto my-3 p-3 rounded bg-slate-900">
      <h1 className="text-3xl text-white">
        {translate('WELCOME_TO_VITE_BOILERPLATE')} - {translate('TODO_LIST')}
      </h1>
      <form onSubmit={addToList} className="flex gap-2 my-5">
        <input
          disabled={isLoading}
          required
          type="text"
          data-testid="inputNewItem"
          placeholder={translate('NEW_ITEM')}
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          className="text-gray-900 p-1 rounded bg-white"
        />
        <button
          type="submit"
          className="!bg-green-600 rounded p-2 hover:!bg-green-900 transition-colors duration-500 disabled:cursor-not-allowed text-white"
          disabled={isLoading}
        >
          {isLoading ? translate('ADDING...') : translate('ADD')}
        </button>
      </form>
      {list.length > 0 && (
        <h2 className="text-2xl text-white">{translate('ADDED_ITEMS')}</h2>
      )}
      <ul className="flex flex-col my-3 gap-2">
        {list.map(item => (
          <li className="flex text-white" key={item}>
            <span className="flex-1">{item}</span>
            <button
              disabled={isRemoving === item}
              type="button"
              className="bg-red-600 rounded p-2 hover:!bg-red-900; transition-colors duration-500 disabled:cursor-not-allowed text-white"
              onClick={() => removeFromList(item)}
            >
              {isRemoving === item
                ? translate('REMOVING...')
                : translate('REMOVE')}
            </button>
          </li>
        ))}
      </ul>

      <button className="w-10 h-10 bg-amber-400 sm:hidden">Button Test</button>
    </div>
  );
}
