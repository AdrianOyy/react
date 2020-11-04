import React, { useEffect, useState } from 'react'

import {
  Grid,
  Paper as MuiPaper,
} from "@material-ui/core"
import { SearchBar, TablePagination } from '../../../../../components'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import API from "../../../../../api/user"
import formatDateTime from "../../../../../utils/formatDateTime"
import { CommonTable } from "../../../../../components"
import { L } from '../../../../../utils/lang'
const Paper = styled(MuiPaper)(spacing)
const tableName = L('List')


function List(props) {
  const { onMount, path } = props

  const [ surname, setSurname ] = React.useState('')
  const [ createdAt, setCreatedAt ] = React.useState('')
  const [ updatedAt, setUpdateAt ] = React.useState('')
  const [ query, setQuery ] = React.useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = React.useState(0)
  const [ rowsPerPage, setRowsPerPage ] = React.useState(10)
  const [ total, setTotal ] = React.useState(0)

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.list({ ...query, limit: rowsPerPage, page: page + 1 })
      .then(response => {
        if (response.data && response.data.data) {
          setTotal(response.data.data.count)
          handleData(response.data.data.rows)
        }
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        alias: el.alias,
        surname: el.surname,
        givenname: el.givenname,
        title: el.title,
        displayname: el.displayname,
        email: el.email,
        createdAt: formatDateTime(el.createdAt),
        updatedAt: formatDateTime(el.updatedAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'alias', alignment: 'left', label: L('Alias') },
    { id: 'surname', alignment: 'left', label: L('Surname') },
    { id: 'givenname', alignment: 'left', label: L('Given Name') },
    { id: 'title', alignment: 'left', label: L('Title') },
    { id: 'displayname', alignment: 'left', label: L('Display Name') },
    { id: 'email', alignment: 'left', label: L('Email') },
    { id: 'createdAt', alignment: 'left', label: L('Created At') },
    { id: 'updatedAt', alignment: 'left', label: L('Updated At') },
    { id: 'action', alignment: 'center', label: L('Actions') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'alias', align: 'left' },
    { field: 'surname', align: 'left' },
    { field: 'givenname', align: 'left' },
    { field: 'title', align: 'left' },
    { field: 'displayname', align: 'left' },
    { field: 'email', align: 'left' },
    { field: 'createdAt', align: 'left' },
    { field: 'updatedAt', align: 'left' }
  ]

  const searchBarFieldList = [
    { id: 'surname', label: L('Surname'), type: 'text', disabled: false, readOnly: false, value: surname },
    { id: 'createdAt', label: L('Created At'), type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: L('Updated At'), type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setSurname('')
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      surname: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      surname,
      createdAt,
      updatedAt,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "surname":
        setSurname(value)
        break
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
              hideUpdate={true}
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              hideCreate={true}
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
