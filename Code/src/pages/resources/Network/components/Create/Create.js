import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventory"
import { L } from '../../../../../utils/lang'
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/NetworkFieldCheck"


function Create(props) {
  const { map } = props
  const history = useHistory()
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ EquipTypeError, setEquipTypeError ] = useState(false)
  const [ EquipTypeHelperText, setEquipTypeHelperText ] = useState('')
  const [ inventory, setInventory ] = useState([])

  const [ saving, setSaving ] = useState(false)
  const [ InventoryStatus, setInventoryStatus ] = useState([])
  const [ EquipTypes, setEquipTypes ] = useState([])
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    const EquipTypeError = await EquipTypeCheck()
    if (_IDError || EquipTypeError || saving) return
    setSaving(true)
    API.create(
      {
        _ID: map.get("_ID"),
        UnitCode: map.get("UnitCode"),
        AssetID: map.get("AssetID"),
        ModelCode: map.get("ModelCode"),
        ModelDesc: map.get("ModelDesc"),
        ClosetID: map.get("ClosetID"),
        Rack: map.get("Rack"),
        RLU: map.get("RLU"),
        ItemOwner: map.get("ItemOwner"),
        Status: map.get("Status"),
        Remark: map.get("Remark"),
        EquipType: map.get("EquipType"),
        UnitNo: map.get("UnitNo"),
        PortQty: map.get("PortQty"),
        ReqNo: map.get("ReqNo"),
        DOB: map.get("DOB"),
        DeliveryDate: map.get("DeliveryDate"),
        DeliveryNoteReceivedDate: map.get("DeliveryNoteReceivedDate"),
        MaintID: map.get("MaintID")
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
      if (data && data.data) {
        setInventoryStatus(data.data)
      }
    })
  }, [])

  useEffect(() => {
    API.listEquipType({ limit: 999, page: 1 }).then(({ data }) => {
      if (data && data.data) {
        setEquipTypes(data.data.filter(_ => {
          return _.Type !== 'EqServer'
        }))
      }
    })
  }, [])

  useEffect(() => {
    const inventoryList = [
      {
        id: '_ID', label: L('Ref. ID'), type: 'text',
        required: true, readOnly: false, value: "",
        error: _IDError, helperText: _IDHelperText
      },
      {
        id: 'UnitCode', label: L('New'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'AssetID', label: L('Asset No'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'ModelCode', label: L('Model Code'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'ModelDesc', label: L('Description'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'ClosetID', label: L('Closet ID'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'Rack', label: L('Cabinet'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'RLU', label: L('Pos. (U)'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'ItemOwner', label: L('Item Owner'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'Status', label: L('Status'), type: 'select',
        value: "", itemList: InventoryStatus,
        labelField: 'ServiceStatus', valueField: 'id',
      },
      {
        id: 'Remark', label: L('Remark'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'EquipType', label: L('EquipType'), type: 'select',
        value: "", itemList: EquipTypes,
        labelField: 'Type', valueField: 'id',
        required: true,
        error: EquipTypeError, helperText: EquipTypeHelperText
      },
      {
        id: 'UnitNo', label: L('Unit No'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'PortQty', label: L('Built-in Port'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'ReqNo', label: L('Req. Form'), type: 'text',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'DOB', label: L('DOB'), type: 'date',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'DeliveryDate', label: L('Delivery Date'), type: 'date',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'DeliveryNoteReceivedDate', label: L('Delivery Note Received Date'), type: 'date',
        required: false, readOnly: false, value: ""
      },
      {
        id: 'MaintID', label: L('MaintID'), type: 'text',
        required: false, readOnly: false, value: ""
      },
    ]
    setInventory(inventoryList)
    // eslint-disable-next-line
  }, [EquipTypes, InventoryStatus])

  useEffect(() => {
    const error = {
      _ID: {
        error: _IDError,
        helperText: _IDHelperText,
      },
      EquipType: {
        error: EquipTypeError,
        helperText: EquipTypeHelperText,
      },
    }
    setErrors(error)
    // eslint-disable-next-line
  }, [ _IDHelperText, EquipTypeHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    map.set(id, value)
  }

  const _IDCheck = async () => {
    const emptyCheck = checkEmpty("Ref. ID", map.get("_ID"))
    set_IDError(emptyCheck.error)
    set_IDHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, map.get("_ID"))
      set_IDError(error)
      set_IDHelperText(msg)
      return error
    }
    return emptyCheck.error
  }

  const EquipTypeCheck = async () => {
    const emptyCheck = checkEmpty("EquipType", map.get("EquipType"))
    setEquipTypeError(emptyCheck.error)
    setEquipTypeHelperText(emptyCheck.msg)
    return emptyCheck.error
  }

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {inventory}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
