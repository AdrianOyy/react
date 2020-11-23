import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/inventoryLifeCycle"
import { L } from '../../../../../utils/lang'
import CommonTip from "../../../../../components/CommonTip"
import { useHistory } from 'react-router-dom'
import { checkEmpty, getCheckExist } from "../../untils/LifeCycleFieldCheck"
import { map2object } from "../../../../../utils/map2object"

function Create(props) {
  const { map } = props
  const history = useHistory()
  const [ _IDError, set_IDError ] = useState(false)
  const [ _IDHelperText, set_IDHelperText ] = useState('')
  const [ LifeCycles, setLifeCycles ] = useState([])
  const [ saving, setSaving ] = useState(false)
  const [ errors, setErrors ] = useState({})

  const handleClick = async () => {
    const _IDError = await _IDCheck()
    if (_IDError || saving) return
    setSaving(true)
    API.create(
      map2object(map)
    )
      .then(() => {
        CommonTip.success(L('Success'))
        history.push({ pathname: '/resources/life-cycle' })
      })
      .catch(() => {
        setSaving(false)
      })
  }

  useEffect(() => {
    API.listInventorys().then(({ data }) => {
      if (data && data.data) {
        return data.data
      } else {
        return []
      }
    }).then(returnObj => {
      const lifeCycleList = [
        {
          id: '_ID', label: L('Ref. ID'), type: 'text',
          required: true, readOnly: false, value: "",
          error: _IDError, helperText: _IDHelperText
        },
        {
          id: 'InventoryID', label: L('Inventory'), type: 'select',
          value: "", itemList: returnObj,
          labelField: '_ID', valueField: '_ID',
        },
        {
          id: 'AssetID', label: L('Asset No'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'RecordCreatedOn', label: L('Record Created On'), type: 'date',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'ActionType', label: L('Action Type'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'ActionDetails', label: L('Action Details'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'SuccessorInventoryID', label: L('Successor Inventory ID'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'ActionDate', label: L('Action Date'), type: 'date',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'RespStaff', label: L('Resp Staff'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'RespStaffDisplayName', label: L('Resp Staff Display Name'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'Reason', label: L('Reason'), type: 'text',
          required: false, readOnly: false, value: ""
        },
        {
          id: 'CaseRef', label: L('Case Ref'), type: 'text',
          required: false, readOnly: false, value: ""
        },
      ]
      setLifeCycles(lifeCycleList)
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const errors = {
      _ID: {
        error: _IDError,
        helperText: _IDHelperText,
      }
    }
    setErrors(errors)
    // eslint-disable-next-line
  }, [ _IDHelperText ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    map.set(id, value)
  }

  const _IDCheck = async () => {
    const emptyCheck = checkEmpty("Ref. ID", map.get("_ID"))
    set_IDError(emptyCheck.error)
    set_IDHelperText(emptyCheck.msg)
    if (!emptyCheck.error) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(map.get("_ID"))) {
        set_IDError(true)
        set_IDHelperText(L('Only accept positive integer'))
        emptyCheck.error = true
      }
    }
    if (!emptyCheck.error) {
      const checkExist = getCheckExist()
      const { error, msg } = await checkExist(0, map.get("_ID"))
      set_IDError(error)
      set_IDHelperText(msg)
      emptyCheck.error = error
    }

    return emptyCheck.error
  }

  return (
    <React.Fragment>
      <DetailPage
        onFormFieldChange = {onFormFieldChange}
        formFieldList = {LifeCycles}
        errorFieldList = {errors}
        showBtn ={true}
        onBtnClick = {handleClick}
      />
    </React.Fragment>
  )
}

export default Create
