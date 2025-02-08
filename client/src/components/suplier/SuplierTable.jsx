/* eslint-disable react/prop-types */
import { Table } from 'rsuite';
import { Cell, HeaderCell } from 'rsuite-table';
import Column from 'rsuite/esm/Table/TableColumn';
const SuplierTable = ({ data }) => {
  return (
    <Table
      height={400}
      bordered
      data={data}
      className="rounded-sm"
      affixHeader
      affixHorizontalScrollbar
    >
      <Column width={240}>
        <HeaderCell>Tedarikçi Adı</HeaderCell>
        <Cell dataKey="tedarikci_adi" />
      </Column>
      <Column width={240}>
        <HeaderCell>Minimum Parti Büyüklüğü</HeaderCell>
        <Cell dataKey="minimum_parti_buyuklugu" />
      </Column>
      <Column width={240}>
        <HeaderCell>Oluşturulma Tarihi</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{new Date(rowData.createdat).toLocaleString()}</span>
          )}
        </Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>Güncellenme Tarihi</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{new Date(rowData.updatedat).toLocaleString()}</span>
          )}
        </Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>İşlem</HeaderCell>
        <Cell>{(rowData) => <span>İşlem ID: {rowData.id}</span>}</Cell>
      </Column>
    </Table>
  );
};

export default SuplierTable;
