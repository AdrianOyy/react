import React, { useState } from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

import {
  Box,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)`
  ${spacing};

  overflow: visible;
`

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 200px;
  }
`

const BubbleWrapper = styled.div`
  .ql-editor {
    padding: 0;

    &.ql-blank:before {
      left: 0;
    }
  }

  .ql-tooltip {
    z-index: 9999;
  }
`

function Quill() {
  const [ value, setValue ] = useState('')

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Quill')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('QuillDes')}
        </Typography>
        <Box mt={3}>
          <QuillWrapper>
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Type something.." />
          </QuillWrapper>
        </Box>
      </CardContent>
    </Card>
  )
}

function Bubble() {
  const [ value, setValue ] = useState('')

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Bubble')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('BubbleDes')}
        </Typography>
        <Box mt={3}>
          <BubbleWrapper>
            <ReactQuill theme="bubble" value={value} onChange={setValue} placeholder="Compose an epic..." />
          </BubbleWrapper>
        </Box>
      </CardContent>
    </Card>
  )
}

function Editors() {
  return (
    <React.Fragment>
      <Helmet title={L('Editors')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Editors')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Forms')}
        </Link>
        <Typography>{L('Editors')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Quill />
          <Bubble />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Editors
