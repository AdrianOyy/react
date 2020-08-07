import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { NaviHeader, SearchBar} from '../../../../components'
import EnhancedTable from './components/EnhancedTable'
import managementApi from "../../../../api/management"
import tenantApi from "../../../../api/tenant"
import adGroupApi from "../../../../api/adGroup"
import styled from "styled-components"
import {spacing} from "@material-ui/system"
const Paper = styled(MuiPaper)(spacing)
const breadcrumbsList = [{ title: 'AAA Service'}, { title: 'Management' }]
function ManagementList() {
  const [tenant, setTenant] = useState('')
  const [adGroup, setAdGroup] = useState('')
  const [supporter, setSupporter] = useState('')
  const [resourcesQuota, setResourcesQuota] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdateAt] = useState('')
  const [query, setQuery] = useState({})
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)
  const [tenantList, setTenantList] = useState([])
  const [adGroupList, setAdGroupList] = useState([])

  // 获取 tenantList 和 gourpList
  useEffect(() =>　{
    tenantApi.list({limit:999, page:1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })
    adGroupApi.list({limit:999, page: 1}).then(({data}) => {
      if (data && data.data) {
        const { rows } = data.data
        setAdGroupList(rows)
      }
    })
  }, [])

  useEffect(() => {
    managementApi.list({ ...query, limit: rowsPerPage, page: page+1 })
      .then(response => {
        setTotal(response.data.data.count)
        setRows(response.data.data.rows)
      })
  }, [page, rowsPerPage, query])

  const handelFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "tenant":
        setTenant(value)
        break
      case "adGroup":
        setAdGroup(value)
        break
      case "supporter":
        setSupporter(value)
        break
      case "resourcesQuota":
        setResourcesQuota(value)
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
  const handleSearch = () => {
    setQuery({
      tenantId: tenant,
      groupId: adGroup,
      supporter,
      resourcesQuota,
      createdAt,
      updatedAt,
    })
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const searchBarFieldList = [
    { id: 'tenant', label: 'Tenant', type: 'text', disabled: false, value: tenant, isSelector: true, itemList: tenantList, labelField: 'name', valueField: 'id' },
    { id: 'adGroup', label: 'AD Group', type: 'text', disabled: false, value: adGroup, isSelector: true, itemList: adGroupList, labelField: 'name', valueField: 'id' },
    { id: 'supporter', label: 'Supporter', type: 'text', disabled: false, value: supporter },
    { id: 'resourcesQuota', label: 'Resources Quota', type: 'text', disabled: false, value: resourcesQuota },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]
  useEffect(() => {
    searchBarFieldList[0].itemList = tenantList
    searchBarFieldList[1].itemList = adGroupList
  }, [tenantList, adGroupList, searchBarFieldList])
  return (
    <React.Fragment>
      <NaviHeader title="Management" breadcrumbsList={ breadcrumbsList } />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handelFieldChange}
            onSearchButton={handleSearch}
            fieldList = { searchBarFieldList }
          />
          <Paper>
            <EnhancedTable
              handleSearch={handleSearch}
              rows = {rows}
            />
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
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

export default ManagementList
