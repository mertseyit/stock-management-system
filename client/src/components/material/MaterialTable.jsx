/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Button, Table } from 'rsuite';
import { Cell, HeaderCell } from 'rsuite-table';
import Column from 'rsuite/esm/Table/TableColumn';
import { DataContext } from '../../contexts/DataContext';
const MaterialTable = ({ data }) => {
  const { deleteMaterial } = useContext(DataContext);
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
        <HeaderCell>Malzeme Adı</HeaderCell>
        <Cell dataKey="malzeme_adi" />
      </Column>
      <Column width={300}>
        <HeaderCell>Stok Seviyesi</HeaderCell>
        <Cell>
          {(rowData) => (
            <>
              {rowData.stok_seviyesi <= rowData.kritik_stok_seviyesi ? (
                <span className="text-white py-1 px-2 font-semibold rounded-md bg-red-700 text-xs">
                  Kritik Stok Seviyesi: {rowData.stok_seviyesi}
                </span>
              ) : (
                <span className="text-green-700 py-1 px-2 font-semibold rounded-md bg-green-100 text-xs">
                  {rowData.stok_seviyesi}
                </span>
              )}
            </>
          )}
        </Cell>
      </Column>
      <Column width={300}>
        <HeaderCell>Kritik Stok Seviyesi</HeaderCell>
        <Cell dataKey="kritik_stok_seviyesi" />
      </Column>
      <Column width={300}>
        <HeaderCell>Malzeme Türü</HeaderCell>
        <Cell>{(rowData) => <span>{rowData.birim.birim_turu}</span>}</Cell>
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
        <Cell>
          {(rowData) => (
            <Button onClick={() => deleteMaterial(rowData.id)}>
              <RiDeleteBin5Fill />
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
};

export default MaterialTable;
