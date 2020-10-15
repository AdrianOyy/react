import React, { useEffect, useState } from 'react'

import DetailPage from "../../../../../components/DetailPage"
import API from "../../../../../api/tenant"
import { useParams } from "react-router-dom"
import { L } from '../../../../../utils/lang'
import dayjs from "dayjs"

const formTitle = 'Detail'
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('DD-MMM-YYYY HH:mm')
}

function Detail(props) {
  const { id } = useParams()
  const { onMount } = props
  const [ name, setName ] = useState('')
  const [ code, setCode ] = useState('')
  const [ managerGroup, setManagerGroup ] = useState('')
  const [ supporterGroup, setSupporterGroup ] = useState('')
  const [ group, setGroup ] = useState('')
  const [ justification, setjustification ] = useState('')
  const [ budget_type, setbudget_type ] = useState('')
  const [ project_owner, setproject_owner ] = useState('')
  const [ contact_person, setcontact_person ] = useState('')
  const [ project_estimation, setproject_estimation ] = useState('')
  const [ methodology_text, setmethodology_text ] = useState('')
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
          const {
            name, code, manager_group, supporter_group, group,
            justification,
            budget_type, project_owner, contact_person,
            project_estimation, methodology_text,
            createdAt, updatedAt
          } = data.data
          setName(name)
          setCode(code)
          setjustification(justification)
          setbudget_type(budget_type)
          setproject_owner(project_owner)
          setcontact_person(contact_person)
          setproject_estimation(project_estimation)
          setmethodology_text(methodology_text)
          setCreatedAt(createdAt)
          setUpdatedAt(updatedAt)
          if (manager_group && manager_group.name) {
            setManagerGroup(manager_group.name)
          }
          if (supporter_group && supporter_group.name) {
            setSupporterGroup(supporter_group.name)
          }
          if (group && group.name) {
            setGroup(group.name)
          }
        }
      })
  }, [ id ])

  useEffect(() => {
    const list = [
      { id: 'code', label: L('Code'), type: 'text', disabled: true, readOnly: true, value: code },
      { id: 'name', label: L('Name'), type: 'text', disabled: true, readOnly: true, value: name },
      { id: 'managerGroup', label: L('Mangager Group'), type: 'text', disabled: true, readOnly: true, value: managerGroup },
      { id: 'supporterGroup', label: L('SupporterGroup'), type: 'text', disabled: true, readOnly: true, value: supporterGroup },
      { id: 'group', label: L('Group'), type: 'text', disabled: true, readOnly: true, value: group },
      { id: 'justification', label: L('Justification'), type: 'text', disabled: true, readOnly: true, value: justification },
      { id: 'budget_type', label: L('Budget Type'), type: 'text', disabled: true, readOnly: true, value: budget_type },
      { id: 'project_owner', label: L('Project Owner'), type: 'text', disabled: true, readOnly: true, value: project_owner },
      { id: 'contact_person', label: L('Contact Person'), type: 'text', disabled: true, readOnly: true, value: contact_person },
      { id: 'project_estimation', label: L('Project Estimation'), type: 'text', disabled: true, readOnly: true, value: project_estimation },
      { id: 'methodology_text', label: L('Methodology Text'), type: 'text', disabled: true, readOnly: true, value: methodology_text },
      { id: 'createdAt', label: L('Created At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(createdAt) },
      { id: 'updatedAt', label: L('Updated At'), type: 'text', disabled: true, readOnly: true, value: formatDateTime(updatedAt) },
    ]
    setFormFieldList(list)
  }, [
    name, code, managerGroup,
    justification,
    budget_type, project_owner, contact_person,
    project_estimation, methodology_text,
    supporterGroup, group, createdAt, updatedAt ])

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
