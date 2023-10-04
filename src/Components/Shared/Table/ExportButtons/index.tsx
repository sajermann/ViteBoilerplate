import { Table } from '@tanstack/react-table';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TDefTools } from '~/Types/TExport';
import { Button } from '~/Components/Shared/Button';
import { Icons } from '~/Components/Shared/Icons';
import { exportTo } from '~/Utils/Export';

type Props<T> = {
	table: Table<T>;
	tools?: TDefTools<T>;
};
export function ExportButtons<T>({ tools, table }: Props<T>) {
	const { translate } = useTranslation();
	const { rows } = table.getRowModel();

	return (
		<div className="flex gap-2 justify-end">
			{tools?.defForPrint && (
				<Button
					onClick={() =>
						exportTo.print({
							data: rows.map(item => item.original),
							defColumns: tools?.defForPrint || [],
						})
					}
					title={translate('EXPORT_TO_PRINTER')}
					// startIcon={<Icons nameIcon="Printer" />}
				/>
			)}

			{tools?.defForPdf && (
				<Button
					onClick={() =>
						exportTo.pdf({
							data: rows.map(item => item.original),
							defColumns: tools?.defForPdf || [],
						})
					}
					title={translate('EXPORT_TO_PDF')}
					// startIcon={<Icons nameIcon="Pdf" />}
				/>
			)}

			{tools?.defForPng && (
				<Button
					onClick={() =>
						exportTo.png({
							data: rows.map(item => item.original),
							defColumns: tools?.defForPng || [],
						})
					}
					title={translate('EXPORT_TO_PNG')}
					// startIcon={<Icons nameIcon="Png" />}
				/>
			)}

			{tools?.defForExcel && (
				<Button
					onClick={() =>
						exportTo.excel({
							data: rows.map(item => item.original),
							defColumns: tools?.defForExcel || [],
						})
					}
					title={translate('EXPORT_TO_XLS')}
					// startIcon={<Icons nameIcon="Xls" />}
				/>
			)}

			{tools?.defForCsv && (
				<Button
					onClick={() =>
						exportTo.csv({
							data: rows.map(item => item.original),
							defColumns: tools?.defForCsv || [],
							delimiter: ',',
						})
					}
					title={translate('EXPORT_TO_CSV')}
					// startIcon={<Icons nameIcon="Csv" />}
				/>
			)}

			{tools?.defForXml && (
				<Button
					onClick={() =>
						exportTo.xml({
							data: rows.map(item => item.original),
							defColumns: tools?.defForXml || [],
						})
					}
					title={translate('EXPORT_TO_XML')}
					// startIcon={<Icons nameIcon="Xml" />}
				/>
			)}
		</div>
	);
}
