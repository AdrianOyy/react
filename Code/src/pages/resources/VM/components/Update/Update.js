import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/vm"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/VMFieldCheck"
import tenantApi from "../../../../../api/tenant"

function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ serialNumber, setSerialNumber ] = useState('')
  const [ serialNumberError, setSerialNumberError ] = useState(false)
  const [ serialNumberHelperText, setSerialNumberHelperText ] = useState("")
  const [ model, setModel ] = useState('')
  const [ assignedMemory, setAssignedMemory ] = useState('')
  const [ assignedMemoryError, setAssignedMemoryError ] = useState(false)
  const [ assignedMemoryHelperText, setAssignedMemoryHelperText ] = useState("")
  const [ assignedCPUCores, setAssignedCPUCores ] = useState('')
  const [ assignedCPUCoresError, setAssignedCPUCoresError ] = useState(false)
  const [ assignedCPUCoresHelperText, setAssignedCPUCoresHelperText ] = useState("")
  const [ diskVolumeName, setDiskVolumeName ] = useState('')
  const [ CSVName, setCSVName ] = useState('')
  const [ diskSize, setDiskSize ] = useState('')
  const [ diskSizeError, setDiskSizeError ] = useState(false)
  const [ diskSizeHelperText, setDiskSizeHelperText ] = useState("")
  const [ status, setStatus ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ VMClusterId, setVMClusterId ] = React.useState('')
  const [ VMClusterIdError, setVMClusterIdError ] = useState(false)
  const [ VMClusterIdHelperText, setVMClusterIdHelperText ] = useState("")
  const [ clusterList, setClusterList ] = useState([])
  const [ clusterInit, setClusterInit ] = useState(false)
  const [ OS, setOS ] = useState('')
  const [ serverRole, setServerRole ] = useState('')
  const [ hostIP, setHostIP ] = useState('')
  const [ ATLIP, setATLIP ] = useState('')
  const [ magementHost, setMagementHost ] = useState('')
  const [ extraIPs, setExtraIPs ] = useState('')
  const [ remarks, setRemarks ] = useState('')
  const [ tenantId, setTenantId ] = React.useState('')
  const [ tenantError, setTenantError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState("")
  const [ tenantList, setTenantList ] = useState([])
  const [ tenantInit, setTenantInit ] = useState(false)
  const [ section, setSection ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const serialNumberError = await serialNumberCheck()
    const assignedMemoryError = await assignedMemoryCheck()
    const assignedCPUCoresError = await assignedCPUCoresCheck()
    const diskSizeError = await diskSizeCheck()
    const tenantError = await tenantCheck()
    if (serialNumberError || assignedMemoryError || assignedCPUCoresError ||
      diskSizeError || tenantError || saving) return
    let projectCode
    let projectContact
    let projectManager
    let VMClusterName
    for (const _ of tenantList) {
      if (_.id === tenantId) {
        projectCode = _.code
        projectContact = _.contact_person
        projectManager = _.manager_group.name
      }
    }
    for (const _ of clusterList) {
      if (_.id === VMClusterId) {
        VMClusterName = _.VMClusterName
      }
    }
    setSaving(true)
    API.update(id,
      {
        serialNumber,
        model,
        assignedMemory,
        assignedCPUCores,
        diskVolumeName,
        CSVName,
        diskSize,
        status,
        hostname,
        VMClusterId,
        VMClusterName,
        OS,
        serverRole,
        hostIP,
        ATLIP,
        magementHost,
        extraIPs,
        remarks,
        tenantId,
        projectCode,
        projectContact,
        projectManager,
        section
      }
    )
    .then(() => {
      CommonTip.success("Success")
      history.push({ pathname: '/resources/vm' })
    })
    .catch(() => {
      setSaving(false)
    })
  }

  // 获取 tenantList 和 clusterList
  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        console.log(rows)
        setTenantList(rows)
      }
    })

    API.listCluster({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        const { rows } = data.data
        console.log(rows)
        setClusterList(rows)
      }
    })
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      const {
        serialNumber,
        model,
        assignedMemory,
        assignedCPUCores,
        diskVolumeName,
        CSVName,
        diskSize,
        status,
        hostname,
        VMClusterId,
        OS,
        serverRole,
        hostIP,
        ATLIP,
        magementHost,
        extraIPs,
        remarks,
        tenantId,
        section,
        createdAt,
        updatedAt
      } = data.data
      setSerialNumber(serialNumber)
      setModel(model)
      setAssignedMemory(assignedMemory)
      setAssignedCPUCores(assignedCPUCores)
      setDiskVolumeName(diskVolumeName)
      setCSVName(CSVName)
      setDiskSize(diskSize)
      setStatus(status)
      setHostname(hostname)
      setVMClusterId(VMClusterId)
      setOS(OS)
      setServerRole(serverRole)
      setHostIP(hostIP)
      setATLIP(ATLIP)
      setMagementHost(magementHost)
      setExtraIPs(extraIPs)
      setRemarks(remarks)
      setSection(section)
      setTenantId(tenantId)
      setCreatedAt(createdAt)
      setUpdastedAt(updatedAt)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      {
        id: 'serialNumber', label: 'SerialNumber', type: 'text',
        required: true, readOnly: false, value: serialNumber,
        error: serialNumberError, helperText: serialNumberHelperText
      },
      {
        id: 'model', label: 'Model', type: 'text',
        required: false, readOnly: false, value: model,
      },
      {
        id: 'assignedMemory', label: 'Assigned Memory(GB)', type: 'text',
        required: true, readOnly: false, value: assignedMemory,
        error: assignedMemoryError, helperText: assignedMemoryHelperText
      },
      {
        id: 'assignedCPUCores', label: 'Assigned CPU Cores', type: 'text',
        required: true, readOnly: false, value: assignedCPUCores,
        error: assignedCPUCoresError, helperText: assignedCPUCoresHelperText
      },
      {
        id: 'diskVolumeName', label: 'Disk Volume Name', type: 'text',
        required: false, readOnly: false, value: diskVolumeName,
      },
      {
        id: 'CSVName', label: 'CSV Name', type: 'text',
        required: false, readOnly: false, value: CSVName,
      },
      {
        id: 'diskSize', label: 'Disk Size', type: 'text',
        required: true, readOnly: false, value: diskSize,
        error: diskSizeError, helperText: diskSizeHelperText
      },
      {
        id: 'status', label: 'Status', type: 'text',
        required: false, readOnly: false, value: status,
      },
      {
        id: 'hostname', label: 'Hostname', type: 'text',
        required: false, readOnly: false, value: hostname,
      },
      {
        id: 'VMClusterId', label: 'VM Cluster', type: 'select',
        value: VMClusterId, itemList: clusterList,
        labelField: 'VMClusterName', valueField: 'id',
        error: VMClusterIdError, helperText: VMClusterIdHelperText,
      },
      {
        id: 'OS', label: 'OS', type: 'text',
        required: false, readOnly: false, value: OS,
      },
      {
        id: 'serverRole', label: 'Server Role', type: 'text',
        required: false, readOnly: false, value: serverRole,
      },
      {
        id: 'hostIP', label: 'Host IP', type: 'text',
        required: false, readOnly: false, value: hostIP,
      },
      {
        id: 'ATLIP', label: 'ATL IP', type: 'text',
        required: false, readOnly: false, value: ATLIP,
      },
      {
        id: 'magementHost', label: 'Magement Host', type: 'text',
        required: false, readOnly: false, value: magementHost,
      },
      {
        id: 'extraIPs', label: 'Extra IPs', type: 'text',
        required: false, readOnly: false, value: extraIPs,
      },
      {
        id: 'remarks', label: 'Remarks', type: 'text',
        required: false, readOnly: false, value: remarks,
      },
      {
        id: 'tenant', label: 'Tenant', type: 'select',
        value: tenantId, itemList: tenantList,
        labelField: 'name', valueField: 'id',
        error: tenantError, helperText: tenantHelperText,
      },
      {
        id: 'createdAt', label: 'Created At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(createdAt)
      },
      {
        id: 'updatedAt', label: 'Updated At', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(updatedAt)
      },
    ]
    setFormFieldList(list)
  }, [
    serialNumber, serialNumberError, serialNumberHelperText,
    model,
    assignedMemory, assignedMemoryError, assignedMemoryHelperText,
    assignedCPUCores, assignedCPUCoresError, assignedCPUCoresHelperText,
    diskVolumeName,
    CSVName,
    diskSize, diskSizeError, diskSizeHelperText,
    status,
    hostname,
    VMClusterId, VMClusterIdError, VMClusterIdHelperText,
    clusterList,
    OS,
    serverRole,
    hostIP,
    ATLIP,
    magementHost,
    extraIPs,
    remarks,
    tenantId, tenantError, tenantHelperText,
    tenantList,
    section,
    createdAt, updatedAt
  ])
  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'serialNumber':
        setSerialNumber(value)
        break
      case 'model':
        setModel(value)
        break
      case 'assignedMemory':
        setAssignedMemory(value)
        break
      case 'assignedCPUCores':
        setAssignedCPUCores(value)
        break
      case 'diskVolumeName':
        setDiskVolumeName(value)
        break
      case 'CSVName':
        setCSVName(value)
        break
      case 'diskSize':
        setDiskSize(value)
        break
      case 'status':
        setStatus(value)
        break
      case 'hostname':
        setHostname(value)
        break
      case 'VMClusterId':
        setVMClusterId(value)
        break
      case 'OS':
        setOS(value)
        break
      case 'serverRole':
        setServerRole(value)
        break
      case 'hostIP':
        setHostIP(value)
        break
      case 'ATLIP':
        setATLIP(value)
        break
      case 'magementHost':
        setMagementHost(value)
        break
      case 'extraIPs':
        setExtraIPs(value)
        break
      case 'remarks':
        setRemarks(value)
        break
      case 'tenant':
        setTenantId(value)
        break
      case 'section':
        setSection(value)
        break
      default:
        break
    }
  }
  const serialNumberCheck = async () => {
    const emptyCheck = checkEmpty("serialNumber", serialNumber)
    setSerialNumberError(emptyCheck.error)
    setSerialNumberHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, serialNumber)
      setSerialNumberError(error)
      setSerialNumberHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const assignedMemoryCheck = async () => {
    const emptyCheck = checkEmpty("assignedMemory", assignedMemory)
    setAssignedMemoryError(emptyCheck.error)
    setAssignedMemoryHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const assignedCPUCoresCheck = async () => {
    const emptyCheck = checkEmpty("assignedCPUCores", assignedCPUCores)
    setAssignedCPUCoresError(emptyCheck.error)
    setAssignedCPUCoresHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const diskSizeCheck = async () => {
    const emptyCheck = checkEmpty("diskSize", diskSize)
    setDiskSizeError(emptyCheck.error)
    setDiskSizeHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const VMClusterIdCheck = async () => {
    const emptyCheck = checkEmpty("VMClusterId", VMClusterId)
    setVMClusterIdError(emptyCheck.error)
    setVMClusterIdHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("tenant", tenantId)
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "serialNumber":
        serialNumberCheck()
        break
      case "assignedMemory":
        assignedMemoryCheck()
        break
      case "assignedCPUCores":
        assignedCPUCoresCheck()
        break
      case "diskSize":
        diskSizeCheck()
        break
      case "tenant":
        tenantCheck()
        break
      default:
        break
    }
  }

  // 字段 VMClusterId 检查
  useEffect(() => {
    if (clusterInit) {
      VMClusterIdCheck()
    } else {
      setClusterInit(true)
    }
    // eslint-disable-next-line
  }, [VMClusterId])

  // 字段 tenant 检查
  useEffect(() => {
    if (tenantInit) {
      tenantCheck()
    } else {
      setTenantInit(true)
    }
    // eslint-disable-next-line
  }, [tenantId])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'VM Update'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Detail