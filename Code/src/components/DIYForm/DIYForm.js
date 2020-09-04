import React, { useEffect, useState } from "react"
import {
  Typography,
  Divider as MuiDivider,
} from "@material-ui/core"
import {
  makeStyles,
} from "@material-ui/core/styles"
import HAInput from "../HAInput"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import HASelect from "../HASelect/HASelect"
import HADatePicker from "../HADatePicker/HADatePicker"


const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '6vh'
  },
  grid: {
    width: '50%',
    height: '10vh',
    marginBottom: '2vh',
  }
}))


const Divider = styled(MuiDivider)(spacing)

export default function DIYForm(props) {
  const {
    dataList,
    onChange,
    titleLevel,
    formTitle,
    hideTitle,
    defaultValues,
  } = props

  const classes = useStyles()


  return (
    <React.Fragment>
      {
        !hideTitle ? (
          <React.Fragment>
            <Typography
              variant={titleLevel ? `h${titleLevel}` : 'h2'}
              gutterBottom
              style={{ userSelect: "none", msUserSelect: "none" }}
            >
              { formTitle }
            </Typography>
            <Divider my={6} />
          </React.Fragment>
        ) : null
      }
      <div className={classes.flex}>
        {
          dataList && dataList.map((el, i) => {
            switch (el.type) {
              case 'select':
                return el.showOnRequest ? (
                  <div
                    className={classes.grid}
                    key={el.fieldName + '_' + i}
                  >
                    <HASelect
                      id={el.fieldName}
                      defaultValue={defaultValues ? defaultValues[el.fieldName] : null}
                      onChange={onChange}
                      label={el.fieldDisplayName}
                      valueField={el.valueField}
                      labelField={el.labelField}
                      required={el.required}
                      itemList={el.itemList}
                    />
                  </div>
                ) : null
              case 'date':
                return el.showOnRequest ? (
                  <div
                    className={classes.grid}
                    key={el.fieldName + '_' + i}
                  >
                    <HADatePicker
                      id={el.fieldName}
                      onChange={onChange}
                      defaultValue={defaultValues ? defaultValues[el.fieldName] : null}
                      label={el.fieldDisplayName}
                      required={el.required}
                    />
                  </div>
                ) : null
              default:
                return el.showOnRequest ? (
                  <div
                    className={classes.grid}
                    key={el.fieldName + '_' + i}
                  >
                    <HAInput
                      id={el.fieldName}
                      onBlur={onChange}
                      defaultValue={defaultValues ? defaultValues[el.fieldName] : null}
                      label={el.fieldDisplayName}
                      required={el.required}
                    />
                  </div>
                ) : null
            }
          })
        }
      </div>
    </React.Fragment>
  )
}
