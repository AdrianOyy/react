import React, { useEffect, useState } from 'react'

import {
  Grid
} from "@material-ui/core"

import { L } from '../../../../../utils/lang'
import { CommonTable, SearchBar, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/inventoryLifeCycle"
import formatDateTime from "../../../../../utils/formatDateTime"

const tableName = L('List')


function List(props) {
  const { path } = props

  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    API.list({ ...query, limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.data.count)
        handleData(response.data.data.rows)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        oldID: el.oldID,
        InventoryID: el.InventoryID,
        AssetID: el.AssetID,
        createdAt: formatDateTime(el.createdAt),
        updatedAt: formatDateTime(el.updatedAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: '_ID', alignment: 'left', label: L('Ref. ID') },
    { id: 'InventoryID', alignment: 'left', label: L('Inventory ID') },
    { id: 'AssetID', alignment: 'left', label: L('Asset No') },
    { id: 'createdAt', alignment: 'left', label: L('Created At') },
    { id: 'updatedAt', alignment: 'left', label: L('Updated At') },
    { id: 'action', alignment: 'left', label: L('Actions') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'oldID', align: 'left' },
    { field: 'InventoryID', align: 'left' },
    { field: 'AssetID', align: 'left' },
    { field: 'createdAt', align: 'left' },
    { field: 'updatedAt', align: 'left' }
  ]

  const searchBarFieldList = [
    { id: 'createdAt', label: L('Created At'), type: 'dateRange', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: L('Updated At'), type: 'dateRange', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      createdAt,
      updatedAt,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "createdAt":
        setCreatedAt(value)
        break
      case "updatedAt":
        setUpdateAt(value)
        break
      default:
        break
    }
  }


  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handleFieldChange}
            onSearchButton={handleSearch}
            onClearButton={handleClear}
            fieldList = {searchBarFieldList}
          />
          <HAPaper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
            />
            <TablePagination
              rowsPerPageOptions={[ 10, 50, 100 ]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </HAPaper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
