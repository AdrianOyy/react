import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/vm"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/VMFieldCheck"
import tenantApi from "../../../../../api/tenant"
import { L } from '../../../../../utils/lang'

function Update(props) {
  const { map } = props
  const { id } = useParams()
  const history = useHistory()
  const [ serialNumberError, setSerialNumberError ] = useState(false)
  const [ serialNumberHelperText, setSerialNumberHelperText ] = useState("")
  const [ assignedMemoryError, setAssignedMemoryError ] = useState(false)
  const [ assignedMemoryHelperText, setAssignedMemoryHelperText ] = useState("")
  const [ assignedCPUCoresError, setAssignedCPUCoresError ] = useState(false)
  const [ assignedCPUCoresHelperText, setAssignedCPUCoresHelperText ] = useState("")
  const [ CPUTypeError, setCPUTypeError ] = useState(false)
  const [ CPUTypeHelperText, setCPUTypeHelperText ] = useState("")
  const [ diskSizeError, setDiskSizeError ] = useState(false)
  const [ diskSizeHelperText, setDiskSizeHelperText ] = useState("")
  const [ VMClusterIdError, setVMClusterIdError ] = useState(false)
  const [ VMClusterIdHelperText, setVMClusterIdHelperText ] = useState("")
  const [ clusterList, setClusterList ] = useState([])
  const [ tenantError, setTenantError ] = useState(false)
  const [ tenantHelperText, setTenantHelperText ] = useState("")
  const [ tenantList, setTenantList ] = useState([])
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const serialNumberError = await serialNumberCheck()
    const assignedMemoryError = await assignedMemoryCheck()
    const assignedCPUCoresError = await assignedCPUCoresCheck()
    const vmClusterError = await VMClusterIdCheck()
    const CPUTypeError = await CPUTypeCheck()
    const diskSizeError = await diskSizeCheck()
    const tenantError = await tenantCheck()
    if (serialNumberError || assignedMemoryError || assignedCPUCoresError ||
      vmClusterError || CPUTypeError || diskSizeError || tenantError || saving) return
    let projectCode
    let projectContact
    let projectManager
    let VMClusterName
    for (const _ of tenantList) {
      if (_.id === map.get("tenantId")) {
        projectCode = _.code
        projectContact = _.contact_person
        projectManager = _.manager_group.name
      }
    }
    for (const _ of clusterList) {
      if (_.id === map.get("VMClusterId")) {
        VMClusterName = _.VMClusterName
      }
    }
    setSaving(true)
    API.update(id,
      {
        rid: map.get("rid"),
        dataPortIP: map.get("dataPortIP"),
        serialNumber: map.get("serialNumber"),
        model: map.get("model"),
        assignedMemory: map.get("assignedMemory"),
        assignedCPUCores: map.get("assignedCPUCores"),
        diskVolumeName: map.get("diskVolumeName"),
        CSVName: map.get("CSVName"),
        diskSize: map.get("diskSize"),
        hostname: map.get("hostname"),
        VMClusterId: map.get("VMClusterId"),
        VMClusterName,
        OS: map.get("OS"),
        serverRole: map.get("serverRole"),
        hostIP: map.get("hostIP"),
        ATLIP: map.get("ATLIP"),
        magementHost: map.get("magementHost"),
        extraIPs: map.get("extraIPs"),
        remarks: map.get("remarks"),
        tenantId: map.get("tenantId"),
        projectCode,
        projectContact,
        projectManager,
        section: map.get("section"),
        CPUType: map.get("CPUType"),
      }
    ).then(() => {
      CommonTip.success("Success")
      history.push({ pathname: '/resources/vm' })
    }).catch(() => {
      setSaving(false)
    })
  }

  useEffect(() => {
    tenantApi.list({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        return data.data.rows
      } else {
        return []
      }
    }).then(returnObj => {
      API.listCluster({ limit: 999, page: 1 }).then(({ data }) => {
        if (data && data.data) {
          return {
            tenantList: returnObj,
            clusterList: data.data.rows,
          }
        } else {
          return {
            tenantList: returnObj,
            clusterList: [],
          }
        }
      }).then(returnObj => {
        API.detail(id)
          .then(({ data }) => {
            const {
              rid,
              dataPortIP,
              serialNumber,
              model,
              assignedMemory,
              assignedCPUCores,
              CPUType,
              diskVolumeName,
              CSVName,
              diskSize,
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
            setSaving(false)
            setTenantList(returnObj.tenantList)
            setClusterList(returnObj.clusterList)
            const list = [
              {
                id: 'rid', label: L('RID'), type: 'text',
                required: false, readOnly: false, value: rid,
              },
              {
                id: 'serialNumber', label: L('SerialNumber'), type: 'text',
                required: true, readOnly: false, value: serialNumber,
                error: serialNumberError, helperText: serialNumberHelperText
              },
              {
                id: 'model', label: L('Model'), type: 'text',
                required: false, readOnly: false, value: model,
              },
              {
                id: 'assignedMemory', label: L('Assigned Memory(GB)'), type: 'text',
                required: true, readOnly: false, value: assignedMemory,
                error: assignedMemoryError, helperText: assignedMemoryHelperText
              },
              {
                id: 'assignedCPUCores', label: L('Assigned CPU Cores'), type: 'text',
                required: true, readOnly: false, value: assignedCPUCores,
                error: assignedCPUCoresError, helperText: assignedCPUCoresHelperText
              },
              {
                id: 'CPUType', label: L('CPU Type'), type: 'text',
                required: true, readOnly: false, value: CPUType,
                error: CPUTypeError, helperText: CPUTypeHelperText,
              },
              {
                id: 'diskVolumeName', label: L('Disk Volume Name'), type: 'text',
                required: false, readOnly: false, value: diskVolumeName,
              },
              {
                id: 'CSVName', label: L('CSV Name'), type: 'text',
                required: false, readOnly: false, value: CSVName,
              },
              {
                id: 'diskSize', label: L('Disk Size'), type: 'text',
                required: true, readOnly: false, value: diskSize,
                error: diskSizeError, helperText: diskSizeHelperText
              },
              {
                id: 'hostname', label: L('Hostname'), type: 'text',
                required: false, readOnly: false, value: hostname,
              },
              {
                id: 'VMClusterId', label: L('VM Cluster'), type: 'select',
                value: VMClusterId, itemList: returnObj.clusterList,
                labelField: 'VMClusterName', valueField: 'id',
                error: VMClusterIdError, helperText: VMClusterIdHelperText,
              },
              {
                id: 'OS', label: L('OS'), type: 'text',
                required: false, readOnly: false, value: OS,
              },
              {
                id: 'serverRole', label: L('Server Role'), type: 'text',
                required: false, readOnly: false, value: serverRole,
              },
              {
                id: 'hostIP', label: L('Host IP'), type: 'text',
                required: false, readOnly: false, value: hostIP,
              },
              {
                id: 'ATLIP', label: L('ATL IP'), type: 'text',
                required: false, readOnly: false, value: ATLIP,
              },
              {
                id: 'dataPortIP', label: L('Data port IP'), type: 'text',
                required: false, readOnly: false, value: dataPortIP,
              },
              {
                id: 'magementHost', label: L('Magement Host'), type: 'text',
                required: false, readOnly: false, value: magementHost,
              },
              {
                id: 'extraIPs', label: L('Extra IPs'), type: 'text',
                required: false, readOnly: false, value: extraIPs,
              },
              {
                id: 'remarks', label: L('Remarks'), type: 'text',
                required: false, readOnly: false, value: remarks,
              },
              {
                id: 'tenantId', label: L('Tenant'), type: 'select',
                value: tenantId, itemList: returnObj.tenantList,
                labelField: 'name', valueField: 'id',
                error: tenantError, helperText: tenantHelperText,
              },
              {
                id: 'section', label: L('Section'), type: 'text',
                required: false, readOnly: false, value: section,
              },
              {
                id: 'createdAt', label: L('Created At'), type: 'text',
                disabled: true, readOnly: true, value: formatDateTime(createdAt)
              },
              {
                id: 'updatedAt', label: L('Updated At'), type: 'text',
                disabled: true, readOnly: true, value: formatDateTime(updatedAt)
              },
            ]
            list.forEach(_ => {
              map.set(_.id, _.value)
            })
            setFormFieldList(list)
          })
      })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const errors = {
      serialNumber: {
        error: serialNumberError,
        helperText: serialNumberHelperText,
      },
      assignedMemory: {
        error: assignedMemoryError,
        helperText: assignedMemoryHelperText,
      },
      assignedCPUCores: {
        error: assignedCPUCoresError,
        helperText: assignedCPUCoresHelperText,
      },
      CPUType: {
        error: CPUTypeError,
        helperText: CPUTypeHelperText,
      },
      diskSize: {
        error: diskSizeError,
        helperText: diskSizeHelperText,
      },
      VMClusterId: {
        error: VMClusterIdError,
        helperText: VMClusterIdHelperText,
      },
      tenantId: {
        error: tenantError,
        helperText: tenantHelperText,
      },
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [
    serialNumberHelperText,
    assignedMemoryHelperText,
    assignedCPUCoresHelperText,
    CPUTypeHelperText,
    diskSizeHelperText,
    VMClusterIdHelperText,
    tenantHelperText,
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    map.set(id, value)
  }

  const serialNumberCheck = async () => {
    const emptyCheck = checkEmpty("serialNumber", map.get("serialNumber"))
    setSerialNumberError(emptyCheck.error)
    setSerialNumberHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(id, map.get("serialNumber"))
      setSerialNumberError(error)
      setSerialNumberHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const assignedMemoryCheck = async () => {
    const emptyCheck = checkEmpty("assignedMemory", map.get("assignedMemory"))
    setAssignedMemoryError(emptyCheck.error)
    setAssignedMemoryHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^(0|\d+)(\.\d+)?$/
      if (!reg.test(map.get("assignedMemory"))) {
        setAssignedMemoryError(true)
        setAssignedMemoryHelperText(L('Only accept positive float'))
        return true
      }
    }
    return emptyCheck.error
  }

  const assignedCPUCoresCheck = async () => {
    const emptyCheck = checkEmpty("assignedCPUCores", map.get("assignedCPUCores"))
    setAssignedCPUCoresError(emptyCheck.error)
    setAssignedCPUCoresHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("assignedCPUCores"))) {
        setAssignedCPUCoresError(true)
        setAssignedCPUCoresHelperText(L('Only accept positive integer'))
        return true
      }
    }
    return emptyCheck.error
  }

  const CPUTypeCheck = async () => {
    const emptyCheck = checkEmpty("CPUType", map.get("CPUType"))
    setCPUTypeError(emptyCheck.error)
    setCPUTypeHelperText(emptyCheck.msg)
    return CPUTypeCheck.error
  }

  const diskSizeCheck = async () => {
    const emptyCheck = checkEmpty("diskSize", map.get("diskSize"))
    setDiskSizeError(emptyCheck.error)
    setDiskSizeHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("diskSize"))) {
        setDiskSizeError(true)
        setDiskSizeHelperText(L('Only accept positive integer'))
        return true
      }
    }
    return emptyCheck.error
  }

  const VMClusterIdCheck = async () => {
    const emptyCheck = checkEmpty("VMClusterId", map.get("VMClusterId"))
    setVMClusterIdError(emptyCheck.error)
    setVMClusterIdHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  const tenantCheck = async () => {
    const emptyCheck = checkEmpty("tenantId", map.get("tenantId"))
    setTenantError(emptyCheck.error)
    setTenantHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
        showRequiredField={true}
      />
    </React.Fragment>
  )
}

export default Update
