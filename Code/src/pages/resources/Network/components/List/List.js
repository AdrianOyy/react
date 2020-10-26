import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { L } from '../../../../../utils/lang'
import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/inventory"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import formatDateTime from "../../../../../utils/formatDateTime"
const Paper = styled(MuiPaper)(spacing)

const tableName = L('List')


function List(props) {
  const { onMount, path } = props

  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({
    isNetwork: 'Y',
  })
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

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
        _ID: el._ID,
        UnitCode: el.UnitCode,
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
    { id: '_ID', alignment: 'center', label: L('Ref. ID') },
    { id: 'UnitCode', alignment: 'center', label: L('New') },
    { id: 'AssetID', alignment: 'center', label: L('Asset No') },
    { id: 'createdAt', alignment: 'center', label: L('Created At') },
    { id: 'updatedAt', alignment: 'center', label: L('Updated At') },
    { id: 'action', alignment: 'right', label: L('Actions') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: '_ID', align: 'center' },
    { field: 'UnitCode', align: 'center' },
    { field: 'AssetID', align: 'center' },
    { field: 'createdAt', align: 'center' },
    { field: 'updatedAt', align: 'center' }
  ]

  const searchBarFieldList = [
    { id: 'createdAt', label: L('Created At'), type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: L('Updated At'), type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      isNetwork: 'Y',
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
          <Paper>
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
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
