import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/expiry"
import tenantApi from "../../../../../api/tenant"
import adGroupApi from "../../../../../api/adGroup"
import roleApi from "../../../../../api/role"
import userApi from "../../../../../api/user"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}

const tableName = 'Assign List'

function List(props) {
  const { onMount, path } = props

  const [ tenant, setTenant ] = useState('')
  const [ adGroup, setAdGroup ] = useState('')
  const [ role, setRole ] = useState('')
  const [ user, setUser ] = useState('')
  const [ expiryDate, setExpiryDate ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ tenantList, setTenantList ] = useState([])
  const [ adGroupList, setAdGroupList ] = useState([])
  const [ roleList, setRoleList ] = useState([])
  const [ userList, setUserList ] = useState([])

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  // 获取 tenantList、 groupList、roleList 和 userList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setTenantList(rows)
      }
    })

    adGroupApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setAdGroupList(rows)
      }
    })

    roleApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setRoleList(rows)
      }
    })

    userApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        setUserList(rows)
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
        tenant: el.assign && el.assign.tenant_group_mapping && el.assign.tenant_group_mapping.tenant ? el.assign.tenant_group_mapping.tenant.name : '',
        ad_group: el.assign && el.assign.tenant_group_mapping && el.assign.tenant_group_mapping.ad_group ? el.assign.tenant_group_mapping.ad_group.name : '',
        role: el.assign && el.assign.role ? el.assign.role.label : '',
        user: el.user ? el.user.displayName : '',
        expiryDate: el.expiryDate ? formatDateTime(el.expiryDate) : '',
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
    { id: 'group', alignment: 'center', label: 'AD Group' },
    { id: 'role', alignment: 'center', label: 'Role' },
    { id: 'user', alignment: 'center', label: 'User' },
    { id: 'expiryDate', alignment: 'center', label: 'Expiry Date' },
    { id: 'createdAt', alignment: 'center', label: 'Created At' },
    { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    { id: 'action', alignment: 'right', label: 'Actions' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'tenant', align: 'center' },
    { field: 'ad_group', align: 'center' },
    { field: 'role', align: 'center' },
    { field: 'user', align: 'center' },
    { field: 'expiryDate', align: 'center' },
    { field: 'createdAt', align: 'center' },
    { field: 'updatedAt', align: 'center' }
  ]

  const searchBarFieldList = [
    {
      id: 'tenant', label: 'Tenant', type: 'text', disabled: false,
      value: tenant, isSelector: true, itemList: tenantList,
      labelField: 'name', valueField: 'id'
    },
    {
      id: 'adGroup', label: 'AD Group', type: 'text', disabled: false,
      value: adGroup, isSelector: true, itemList: adGroupList,
      labelField: 'name', valueField: 'id'
    },
    {
      id: 'role', label: 'Role', type: 'text', disabled: false,
      value: role, isSelector: true, itemList: roleList,
      labelField: 'label', valueField: 'id'
    },
    {
      id: 'user', label: 'User', type: 'text', disabled: false,
      value: user, isSelector: true, itemList: userList,
      labelField: 'displayname', valueField: 'id'
    },
    { id: 'expiryDate', label: 'Expiry Date', type: 'date', disabled: false, readOnly: false, value: expiryDate },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setTenant('')
    setAdGroup('')
    setRole('')
    setUser('')
    setExpiryDate('')
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      tenantId: '',
      groupId: '',
      roleId: '',
      userId: '',
      expiryDate: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      tenantId: tenant,
      groupId: adGroup,
      roleId: role,
      userId: user,
      expiryDate,
      createdAt,
      updatedAt,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "tenant":
        setTenant(value)
        break
      case "adGroup":
        setAdGroup(value)
        break
      case "role":
        setRole(value)
        break
      case "user":
        setUser(value)
        break
      case "expiryDate":
        setExpiryDate(value)
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