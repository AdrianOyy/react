import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

import DetailPage from "../../../../../components/DetailPage"
import UserApi from "../../../../../api/user"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}
const formTitle = 'User Profile Detail'

function Detail(props) {
  const { onMount } = props
  const { id } = useParams()
  const [ corpId, setCorpId ] = useState('')
  const [ alias, setAlias ] = useState('')
  const [ surname, setSurname ] = useState('')
  const [ givenname, setGivenname ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ displayname, setDisplayname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ proxyAddresses, setProxyAddresses ] = useState('')
  const [ cluster, setCluster ] = useState('')
  const [ hospital, setHospital ] = useState('')
  const [ department, setDepartment ] = useState('')
  const [ passwordLastSet, setPasswordLastSet ] = useState('')
  const [ UACCode, setUACCode ] = useState('')
  const [ UACDesc, setUACDesc ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdatedAt ] = useState('')
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    onMount('detail')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    UserApi.detail(id).then(({ data }) => {
      const {
        corpId, alias, surname, givenname, title, displayname,
        email, proxyAddresses, cluster, hospital, department,
        passwordLastSet, UACCode, UACDesc, createdAt, updatedAt
      } = data.data
      setCorpId(corpId)
      setAlias(alias)
      setSurname(surname)
      setGivenname(givenname)
      setTitle(title)
      setDisplayname(displayname)
      setEmail(email)
      setProxyAddresses(proxyAddresses)
      setCluster(cluster)
      setHospital(hospital)
      setDepartment(department)
      setPasswordLastSet(passwordLastSet)
      setUACCode(UACCode)
      setUACDesc(UACDesc)
      setCreatedAt(createdAt)
      setUpdatedAt(updatedAt)
    })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'corpId', label: 'CORP ID', type: 'text', disabled: true, readOnly: true, value: corpId },
      { id: 'alias', label: 'Alias', type: 'text', disabled: true, readOnly: true, value: alias },
      { id: 'surname', label: 'Surname', type: 'text', disabled: true, readOnly: true, value: surname },
      { id: 'givenname', label: 'Given Name', type: 'text', disabled: true, readOnly: true, value: givenname },
      { id: 'title', label: 'Title', type: 'text', disabled: true, readOnly: true, value: title },
      { id: 'displayname', label: 'Display Name', type: 'text', disabled: true, readOnly: true, value: displayname },
      { id: 'email', label: 'Email', type: 'text', disabled: true, readOnly: true, value: email },
      { id: 'proxyAddresses', label: 'Proxy Addresses', type: 'text', disabled: true, readOnly: true, value: proxyAddresses },
      { id: 'cluster', label: 'Cluster', type: 'text', disabled: true, readOnly: true, value: cluster },
      { id: 'hospital', label: 'Hospital', type: 'text', disabled: true, readOnly: true, value: hospital },
      { id: 'department', label: 'Department', type: 'text', disabled: true, readOnly: true, value: department },
      { id: 'passwordLastSet', label: 'Password Last Set', type: 'text', disabled: true, readOnly: true, value: passwordLastSet },
      { id: 'UACCode', label: 'UAC Code', type: 'text', disabled: true, readOnly: true, value: UACCode },
      { id: 'UACDesc', label: 'UAC Desc', type: 'text', disabled: true, readOnly: true, value: UACDesc },
      { id: 'createdAt', label: 'Created At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [ corpId, alias, surname, givenname, title, displayname,
    email, proxyAddresses, cluster, hospital, department,
    passwordLastSet, UACCode, UACDesc, createdAt, updatedAt ])

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case 'displayname':
        setDisplayname(value)
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
        formFieldList = {formFieldList}
      />
    </React.Fragment>
  )
}

export default Detail
