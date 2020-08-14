import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenant"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

const formTitle = 'Tenant Detail'
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

function Detail(props) {
  const { id } = useParams()
  const { onMount } = props
  const [ name, setName ] = useState('')
  const [ code, setCode ] = useState('')
  const [ managerGroup, setManagerGroup ] = useState('')
  const [ supporterGroup, setSupporterGroup ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  // 获取详情
  useEffect(() => {
    API.detail(id)
      .then(({ data }) => {
        if (data && data.data) {
          const { name, code, manager_group, supporter_group, createdAt, updatedAt } = data.data
          setName(name)
          setCode(code)
          setCreatedAt(createdAt)
          setUpdatedAt(updatedAt)
          if (manager_group && manager_group.name) {
            setManagerGroup(manager_group.name)
          }
          if (supporter_group && supporter_group.name) {
            setSupporterGroup(supporter_group.name)
          }
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'code', label: 'Code', type: 'text', disabled: true, readOnly: true, value: code },
      { id: 'name', label: 'Name', type: 'text', disabled: true, readOnly: true, value: name },
      { id: 'managerGroup', label: 'Mangager Group', type: 'text', disabled: true, readOnly: true, value: managerGroup },
      { id: 'supporterGroup', label: 'SupporterGroup', type: 'text', disabled: true, readOnly: true, value: supporterGroup },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ name, code, managerGroup, supporterGroup, createdAt, updatedAt ])

  return (
    <React.Fragment>
      <DetailPage
        formTitle = {formTitle}
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
