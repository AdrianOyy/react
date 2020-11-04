import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/vm"
import { useParams } from "react-router-dom"
import formatDateTime from "../../../../../utils/formatDateTime"
import { L } from '../../../../../utils/lang'

function Detail() {
  const { id } = useParams()
  const [ rid, setRid ] = useState('')
  const [ dataPortIP, setDataPortIP ] = useState('')
  const [ serialNumber, setSerialNumber ] = useState('')
  const [ model, setModel ] = useState('')
  const [ assignedMemory, setAssignedMemory ] = useState('')
  const [ assignedCPUCores, setAssignedCPUCores ] = useState('')
  const [ CPUType, setCPUType ] = useState('')
  const [ diskVolumeName, setDiskVolumeName ] = useState('')
  const [ CSVName, setCSVName ] = useState('')
  const [ diskSize, setDiskSize ] = useState('')
  const [ status, setStatus ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ VMClusterName, setVMClusterName ] = React.useState('')
  const [ OS, setOS ] = useState('')
  const [ serverRole, setServerRole ] = useState('')
  const [ hostIP, setHostIP ] = useState('')
  const [ ATLIP, setATLIP ] = useState('')
  const [ magementHost, setMagementHost ] = useState('')
  const [ extraIPs, setExtraIPs ] = useState('')
  const [ remarks, setRemarks ] = useState('')
  const [ projectCode, setProjectCode ] = React.useState('')
  const [ projectContact, setProjectContact ] = React.useState('')
  const [ projectManager, setProjectManager ] = React.useState('')
  const [ section, setSection ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
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
            status,
            hostname,
            VMClusterName,
            OS,
            serverRole,
            hostIP,
            ATLIP,
            magementHost,
            extraIPs,
            remarks,
            projectCode,
            projectContact,
            projectManager,
            section,
            createdAt,
            updatedAt
          } = data.data
          setSerialNumber(serialNumber)
          setModel(model)
          setAssignedMemory(assignedMemory)
          setAssignedCPUCores(assignedCPUCores)
          setCPUType(CPUType)
          setDiskVolumeName(diskVolumeName)
          setCSVName(CSVName)
          setDiskSize(diskSize)
          setStatus(status)
          setHostname(hostname)
          setVMClusterName(VMClusterName)
          setOS(OS)
          setServerRole(serverRole)
          setHostIP(hostIP)
          setATLIP(ATLIP)
          setMagementHost(magementHost)
          setExtraIPs(extraIPs)
          setRemarks(remarks)
          setProjectCode(projectCode)
          setProjectContact(projectContact)
          setProjectManager(projectManager)
          setSection(section)
          setCreatedAt(createdAt)
          setUpdastedAt(updatedAt)
          setRid(rid)
          setDataPortIP(dataPortIP)
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      {
        id: 'rid', label: L('RID'), type: 'text',
        disabled: true, readOnly: true, value: rid,
      },
      {
        id: 'serialNumber', label: L('Serial Number'), type: 'text',
        disabled: true, readOnly: true, value: serialNumber,
      },
      {
        id: 'model', label: L('Model'), type: 'text',
        disabled: true, readOnly: true, value: model,
      },
      {
        id: 'assignedMemory', label: L('Assigned Memory(GB)'), type: 'text',
        disabled: true, readOnly: true, value: assignedMemory,
      },
      {
        id: 'assignedCPUCores', label: L('Assigned CPU Cores'), type: 'text',
        disabled: true, readOnly: true, value: assignedCPUCores,
      },
      {
        id: 'CPUType', label: L('CPU Type'), type: 'test',
        disabled: true, readOnly: true, value: CPUType,
      },
      {
        id: 'diskVolumeName', label: L('Disk Volume Name'), type: 'text',
        disabled: true, readOnly: true, value: diskVolumeName,
      },
      {
        id: 'CSVName', label: L('CSV Name'), type: 'text',
        disabled: true, readOnly: true, value: CSVName,
      },
      {
        id: 'diskSize', label: L('Disk Size'), type: 'text',
        disabled: true, readOnly: true, value: diskSize,
      },
      {
        id: 'status', label: L('Status'), type: 'text',
        disabled: true, readOnly: true, value: status,
      },
      {
        id: 'hostname', label: L('Hostname'), type: 'text',
        disabled: true, readOnly: true, value: hostname,
      },
      {
        id: 'VMClusterName', label: L('VM Cluster'), type: 'text',
        disabled: true, readOnly: true, value: VMClusterName,
      },
      {
        id: 'OS', label: L('OS'), type: 'text',
        disabled: true, readOnly: true, value: OS,
      },
      {
        id: 'serverRole', label: L('Server Role'), type: 'text',
        disabled: true, readOnly: true, value: serverRole,
      },
      {
        id: 'hostIP', label: L('Host IP'), type: 'text',
        disabled: true, readOnly: true, value: hostIP,
      },
      {
        id: 'ATLIP', label: L('ATL IP'), type: 'text',
        disabled: true, readOnly: true, value: ATLIP,
      },
      {
        id: 'dataPortIP', label: L('Data port IP'), type: 'text',
        disabled: true, readOnly: true, value: dataPortIP,
      },
      {
        id: 'magementHost', label: L('Magement Host'), type: 'text',
        disabled: true, readOnly: true, value: magementHost,
      },
      {
        id: 'extraIPs', label: L('Extra IPs'), type: 'text',
        disabled: true, readOnly: true, value: extraIPs,
      },
      {
        id: 'remarks', label: L('Remarks'), type: 'text',
        disabled: true, readOnly: true, value: remarks,
      },
      {
        id: 'projectCode', label: L('Project Code'), type: 'text',
        disabled: true, readOnly: true, value: projectCode,
      },
      {
        id: 'projectContact', label: L('Project Contact'), type: 'text',
        disabled: true, readOnly: true, value: projectContact,
      },
      {
        id: 'projectManager', label: L('Project Manager'), type: 'text',
        disabled: true, readOnly: true, value: projectManager,
      },
      {
        id: 'section', label: L('Section'), type: 'text',
        disabled: true, readOnly: true, value: section,
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
    setFormFieldList(list)
  }, [
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
    status,
    hostname,
    VMClusterName,
    OS,
    serverRole,
    hostIP,
    ATLIP,
    magementHost,
    extraIPs,
    remarks,
    projectCode,
    projectContact,
    projectManager,
    section,
    createdAt,
    updatedAt
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'rid':
        setRid(value)
        break
      case 'dataPortIP':
        setDataPortIP(value)
        break
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
      case 'CPUType':
        setCPUType(value)
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
      case 'section':
        setSection(value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle={L('Detail')}
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
