/**
 * @vitest-environment jsdom
 */

import { Row } from '@tanstack/react-table';
import { it, describe, expect } from 'vitest';

import { globalFilterFnCustom } from '.';

type TPerson = {
	id: string;
	name: string;
	lastName: string;
	birthday: string;
	email: string;
	avatar: string;
	role: 'Admin' | 'User' | 'Dev';
	isActive: boolean;
};

const rows = {
	getValue: _ => '1',
} as Row<TPerson>;

describe('Utils/Table/GlobalFilterFnCustom', () => {
	it(`should simulate true when value exists for filter`, async () => {
		const t = globalFilterFnCustom<TPerson>(rows, 'id', [
			{
				id: 'id',
				column: 'id',
				type: 'equals',
				value: '1',
				labelColumn: '',
				labelType: '',
			},
		]);
		expect(t).toBeTruthy();
	});

	it(`should simulate false when value not exists for filter`, async () => {
		const t = globalFilterFnCustom<TPerson>(rows, 'id', [
			{
				id: 'id',
				column: 'id',
				type: 'equals',
				value: '2',
				labelColumn: '',
				labelType: '',
			},
		]);
		expect(t).toBeFalsy();
	});
});
