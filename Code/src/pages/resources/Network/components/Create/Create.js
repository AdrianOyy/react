import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/NetworkFieldCheck"


function Create(props) {
  const { onMount } = props
  const history = useHistory()
  // const [ name, setName ] = useState('')
  // const [ nameError, setNameError ] = useState(false)
  // const [ nameHelperText, setNameHelperText ] = useState("")
  const [ _ID, set_ID ] = useState('')
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ UnitCode, setUnitCode ] = useState('')
  const [ AssetID, setAssetID ] = useState('')
  const [ ModelCode, setModelCode ] = useState('')
  const [ ModelDesc, setModelDesc ] = useState('')
  const [ ClosetID, setClosetID ] = useState('')
  const [ Rack, setRack ] = useState('')
  const [ RLU, setRLU ] = useState('')
  const [ ItemOwner, setItemOwner ] = useState('')
  const [ Status, setStatus ] = useState('')
  const [ Remark, setRemark ] = useState('')
  const [ UnitNo, setUnitNo ] = useState('')
  const [ PortQty, setPortQty ] = useState('')
  const [ ReqNo, setReqNo ] = useState('')
  const [ DOB, setDOB ] = useState('')
  const [ DeliveryDate, setDeliveryDate ] = useState('')
  const [ DeliveryNoteReceivedDate, setDeliveryNoteReceivedDate ] = useState('')
  const [ MaintID, setMaintID ] = useState('')
  const [ inventory, setInventory ] = useState([])

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
  // const [ portAssignment, setPortAssignment ] = useState([])

  
  const [ saving, setSaving ] = useState(false)
  const [ InventoryStatus, setInventoryStatus ] = useState([])

  useEffect(() => {
    onMount('create')
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.create(
        {
          _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
          Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
          DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID
          // ,
          // Slot, Port, RequesterTeam, PortUsage, PortAssignStatus,
          // PortAssignDate, PortAssignerID, PortAssignerDisplayName,
          // PortTeamingEquip, PortTeamingEquipPort, MoveInRef, MachineIP,
          // MachineHostName, PortAssignmentRemarks, IPAddRef
        }
      )
      .then(() => {
        CommonTip.success("Success")
        history.push({ pathname: '/resources/network' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listStatus({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        console.log(data.data)
        setInventoryStatus(data.data)
      }
    })
  }, [])
  useEffect(() => {
    // const list = [
    //   {
    //     id: 'name', label: 'Name', type: 'text',
    //     required: true, readOnly: false, value: name,
    //     error: nameError, helperText: nameHelperText
    //   },
    //   {
    //     id: 'typeId', label: 'Type', type: 'select',
    //     value: typeId, itemList: typeList,
    //     labelField: 'name', valueField: 'id',
    //     error: typeIdError, helperText: typeIdHelperText,
    //   },
    // ]
    // name, nameError, nameHelperText,
    // typeList
    const inventoryList = [
      {
        id: '_ID', label: 'Ref. ID', type: 'text',
        required: true, readOnly: false, value: _ID,
        error: _IDError, helperText: _IDHelperText
      },
      {
        id: 'UnitCode', label: 'New', type: 'text',
        required: false, readOnly: false, value: UnitCode
      },
      {
        id: 'AssetID', label: 'Asset No', type: 'text',
        required: false, readOnly: false, value: AssetID
      },
      {
        id: 'ModelCode', label: 'Model Code', type: 'text',
        required: false, readOnly: false, value: ModelCode
      },
      {
        id: 'ModelDesc', label: 'Description', type: 'text',
        required: false, readOnly: false, value: ModelDesc
      },
      {
        id: 'ClosetID', label: 'Closet ID', type: 'text',
        required: false, readOnly: false, value: ClosetID
      },
      {
        id: 'Rack', label: 'Cabinet', type: 'text',
        required: false, readOnly: false, value: Rack
      },
      {
        id: 'RLU', label: 'Pos. (U)', type: 'text',
        required: false, readOnly: false, value: RLU
      },
      {
        id: 'ItemOwner', label: 'Item Owner', type: 'text',
        required: false, readOnly: false, value: ItemOwner
      },
      {
        id: 'Status', label: 'Status', type: 'select',
        value: Status, itemList: InventoryStatus,
        labelField: 'ServiceStatus', valueField: 'id',
      },
      {
        id: 'Remark', label: 'Remark', type: 'text',
        required: false, readOnly: false, value: Remark
      },
      {
        id: 'UnitNo', label: 'Unit No', type: 'text',
        required: false, readOnly: false, value: UnitNo
      },
      {
        id: 'PortQty', label: 'Built-in Port', type: 'text',
        required: false, readOnly: false, value: PortQty
      },
      {
        id: 'ReqNo', label: 'Req. Form', type: 'text',
        required: false, readOnly: false, value: ReqNo
      },
      {
        id: 'DOB', label: 'DOB', type: 'date',
        required: false, readOnly: false, value: DOB
      },
      {
        id: 'DeliveryDate', label: 'Delivery Date', type: 'date',
        required: false, readOnly: false, value: DeliveryDate
      },
      {
        id: 'DeliveryNoteReceivedDate', label: 'Delivery Note Received Date', type: 'date',
        required: false, readOnly: false, value: DeliveryNoteReceivedDate
      },
      {
        id: 'MaintID', label: 'MaintID', type: 'text',
        required: false, readOnly: false, value: MaintID
      },
    ]
    setInventory(inventoryList)
    // const portAssignmentList = [
    //   {
    //     id: 'Slot', label: 'Slot', type: 'text',
    //     required: false, readOnly: false, value: Slot
    //   },
    //   {
    //     id: 'Port', label: 'Port', type: 'text',
    //     required: false, readOnly: false, value: Port
    //   },
    //   {
    //     id: 'RequesterTeam', label: 'RequesterTeam', type: 'text',
    //     required: false, readOnly: false, value: RequesterTeam
    //   },
    //   {
    //     id: 'PortUsage', label: 'PortUsage', type: 'text',
    //     required: false, readOnly: false, value: PortUsage
    //   },
    //   {
    //     id: 'PortAssignStatus', label: 'PortAssignStatus', type: 'text',
    //     required: false, readOnly: false, value: PortAssignStatus
    //   },
    //   {
    //     id: 'PortAssignDate', label: 'PortAssignDate', type: 'text',
    //     required: false, readOnly: false, value: PortAssignDate
    //   },
    //   {
    //     id: 'PortAssignerID', label: 'PortAssignerID', type: 'text',
    //     required: false, readOnly: false, value: PortAssignerID
    //   },
    //   {
    //     id: 'PortAssignerDisplayName', label: 'PortAssigner Display Name', type: 'text',
    //     required: false, readOnly: false, value: PortAssignerDisplayName
    //   },
    //   {
    //     id: 'PortTeamingEquip', label: 'PortTeamingEquip', type: 'text',
    //     required: false, readOnly: false, value: PortTeamingEquip
    //   },
    //   {
    //     id: 'PortTeamingEquipPort', label: 'PortTeamingEquipPort', type: 'text',
    //     required: false, readOnly: false, value: PortTeamingEquipPort
    //   },
    //   {
    //     id: 'MoveInRef', label: 'MoveInRef', type: 'text',
    //     required: false, readOnly: false, value: MoveInRef
    //   },
    //   {
    //     id: 'MachineIP', label: 'MachineIP', type: 'text',
    //     required: false, readOnly: false, value: MachineIP
    //   },
    //   {
    //     id: 'MachineHostName', label: 'MachineHostName', type: 'text',
    //     required: false, readOnly: false, value: MachineHostName
    //   },
    //   {
    //     id: 'PortAssignmentRemarks', label: 'PortAssignmentRemarks', type: 'text',
    //     required: false, readOnly: false, value: PortAssignmentRemarks
    //   },
    //   {
    //     id: 'IPAddRef', label: 'IPAddRef', type: 'text',
    //     required: false, readOnly: false, value: IPAddRef
    //   },
    // ]
    
    // setPortAssignment(portAssignmentList)
  }, [
    _ID, _IDError, _IDHelperText,
    UnitCode,
    AssetID,
    ModelCode,
    ModelDesc,
    ClosetID,
    Rack,
    RLU,
    ItemOwner,
    Status,
    Remark,
    UnitNo,
    PortQty,
    ReqNo,
    DOB,
    DeliveryDate,
    DeliveryNoteReceivedDate,
    MaintID,
    InventoryStatus
    // ,
    // Slot,
    // Port,
    // RequesterTeam,
    // PortUsage,
    // PortAssignStatus,
    // PortAssignDate,
    // PortAssignerID,
    // PortAssignerDisplayName,
    // PortTeamingEquip,
    // PortTeamingEquipPort,
    // MoveInRef,
    // MachineIP,
    // MachineHostName,
    // PortAssignmentRemarks,
    // IPAddRef
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
        setStatus(value)
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
  const _IDCheck = async () => {
    const emptyCheck = checkEmpty("Ref. ID", _ID)
    set_IDError(emptyCheck.error)
    set_IDHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, _ID)
      set_IDError(error)
      set_IDHelperText(msg)
      return error
    }
    return emptyCheck.error
  }
  // const nameCheck = async () => {
  //   const emptyCheck = checkEmpty("name", name)
  //   setNameError(emptyCheck.error)
  //   setNameHelperText(emptyCheck.msg)
  //   if (!emptyCheck.error) {
  //     const checkExist = getCheckExist()
  //     const { error, msg } = await checkExist(0, name)
  //     setNameError(error)
  //     setNameHelperText(msg)
  //     return error
  //   }
  //   return emptyCheck.error
  // }

  const onFormFieldBlur = (_, id) => {
    switch (id) {
      case "_ID":
        _IDCheck()
        break
      default:
        break
      }
  }
  return (
    <React.Fragment>
      <DetailPage
        formTitle = 'Network'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {inventory}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
      {/* <DetailPage
        formTitle = 'Port Assignment'
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {portAssignment}
        showBtn ={true}
        onBtnClick = {handleClick}
      /> */}
    </React.Fragment>
  )
}

export default Create
