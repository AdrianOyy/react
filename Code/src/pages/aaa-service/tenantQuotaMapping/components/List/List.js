import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/tenantQuotaMapping"
import tenantApi from "../../../../../api/tenant"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"
// import typeList from "../../untils/typeList"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
}

const tableName = 'Tenant Quota Mapping List'

function List(props) {
  const { onMount, path } = props

  const [ tenantId, setTenantId ] = useState('')
  const [ type, setType ] = useState('')
  const [ year, setYear ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ tenantList, setTenantList ] = useState([])


  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  // 获取 tenantList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })
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
        tenant: el.tenant ? el.tenant.name : '',
        type: el.type,
        quota: el.quota,
        year: el.year,
        createdAt: formatDateTime(el.createdAt),
        updatedAt: formatDateTime(el.updatedAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'tenant', alignment: 'center', label: 'Tenant' },
    { id: 'type', alignment: 'center', label: 'Type' },
    { id: 'quota', alignment: 'center', label: 'Quota' },
    { id: 'year', alignment: 'center', label: 'Year' },
    { id: 'createdAt', alignment: 'center', label: 'Created At' },
    { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    { id: 'action', alignment: 'right', label: 'Actions' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'tenant', align: 'center' },
    { field: 'type', align: 'center' },
    { field: 'quota', align: 'center' },
    { field: 'year', align: 'center' },
    { field: 'createdAt', align: 'center' },
    { field: 'updatedAt', align: 'center' }
  ]

  const searchBarFieldList = [
    { id: 'tenant', label: 'Tenant', type: 'text', disabled: false, value: tenantId, isSelector: true, itemList: tenantList, labelField: 'name', valueField: 'id' },
    { id: 'type', label: 'Type', type: 'text', disabled: false, value: type },
    { id: 'year', label: 'Year', type: 'date', disabled: false, value: year, views: [ 'year' ] },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setTenantId('')
    setType('')
    setYear('')
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      tenantId: '',
      type: '',
      year: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      tenantId,
      type,
      year,
      createdAt,
      updatedAt,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "tenant":
        setTenantId(value)
        break
      case "type":
        setType(value)
        break
      case "year":
        setYear(value)
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
