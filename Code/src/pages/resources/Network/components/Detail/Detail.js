import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

function Detail(props) {
  const { onMount } = props
  
  const { id } = useParams()
  const [ _ID, set_ID ] = useState('')
  const [ UnitCode, setUnitCode ] = useState('')
  const [ AssetID, setAssetID ] = useState('')
  const [ ModelCode, setModelCode ] = useState('')
  const [ ModelDesc, setModelDesc ] = useState('')
  const [ ClosetID, setClosetID ] = useState('')
  const [ Rack, setRack ] = useState('')
  const [ RLU, setRLU ] = useState('')
  const [ ItemOwner, setItemOwner ] = useState('')
  const [ ServiceStatus, setServiceStatus ] = useState('')
  const [ Remark, setRemark ] = useState('')
  const [ UnitNo, setUnitNo ] = useState('')
  const [ PortQty, setPortQty ] = useState('')
  const [ ReqNo, setReqNo ] = useState('')
  const [ DOB, setDOB ] = useState('')
  const [ DeliveryDate, setDeliveryDate ] = useState('')
  const [ DeliveryNoteReceivedDate, setDeliveryNoteReceivedDate ] = useState('')
  const [ MaintID, setMaintID ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdastedAt ] = useState('')

  // const [ Slot, setSlot ] = useState('')
  // const [ Port, setPort ] = useState('')
  // const [ RequesterTeam, setRequesterTeam ] = useState('')
  // const [ PortUsage, setPortUsage ] = useState('')
  // const [ PortAssignStatus, setPortAssignStatus ] = useState('')
  // const [ PortAssignDate, setPortAssignDate ] = useState('')
  // const [ PortAssignerID, setPortAssignerID ] = useState('')
  // const [ PortAssignerDisplayName, setPortAssignerDisplayName ] = useState('')
  // const [ PortTeamingEquip, setPortTeamingEquip ] = useState('')
  // const [ PortTeamingEquipPort, setPortTeamingEquipPort ] = useState('')
  // const [ MoveInRef, setMoveInRef ] = useState('')
  // const [ MachineIP, setMachineIP ] = useState('')
  // const [ MachineHostName, setMachineHostName ] = useState('')
  // const [ PortAssignmentRemarks, setPortAssignmentRemarks ] = useState('')
  // const [ IPAddRef, setIPAddRef ] = useState('')

  const [ inventory, setInventory ] = useState([])
  // const [ portAssignment, setPortAssignment ] = useState([])

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
  }

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.detail(id).then(({ data }) => {
      if (data && data.data) {
        console.log(data.data)
        const {
          _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
          Rack, RLU, ItemOwner, status, Remark, UnitNo, PortQty, ReqNo,
          DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
          createdAt, updatedAt
        } = data.data
        set_ID(_ID)
        setUnitCode(UnitCode)
        setAssetID(AssetID)
        setModelCode(ModelCode)
        setModelDesc(ModelDesc)
        setClosetID(ClosetID)
        setRack(Rack)
        setRLU(RLU)
        setItemOwner(ItemOwner)
        setServiceStatus(status ? status.ServiceStatus : '')
        setRemark(Remark)
        setUnitNo(UnitNo)
        setPortQty(PortQty)
        setReqNo(ReqNo)
        setDOB(DOB)
        setDeliveryDate(DeliveryDate)
        setDeliveryNoteReceivedDate(DeliveryNoteReceivedDate)
        setMaintID(MaintID)
        setCreatedAt(createdAt)
        setUpdastedAt(updatedAt)
        // setSlot()
        // setPort()
        // setRequesterTeam()
        // setPortUsage()
        // setPortAssignStatus()
        // setPortAssignDate()
        // setPortAssignerID()
        // setPortAssignerDisplayName()
        // setPortTeamingEquip()
        // setPortTeamingEquipPort()
        // setMoveInRef()
        // setMachineIP()
        // setMachineHostName()
        // setPortAssignmentRemarks()
        // setIPAddRef()
      }
    })
  }, [ id ])

  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: 'Ref. ID', type: 'text',
        disabled: true, readOnly: true, value: _ID
      },
      {
        id: 'UnitCode', label: 'New', type: 'text',
        disabled: true, readOnly: true, value: UnitCode
      },
      {
        id: 'AssetID', label: 'Asset No', type: 'text',
        disabled: true, readOnly: true, value: AssetID
      },
      {
        id: 'ModelCode', label: 'Model Code', type: 'text',
        disabled: true, readOnly: true, value: ModelCode
      },
      {
        id: 'ModelDesc', label: 'Description', type: 'text',
        disabled: true, readOnly: true, value: ModelDesc
      },
      {
        id: 'ClosetID', label: 'Closet ID', type: 'text',
        disabled: true, readOnly: true, value: ClosetID
      },
      {
        id: 'Rack', label: 'Cabinet', type: 'text',
        disabled: true, readOnly: true, value: Rack
      },
      {
        id: 'RLU', label: 'Pos. (U)', type: 'text',
        disabled: true, readOnly: true, value: RLU
      },
      {
        id: 'ItemOwner', label: 'Item Owner', type: 'text',
        disabled: true, readOnly: true, value: ItemOwner
      },
      {
        id: 'ServiceStatus', label: 'Status', type: 'text',
        disabled: true, readOnly: true, value: ServiceStatus
      },
      {
        id: 'Remark', label: 'Remark', type: 'text',
        disabled: true, readOnly: true, value: Remark
      },
      {
        id: 'UnitNo', label: 'Unit No', type: 'text',
        disabled: true, readOnly: true, value: UnitNo
      },
      {
        id: 'PortQty', label: 'Built-in Port', type: 'text',
        disabled: true, readOnly: true, value: PortQty
      },
      {
        id: 'ReqNo', label: 'Req. Form', type: 'text',
        disabled: true, readOnly: true, value: ReqNo
      },
      {
        id: 'DOB', label: 'DOB', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DOB)
      },
      {
        id: 'DeliveryDate', label: 'Delivery Date', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryDate)
      },
      {
        id: 'DeliveryNoteReceivedDate', label: 'Delivery Note Received Date', type: 'text',
        disabled: true, readOnly: true, value: formatDateTime(DeliveryNoteReceivedDate)
      },
      {
        id: 'MaintID', label: 'MaintID', type: 'text',
        disabled: true, readOnly: true, value: MaintID
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
    setInventory(inventoryList)
    // const portAssignmentList = [
    //   {
    //     id: 'Slot', label: 'Slot', type: 'text',
    //     disabled: true, readOnly: true, value: Slot
    //   },
    //   {
    //     id: 'Port', label: 'Port', type: 'text',
    //     disabled: true, readOnly: true, value: Port
    //   },
    //   {
    //     id: 'RequesterTeam', label: 'RequesterTeam', type: 'text',
    //     disabled: true, readOnly: true, value: RequesterTeam
    //   },
    //   {
    //     id: 'PortUsage', label: 'PortUsage', type: 'text',
    //     disabled: true, readOnly: true, value: PortUsage
    //   },
    //   {
    //     id: 'PortAssignStatus', label: 'PortAssignStatus', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignStatus
    //   },
    //   {
    //     id: 'PortAssignDate', label: 'PortAssignDate', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignDate
    //   },
    //   {
    //     id: 'PortAssignerID', label: 'PortAssignerID', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignerID
    //   },
    //   {
    //     id: 'PortAssignerDisplayName', label: 'PortAssigner Display Name', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignerDisplayName
    //   },
    //   {
    //     id: 'PortTeamingEquip', label: 'PortTeamingEquip', type: 'text',
    //     disabled: true, readOnly: true, value: PortTeamingEquip
    //   },
    //   {
    //     id: 'PortTeamingEquipPort', label: 'PortTeamingEquipPort', type: 'text',
    //     disabled: true, readOnly: true, value: PortTeamingEquipPort
    //   },
    //   {
    //     id: 'MoveInRef', label: 'MoveInRef', type: 'text',
    //     disabled: true, readOnly: true, value: MoveInRef
    //   },
    //   {
    //     id: 'MachineIP', label: 'MachineIP', type: 'text',
    //     disabled: true, readOnly: true, value: MachineIP
    //   },
    //   {
    //     id: 'MachineHostName', label: 'MachineHostName', type: 'text',
    //     disabled: true, readOnly: true, value: MachineHostName
    //   },
    //   {
    //     id: 'PortAssignmentRemarks', label: 'PortAssignmentRemarks', type: 'text',
    //     disabled: true, readOnly: true, value: PortAssignmentRemarks
    //   },
    //   {
    //     id: 'IPAddRef', label: 'IPAddRef', type: 'text',
    //     disabled: true, readOnly: true, value: IPAddRef
    //   },
    // ]
    // setPortAssignment(portAssignmentList)
  }, [
    _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
    Rack, RLU, ItemOwner, ServiceStatus, Remark, UnitNo, PortQty, ReqNo,
    DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID,
    createdAt, updatedAt
    // ,
    // Slot, Port, RequesterTeam, PortUsage, PortAssignStatus,
    // PortAssignDate, PortAssignerID, PortAssignerDisplayName,
    // PortTeamingEquip, PortTeamingEquipPort, MoveInRef, MachineIP,
    // MachineHostName, PortAssignmentRemarks, IPAddRef
  ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case '_ID' :
        set_ID(value)
        break
      case 'UnitCode' :
        setUnitCode(value)
        break
      case 'AssetID' :
        setAssetID(value)
        break
      case 'ModelCode' :
        setModelCode(value)
        break
      case 'ModelDesc' :
        setModelDesc(value)
        break
      case 'ClosetID' :
        setClosetID(value)
        break
      case 'Rack' :
        setRack(value)
        break
      case 'RLU' :
        setRLU(value)
        break
      case 'ItemOwner' :
        setItemOwner(value)
        break
      case 'Status' :
        setServiceStatus(value)
        break
      case 'Remark' :
        setRemark(value)
        break
      case 'UnitNo' :
        setUnitNo(value)
        break
      case 'PortQty' :
        setPortQty(value)
        break
      case 'ReqNo' :
        setReqNo(value)
        break
      case 'DOB' :
        setDOB(value)
        break
      case 'DeliveryDate' :
        setDeliveryDate(value)
        break
      case 'DeliveryNoteReceivedDate' :
        setDeliveryNoteReceivedDate(value)
        break
      case 'MaintID' :
        setMaintID(value)
        break
      // case 'Slot' :
      //   setSlot(value)
      //   break
      // case 'Port' :
      //   setPort(value)
      //   break
      // case 'RequesterTeam' :
      //   setRequesterTeam(value)
      //   break
      // case 'PortUsage' :
      //   setPortUsage(value)
      //   break
      // case 'PortAssignStatus' :
      //   setPortAssignStatus(value)
      //   break
      // case 'PortAssignDate' :
      //   setPortAssignDate(value)
      //   break
      // case 'PortAssignerID' :
      //   setPortAssignerID(value)
      //   break
      // case 'PortAssignerDisplayName' :
      //   setPortAssignerDisplayName(value)
      //   break
      // case 'PortTeamingEquip' :
      //   setPortTeamingEquip(value)
      //   break
      // case 'PortTeamingEquipPort' :
      //   setPortTeamingEquipPort(value)
      //   break
      // case 'MoveInRef' :
      //   setMoveInRef(value)
      //   break
      // case 'MachineIP' :
      //   setMachineIP(value)
      //   break
      // case 'MachineHostName' :
      //   setMachineHostName(value)
      //   break
      // case 'PortAssignmentRemarks' :
      //   setPortAssignmentRemarks(value)
      //   break
      // case 'IPAddRef' :
      //   setIPAddRef(value)
      //   break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Network'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
      />
      {/* <DetailPage
        formTitle = 'Port Assignment'
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {portAssignment}
      /> */}
    </React.Fragment>
  )
}

export default Detail
