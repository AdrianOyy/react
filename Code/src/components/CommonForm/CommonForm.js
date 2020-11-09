import React from "react"

import {
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
  Grid,
} from "@material-ui/core"

// import CommonSelect from "../CommonSelect"

import { spacing } from "@material-ui/system"
import styled from "styled-components"
import FormInput from "../FormInput"
import FormSelect from "../FormSelect"
import FormDate from "../FormDate"
import { makeStyles } from "@material-ui/core/styles"

let Card = styled(MuiCard)(spacing)
Card = styled(Card)`border-radius: 1em; width:1200px;margin:0 auto;`
let Paper = styled(MuiPaper)(spacing)
Paper = styled(Paper)`margin-top:20px`

const Button = styled(MuiButton)(spacing)

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
  },
  nonegrid: {
    width: '50%',
    height: '10vh',
    display: 'none',
    marginBottom: '2vh',
  },
  allgrid: {
    width: '100%',
    minHeight: '10vh',
    marginBottom: '4.5vh',
  },
  allnonegrid: {
    width: '100%',
    minHeight: '20vh',
    marginBottom: '4.5vh',
    display: 'none',
  },
}))

function CommonForm(props) {
  const {
    formTitle,
    titleLevel,
    formFieldList,
    onFormFieldChange,
    showBtn,
    onBtnClick,
    onFormFieldBlur,
    spacing,
  } = props
  const classes = useStyles()
  const handleDataChange = (e) => {
    const data = {
      target: {
        value: e.value
      }
    }
    console.log(e)
    onFormFieldChange(data, e.id)
  }
  const handleDataBlur = (value, id) => {
    const data = {
      target: {
        value
      }
    }
    onFormFieldBlur(data, id)
  }
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant={titleLevel ? `h${titleLevel}` : 'h2'} gutterBottom>
          { formTitle }
        </Typography>
        <Paper mt={0}>
          <form noValidate autoComplete="off">
            <Grid container spacing={spacing ? spacing : 3}>
              {
                formFieldList && formFieldList.map((field, i) => {
                  console.log(field)
                  switch (field.type) {
                    case 'date':
                      return (
                        <div
                          className={classes.grid}
                          key={field.id + '_' + i}
                          id={field.id + '_div'}
                        >
                          <FormDate
                            id={field.id.toString()}
                            label={field.label}
                            error={field.error || false}
                            required={field.required || false}
                            helperText={field.helperText || ''}
                            defaultValue={field.value === '' ? null : field.value}
                            disabled={field.readOnly}
                            onChange={handleDataChange}
                          />
                        </div>
                      )
                    case 'select':
                      return (
                        <div
                          className={classes.grid}
                          key={field.id + '_' + i}
                          id={field.id + '_div'}
                        >
                          <FormSelect
                            id={field.id.toString()}
                            label={field.label}
                            error={field.error || false}
                            helperText={field.helperText || ''}
                            defaultValue={field.value || ''}
                            required={field.required || false}
                            disabled={field.disabled || false}
                            itemList={field.itemList}
                            labelField={field.labelField}
                            valueField={field.valueField}
                            onChange={handleDataChange}
                          />
                        </div>
                      )
                    default:
                      return (
                        <div
                          className={classes.grid}
                          key={field.id + '_' + i}
                          id={field.id + '_div'}
                        >
                          <FormInput
                            id={field.id.toString()}
                            onBur={handleDataChange}
                            disabled={field.disabled || false}
                            defaultValue={field.value === '' ? null : field.value}
                            label={field.label}
                            required={field.required}
                          />
                        </div>
                      )
                  }
                })
              }
            </Grid>
          </form>
        </Paper>
        {
          showBtn &&   (
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{ marginTop: '5ch' }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => onBtnClick()}>
                Save
              </Button>
            </Grid>
          )
        }
      </CardContent>
    </Card>
  )
}

export default CommonForm
