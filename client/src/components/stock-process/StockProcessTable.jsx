/* eslint-disable react/prop-types */
import { Table } from 'rsuite';
import { Cell, HeaderCell } from 'rsuite-table';
import Column from 'rsuite/esm/Table/TableColumn';
const StockProcessTable = ({ data }) => {
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
        <HeaderCell>Malzeme Adı</HeaderCell>
        <Cell>{(rowData) => <span>{rowData.malzeme.malzeme_adi}</span>}</Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>İşlem Tarihi</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{new Date(rowData.islem_tarihi).toLocaleString()}</span>
          )}
        </Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>İşlem Yapılan Stok Miktari</HeaderCell>
        <Cell dataKey="stok_miktari" />
      </Column>
      <Column width={240}>
        <HeaderCell>İşlem Türü</HeaderCell>
        <Cell>
          {(rowData) => (
            <>
              {rowData.islem_turu === 0 ? (
                <span className="text-green-700 py-1 px-2 font-semibold rounded-md bg-green-100 text-xs">
                  Giriş
                </span>
              ) : (
                <span className="text-white py-1 px-2 font-semibold rounded-md bg-red-700 text-xs">
                  Çıkış
                </span>
              )}
            </>
          )}
        </Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>Birim Türü</HeaderCell>
        <Cell>{(rowData) => <span>{rowData.birim.birim_turu}</span>}</Cell>
      </Column>
      <Column width={240}>
        <HeaderCell>Tedarikçi</HeaderCell>
        <Cell>
          {(rowData) => (
            <>
              {rowData.islem_turu === 0 ? (
                <span>{rowData.tedarikci.tedarikci_adi}</span>
              ) : (
                <span>-</span>
              )}
            </>
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
    </Table>
  );
};

export default StockProcessTable;
