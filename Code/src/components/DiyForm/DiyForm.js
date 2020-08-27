import React from "react"
import {
  Paper as MyPaper
} from "@material-ui/core"
import BootstrapInput from "../BootstrapInput/BootstrapInput"
import { withStyles } from "@material-ui/core/styles"
import InputBase from "@material-ui/core/InputBase"

const Paper = withStyles((theme) => ({
  root: {
    padding: '5vh 2vw 5vh 5vw',
    minHeight: '60vh',
  },
}))(MyPaper)

export default function DiyForm(props) {

  return (
    <React.Fragment>
      <Paper elevation={1}>
        <BootstrapInput label={'test'}/>
      </Paper>
    </React.Fragment>
  )
}
