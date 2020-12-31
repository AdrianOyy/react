import React, { useEffect, useState } from 'react'
import { DatePicker } from "@material-ui/pickers"


function DateRange(props) {
  const {
    disableFuture,
    onChange,
    label,
    value,
  } = props
  const [ startDate, setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)
  useEffect(() => {
    onChange && onChange({ startDate, endDate })
    // eslint-disable-next-line
  }, [ startDate, endDate ])
  useEffect(() => {
    if (!value) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [ value ])
  const onStartDateChange = (e) => {
    setStartDate(e)
  }
  const onEndDateChange = (e) => {
    setEndDate(e)
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '8ch',
        justifyContent: "space-between",
        height: '48px',
        paddingTop: '16px',
      }}
    >
      <label>{ label ? label : '' }</label>
      <div style={{ marginLeft: '2rem' }}>
        <DatePicker
          placeholder={'From'}
          clearable
          disableFuture={disableFuture ? disableFuture : false}
          format={'dd-MMM-yyyy'}
          value={startDate}
          onChange={(e) => onStartDateChange(e)}
          style={{ width: '110px' }}
        />
        <DatePicker
          placeholder={'Until'}
          clearable
          disableFuture
          format={'dd-MMM-yyyy'}
          value={endDate}
          onChange={(e) => onEndDateChange(e)}
          style={{ marginLeft: '2em', width: '110px' }}
        />
      </div>
    </div>
  )
}

export default DateRange
