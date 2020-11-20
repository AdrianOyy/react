import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { useParams } from "react-router-dom"
// import dayjs from "dayjs"
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/NetworkFieldCheck"
import { L } from '../../../../../utils/lang'

function Detail() {
  const { id } = useParams()
  const history = useHistory()

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
  const [ EquipType, setEquipType ] = useState('')
  const [ inventory, setInventory ] = useState([])
  const [ errInventory, setErrInventory ] = useState({})

  const [ saving, setSaving ] = useState(true)
  // const [ InventoryStatus, setInventoryStatus ] = useState([])
  // const [ EquipTypes, setEquipTypes ] = useState([])
  // const [ defaultValue, setDefaultValue ] = useState({})


  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.update(id,
      {
        _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
        Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
        DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID, EquipType
      }
    )
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/network' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listStatus({ limit: 999, page: 1 }).then(({ data }) => {
      // return data.data
      if (data && data.data) {
        return data.data
      } else {
        return []
      }
    }).then(returnObj => {
      API.listEquipType({ limit: 999, page: 1 }).then(({ data }) => {
        if (data && data.data) {
          setEquipType(data.data.filter(_ => {
            return _.Type !== 'EqServer'
          }))
          return {
            InventoryStatus: returnObj,
            EquipTypes: data.data,
          }
        } else {
          return {
            InventoryStatus: returnObj,
            EquipTypes: [],
          }
        }
      }).then(returnObj => {
        // console.log(returnObj)
        API.detail(id).then(({ data }) => {
          const {
            _ID, UnitCode, AssetID, ModelCode, ModelDesc, ClosetID,
            Rack, RLU, ItemOwner, Status, Remark, UnitNo, PortQty, ReqNo,
            DOB, DeliveryDate, DeliveryNoteReceivedDate, MaintID, EquipType
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
          setStatus(Status)
          setRemark(Remark)
          setEquipType(EquipType)
          setUnitNo(UnitNo)
          setPortQty(PortQty)
          setReqNo(ReqNo)
          setDOB(DOB)
          setDeliveryDate(DeliveryDate)
          setDeliveryNoteReceivedDate(DeliveryNoteReceivedDate)
          setMaintID(MaintID)
          setSaving(false)

          const defaultValue = data.data
          const inventoryList = [
            {
              id: '_ID', label: L('Ref. ID'), type: 'text',
              required: true, readOnly: false, value: defaultValue._ID,
              error: _IDError, helperText: _IDHelperText
            },
            {
              id: 'UnitCode', label: L('New'), type: 'text',
              required: false, readOnly: false, value: defaultValue.UnitCode
            },
            {
              id: 'AssetID', label: L('Asset No'), type: 'text',
              required: false, readOnly: false, value: defaultValue.AssetID
            },
            {
              id: 'ModelCode', label: L('Model Code'), type: 'text',
              required: false, readOnly: false, value: defaultValue.ModelCode
            },
            {
              id: 'ModelDesc', label: L('Description'), type: 'text',
              required: false, readOnly: false, value: defaultValue.ModelDesc
            },
            {
              id: 'ClosetID', label: L('Closet ID'), type: 'text',
              required: false, readOnly: false, value: defaultValue.ClosetID
            },
            {
              id: 'Rack', label: L('Cabinet'), type: 'text',
              required: false, readOnly: false, value: defaultValue.Rack
            },
            {
              id: 'RLU', label: L('Pos. (U)'), type: 'text',
              required: false, readOnly: false, value: defaultValue.RLU
            },
            {
              id: 'ItemOwner', label: L('Item Owner'), type: 'text',
              required: false, readOnly: false, value: defaultValue.ItemOwner
            },
            {
              id: 'Status', label: L('Status'), type: 'select',
              value: defaultValue.Status, itemList: returnObj.InventoryStatus,
              labelField: 'ServiceStatus', valueField: 'id',
            },
            {
              id: 'Remark', label: L('Remark'), type: 'text',
              required: false, readOnly: false, value: defaultValue.Remark
            },
            {
              id: 'EquipType', label: L('EquipType'), type: 'select',
              value: defaultValue.EquipType, itemList: returnObj.EquipTypes,
              labelField: 'Type', valueField: 'id',
            },
            {
              id: 'UnitNo', label: L('Unit No'), type: 'text',
              required: false, readOnly: false, value: defaultValue.UnitNo
            },
            {
              id: 'PortQty', label: L('Built-in Port'), type: 'text',
              required: false, readOnly: false, value: defaultValue.PortQty
            },
            {
              id: 'ReqNo', label: L('Req. Form'), type: 'text',
              required: false, readOnly: false, value: defaultValue.ReqNo
            },
            {
              id: 'DOB', label: L('DOB'), type: 'date',
              required: false, readOnly: false, value: defaultValue.DOB
            },
            {
              id: 'DeliveryDate', label: L('Delivery Date'), type: 'date',
              required: false, readOnly: false, value: defaultValue.DeliveryDate
            },
            {
              id: 'DeliveryNoteReceivedDate', label: L('Delivery Note Received Date'), type: 'date',
              required: false, readOnly: false, value: defaultValue.DeliveryNoteReceivedDate
            },
            {
              id: 'MaintID', label: L('MaintID'), type: 'text',
              required: false, readOnly: false, value: defaultValue.MaintID
            },
          ]
          setInventory(inventoryList)
          // setDefaultValue(data.data)
        })
      })
    })
    // eslint-disable-next-line
  }, [ id ])

  useEffect(() => {
    const error = {
      _ID: {
        error: _IDError,
        helperText: _IDHelperText,
      }
    }
    console.log(error)
    setErrInventory(error)
  }, [ _IDError, _IDHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    console.log(value, id)
    switch (id) {
      case '_ID' :
        set_ID(value)
        if (value) {
          set_IDError(false)
          set_IDHelperText('')
        }
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
      case 'EquipType' :
        setEquipType(value)
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
      const { error, msg } = await checkExist(id, _ID)
      set_IDError(error)
      set_IDHelperText(msg)
      return error
    }
    return emptyCheck.error
  }
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
        formTitle={L('Network')}
        onFormFieldChange = {onFormFieldChange}
        onFormFieldBlur = {onFormFieldBlur}
        formFieldList = {inventory}
        errorFieldList={errInventory}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Detail
