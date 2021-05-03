import React, { useMemo } from 'react';
import { TableBody, TableElement, TableHeading, TD, TH, TR } from './Style';

// Util Functions
const makeHeadings = (headings: string[]) => {
	return headings.map((tableHeading, index) => <TH key={index}>{tableHeading}</TH>);
};

const makeTableBody = (bodyData: JSX.Element[][]) => {
	return bodyData.map((tableRow: JSX.Element[], index) => {
		return (
			<TR key={index}>
				{tableRow.map((data, index) => (
					<TD key={index}>{data}</TD>
				))}
			</TR>
		);
	});
};
// -------------------

// Props
interface TableProps {
	tableHeadings: string[];
	tableData: JSX.Element[][];
}
// -------------------

// Component
const Table: React.FC<TableProps> = ({ tableHeadings, tableData }) => {
	// Renders thead
	const renderHeadings = useMemo(() => {
		return makeHeadings(tableHeadings);
	}, [tableHeadings]);

	// renders tbody
	const renderBody = useMemo(() => {
		return makeTableBody(tableData);
	}, [tableData]);

	return (
		<TableElement>
			<TableHeading>
				<TR>{renderHeadings}</TR>
			</TableHeading>
			<TableBody>{renderBody}</TableBody>
		</TableElement>
	);
};

export default Table;
