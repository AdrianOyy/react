import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"
import { SearchBar } from '../../../../../components'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import API from "../../../../../api/user"
import dayjs from "dayjs"
import { CommonTable } from "../../../../../components"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}
const tableName = 'User Profile List'

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
        setTotal(response.data.data.count)
        handleData(response.data.data.rows)
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
    { id: 'alias', alignment: 'center', label: 'Alias' },
    { id: 'surname', alignment: 'center', label: 'Surname' },
    { id: 'givenname', alignment: 'center', label: 'Given Name' },
    { id: 'title', alignment: 'center', label: 'Title' },
    { id: 'displayname', alignment: 'center', label: 'Display Name' },
    { id: 'email', alignment: 'center', label: 'Email' },
    { id: 'createdAt', alignment: 'center', label: 'Created At' },
    { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    { id: 'action', alignment: 'right', label: 'Actions' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'alias', align: 'center' },
    { field: 'surname', align: 'center' },
    { field: 'givenname', align: 'center' },
    { field: 'title', align: 'center' },
    { field: 'displayname', align: 'center' },
    { field: 'email', align: 'center' },
    { field: 'createdAt', align: 'center' },
    { field: 'updatedAt', align: 'center' }
  ]

  const searchBarFieldList = [
    { id: 'surname', label: 'Surname', type: 'text', disabled: false, readOnly: false, value: surname },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
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
