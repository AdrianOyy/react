import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"

import DetailPage from "../../../../../components/DetailPage"
import CommonTip from "../../../../../components/CommonTip"
import API from "../../../../../api/VMProvisioning"
import { checkEmpty } from "../../untils/VMProvisioningCheck"

const listPath = '/resources/VM'
const formTitle = 'Update'

function Update(props) {
  const { onMount } = props
  const { id } = useParams()
  const history = useHistory()
  const [ phase, setPhase ] = useState('')
  const [ platform, setPlatform ] = useState('')
  const [ hostname, setHostname ] = useState('')
  const [ environmentType, setEnvironmentType ] = useState('')
  const [ networkZone, setNetworkZone ] = useState('')
  const [ dataCenter, setDataCenter ] = useState('')
  const [ applicationType, setApplicationType ] = useState('')
  const [ cpuRequestNumber, setCpuRequestNumber ] = useState('')
  const [ cpuGrowthPercentage, setCpuGrowthPercentage ] = useState('')
  const [ cpuGrowthNumber, setCpuGrowthNumber ] = useState('')
  const [ ramRequestNumber, setRamRequestNumber ] = useState('')
  const [ ramGrowthPercentage, setRamGrowthPercentage ] = useState('')
  const [ ramGrowthNumber, setRamGrowthNumber ] = useState('')
  const [ dataStorageRequestNumber, setDataStorageRequestNumber ] = useState('')
  const [ dataStorageGrowthPercentage, setDataStorageGrowthPercentage ] = useState('')
  const [ dataStorageGrowthNumber, setDataStorageGrowthNumber ] = useState('')
  const [ backupVolume, setBackupVolume ] = useState('')
  const [ backupSechedule, setBackupSechedule ] = useState('')
  const [ backupRetention, setBackupRetention ] = useState('')
  const [ backupGrowthPercentage, setBackupGrowthPercentage ] = useState('')
  const [ backupGrowthNumber, setBackupGrowthNumber ] = useState('')
  const [ remarks, setRemarks ] = useState('')
  const [ vmCluster, setVmCluster ] = useState('')
  const [ vmMaster, setVmMaster ] = useState('')
  const [ osIp, setOsIp ] = useState('')
  const [ atlIp, setAtlIp ] = useState('')
  const [ csv, setCSV ] = useState('')
  const [ room, setRoom ] = useState('')
  const [ rack, setRack ] = useState('')
  const [ rlu, setRlu ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ saving, setSaving ] = useState(true)
  const [ nameError, setNameError ] = useState(false)
  const [ nameHelperText, setNameHelperText ] = useState("")

  useEffect(() => {
    onMount('update')
    // eslint-disable-next-line
  }, [])

  const hanleClick = async () => {
    const nameErr = await nameCheck()
    if (nameErr || saving) return
    setSaving(true)
    API.update(id, {  phase, platform, hostname, environmentType, networkZone, dataCenter, applicationType, cpuRequestNumber,
      cpuGrowthPercentage, cpuGrowthNumber, ramRequestNumber, ramGrowthPercentage, ramGrowthNumber, dataStorageRequestNumber,
      dataStorageGrowthPercentage, dataStorageGrowthNumber, backupVolume, backupSechedule, backupRetention,
      backupGrowthPercentage, backupGrowthNumber, remarks, vmCluster, vmMaster, osIp, atlIp,
      csv, room, rack, rlu })
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: listPath })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      const { phase, platform, hostname, environmentType, networkZone, dataCenter, applicationType, cpuRequestNumber,
        cpuGrowthPercentage, cpuGrowthNumber, ramRequestNumber, ramGrowthPercentage, ramGrowthNumber, dataStorageRequestNumber,
        dataStorageGrowthPercentage, dataStorageGrowthNumber, backupVolume, backupSechedule, backupRetention,
        backupGrowthPercentage, backupGrowthNumber, remarks, vmCluster, vmMaster, osIp, atlIp,
        csv, room, rack, rlu } = data.data
      setPhase(phase)
      setPlatform(platform)
      setHostname(hostname)
      setEnvironmentType(environmentType)
      setNetworkZone(networkZone)
      setDataCenter(dataCenter)
      setApplicationType(applicationType)
      setCpuRequestNumber(cpuRequestNumber)
      setCpuGrowthPercentage(cpuGrowthPercentage)
      setCpuGrowthNumber(cpuGrowthNumber)
      setRamRequestNumber(ramRequestNumber)
      setRamGrowthPercentage(ramGrowthPercentage)
      setRamGrowthNumber(ramGrowthNumber)
      setDataStorageRequestNumber(dataStorageRequestNumber)
      setDataStorageGrowthPercentage(dataStorageGrowthPercentage)
      setDataStorageGrowthNumber(dataStorageGrowthNumber)
      setBackupVolume(backupVolume)
      setBackupSechedule(backupSechedule)
      setBackupRetention(backupRetention)
      setBackupGrowthPercentage(backupGrowthPercentage)
      setBackupGrowthNumber(backupGrowthNumber)
      setRemarks(remarks)
      setVmCluster(vmCluster)
      setVmMaster(vmMaster)
      setOsIp(osIp)
      setAtlIp(atlIp)
      setCSV(csv)
      setRoom(room)
      setRack(rack)
      setRlu(rlu)
      setSaving(false)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'phase', label: 'Phase', type: 'text', required: false, readOnly: false, value: phase },
      { id: 'platform', label: 'Platform', type: 'text', required: false, readOnly: false, value: platform },
      { id: 'hostname', label: 'Hostname', type: 'text', required: false, readOnly: false, value: hostname, error: nameError, helperText: nameHelperText },
      { id: 'environmentType', label: 'Environment Type', type: 'text', required: false, readOnly: true, value: environmentType },
      { id: 'networkZone', label: 'Network Zone', type: 'text', required: false, readOnly: false, value: networkZone },
      { id: 'dataCenter', label: 'Data Center', type: 'text', required: false, readOnly: false, value: dataCenter },
      { id: 'applicationType', label: 'Application Type', type: 'text', required: false, readOnly: false, value: applicationType },
      { id: 'cpuRequestNumber', label: 'CPU Request Number', type: 'text', required: false, readOnly: false, value: cpuRequestNumber },
      { id: 'cpuGrowthPercentage', label: 'CPU Growth Percentage', type: 'text', required: false, readOnly: false, value: cpuGrowthPercentage },
      { id: 'cpuGrowthNumber', label: 'CPU Growth Number', type: 'text', required: false, readOnly: false, value: cpuGrowthNumber },
      { id: 'ramRequestNumber', label: 'RAM Request Number', type: 'text', required: false, readOnly: false, value: ramRequestNumber },
      { id: 'ramGrowthPercentage', label: 'RAM Growth Percentage', type: 'text', required: false, readOnly: false, value: ramGrowthPercentage },
      { id: 'ramGrowthNumber', label: 'RAM Growth Number', type: 'text', required: false, readOnly: false, value: ramGrowthNumber },
      { id: 'dataStorageRequestNumber', label: 'Data Storage Request Number', type: 'text', required: false, readOnly: false, value: dataStorageRequestNumber },
      { id: 'dataStorageGrowthPercentage', label: 'Data Storage Growth Percentage', type: 'text', required: false, readOnly: false, value: dataStorageGrowthPercentage },
      { id: 'dataStorageGrowthNumber', label: 'Data Storage Growth Number', type: 'text', required: false, readOnly: false, value: dataStorageGrowthNumber },
      { id: 'backupVolume', label: 'Backup Volume', type: 'text', required: false, readOnly: false, value: backupVolume },
      { id: 'backupSechedule', label: 'Backup Sechedule', type: 'text', required: false, readOnly: false, value: backupSechedule },
      { id: 'backupRetention', label: 'Backup Retention', type: 'text', required: false, readOnly: false, value: backupRetention },
      { id: 'backupGrowthPercentage', label: 'Backup Growth Percentage', type: 'text', required: false, readOnly: false, value: backupGrowthPercentage },
      { id: 'backupGrowthNumber', label: 'Backup Growth Number', type: 'text', required: false, readOnly: false, value: backupGrowthNumber },
      { id: 'remarks', label: 'Remarks', type: 'text', required: false, readOnly: false, value: remarks },
      { id: 'vmCluster', label: 'VM Cluster', type: 'text', required: false, readOnly: false, value: vmCluster },
      { id: 'vmMaster', label: 'VM Master', type: 'text', required: false, readOnly: false, value: vmMaster },
      { id: 'osIp', label: 'OS IP', type: 'text', required: false, readOnly: false, value: osIp },
      { id: 'atlIp', label: 'ALT IP', type: 'text', required: false, readOnly: false, value: atlIp },
      { id: 'csv', label: 'CSV', type: 'text', required: false, readOnly: false, value: csv },
      { id: 'room', label: 'Room', type: 'text', required: false, readOnly: false, value: room },
      { id: 'rack', label: 'Rack', type: 'text', required: false, readOnly: false, value: rack },
      { id: 'rlu', label: 'RLU', type: 'text', required: false, readOnly: false, value: rlu },
    ]
    setFormFieldList(list)
  }, [ phase, platform, hostname, environmentType, networkZone, dataCenter, applicationType, cpuRequestNumber,
    cpuGrowthPercentage, cpuGrowthNumber, ramRequestNumber, ramGrowthPercentage, ramGrowthNumber, dataStorageRequestNumber,
    dataStorageGrowthPercentage, dataStorageGrowthNumber, backupVolume, backupSechedule, backupRetention,
    backupGrowthPercentage, backupGrowthNumber, remarks, vmCluster, vmMaster, osIp, atlIp,
    csv, room, rack, rlu, nameError, nameHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'phase':
        setPhase(value)
        break
      case 'platform':
        setPlatform(value)
        break
      case 'hostname':
        setHostname(value)
        break
      case 'environmentType':
        setEnvironmentType(value)
        break
      case 'networkZone':
        setNetworkZone(value)
        break
      case 'dataCenter':
        setDataCenter(value)
        break
      case 'applicationType':
        setApplicationType(value)
        break
      case 'cpuRequestNumber':
        setCpuRequestNumber(value)
        break
      case 'cpuGrowthPercentage':
        setCpuGrowthPercentage(value)
        break
      case 'cpuGrowthNumber':
        setCpuGrowthNumber(value)
        break
      case 'ramRequestNumber':
        setRamRequestNumber(value)
        break
      case 'ramGrowthPercentage':
        setRamGrowthPercentage(value)
        break
      case 'ramGrowthNumber':
        setRamGrowthNumber(value)
        break
      case 'dataStorageRequestNumber':
        setDataStorageRequestNumber(value)
        break
      case 'dataStorageGrowthPercentage':
        setDataStorageGrowthPercentage(value)
        break
      case 'dataStorageGrowthNumber':
        setDataStorageGrowthNumber(value)
        break
      case 'backupVolume':
        setBackupVolume(value)
        break
      case 'backupSechedule':
        setBackupSechedule(value)
        break
      case 'backupRetention':
        setBackupRetention(value)
        break
      case 'backupGrowthPercentage':
        setBackupGrowthPercentage(value)
        break
      case 'backupGrowthNumber':
        setBackupGrowthNumber(value)
        break
      case 'remarks':
        setRemarks(value)
        break
      case 'vmCluster':
        setVmCluster(value)
        break
      case 'vmMaster':
        setVmMaster(value)
        break
      case 'osIp':
        setOsIp(value)
        break
      case 'atlIp':
        setAtlIp(value)
        break
      case 'csv':
        setCSV(value)
        break
      case 'room':
        setRoom(value)
        break
      case 'rack':
        setRack(value)
        break
      case 'rlu':
        setRlu(value)
        break
      default:
        break
    }
  }

  const nameCheck = async () => {
    const emptyCheck = checkEmpty("Hostname", hostname)
    setNameError(emptyCheck.error)
    setNameHelperText(emptyCheck.msg)
    // if (!emptyCheck.error) {
    //   const checkExist = getCheckExist()
    //   const { error, msg } = await checkExist(id, name)
    //   setNameError(error)
    //   setNameHelperText(msg)
    //   return error
    // }
    return emptyCheck.error
  }
  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "hostname":
        nameCheck()
        break
      default:
        break
    }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle = {formTitle}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {formFieldList}
        showBtn ={true}
        onBtnClick = {hanleClick}
      />
    </React.Fragment>
  )
}

export default Update
