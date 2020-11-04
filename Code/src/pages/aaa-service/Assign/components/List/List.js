import React, { useEffect, useState } from 'react'

import {
  Grid
} from "@material-ui/core"
import { CommonTable, SearchBar, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/assign"
import tenantApi from "../../../../../api/tenant"
import adGroupApi from "../../../../../api/adGroup"
import { L } from '../../../../../utils/lang'
import roleApi from "../../../../../api/role"
import formatDateTime from "../../../../../utils/formatDateTime"


const tableName = L('List')


function AssignList(props) {
  const {  path } = props

  const [ tenant, setTenant ] = useState('')
  const [ adGroup, setAdGroup ] = useState('')
  const [ role, setRole ] = useState('')
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


  // 获取 tenantList、 groupList 和 roleList
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
        tenant: el.tenant_group_mapping && el.tenant_group_mapping.tenant ? el.tenant_group_mapping.tenant.name : '',
        ad_group: el.tenant_group_mapping && el.tenant_group_mapping.ad_group ? el.tenant_group_mapping.ad_group.name : '',
        role: el.role ? el.role.label : '',
        createdAt: formatDateTime(el.createdAt),
        updatedAt: formatDateTime(el.updatedAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'tenant', alignment: 'left', label: L('Tenant') },
    { id: 'group', alignment: 'left', label: L('AD Group') },
    { id: 'role', alignment: 'left', label: L('Role') },
    { id: 'createdAt', alignment: 'left', label: L('Created At') },
    { id: 'updatedAt', alignment: 'left', label: L('Updated At') },
    { id: 'action', alignment: 'center', label: L('Actions') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'tenant', align: 'left' },
    { field: 'ad_group', align: 'left' },
    { field: 'role', align: 'left' },
    { field: 'createdAt', align: 'left' },
    { field: 'updatedAt', align: 'left' }
  ]

  const searchBarFieldList = [
    {
      id: 'tenant', label: L('Tenant'), type: 'text', disabled: false,
      value: tenant, isSelector: true, itemList: tenantList,
      labelField: 'name', valueField: 'id'
    },
    {
      id: 'adGroup', label: L('AD Group'), type: 'text', disabled: false,
      value: adGroup, isSelector: true, itemList: adGroupList,
      labelField: 'name', valueField: 'id'
    },
    {
      id: 'role', label: L('Role'), type: 'text', disabled: false,
      value: role, isSelector: true, itemList: roleList,
      labelField: 'label', valueField: 'id'
    },
    { id: 'createdAt', label: L('Created At'), type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: L('Updated At'), type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setTenant('')
    setAdGroup('')
    setRole('')
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      tenantId: '',
      groupId: '',
      roleId: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      tenantId: tenant,
      groupId: adGroup,
      roleId: role,
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

export default AssignList
