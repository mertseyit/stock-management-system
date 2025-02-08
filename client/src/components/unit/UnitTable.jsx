/* eslint-disable react/prop-types */
import { Table } from 'rsuite';
import { Cell, HeaderCell } from 'rsuite-table';
import Column from 'rsuite/esm/Table/TableColumn';
const UnitTable = ({ data }) => {
  return (
    <Table
      height={400}
      bordered
      data={data}
      className="rounded-sm"
      affixHeader
      affixHorizontalScrollbar
    >
      <Column width={300}>
        <HeaderCell>Birim Türü</HeaderCell>
        <Cell dataKey="birim_turu" />
      </Column>
      <Column width={300}>
        <HeaderCell>Oluşturulma Tarihi</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{new Date(rowData.createdat).toLocaleString()}</span>
          )}
        </Cell>
      </Column>
      <Column width={300}>
        <HeaderCell>Güncellenme Tarihi</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{new Date(rowData.updatedat).toLocaleString()}</span>
          )}
        </Cell>
      </Column>
      <Column width={300}>
        <HeaderCell>İşlem</HeaderCell>
        <Cell>{(rowData) => <span>İşlem ID: {rowData.id}</span>}</Cell>
      </Column>
    </Table>
  );
};

export default UnitTable;
