import React, { useState } from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import {
  Avatar,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Chip as MuiChip,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core"

import {
  Done as DoneIcon,
  Face as FaceIcon,
  TagFaces as TagFacesIcon
} from "@material-ui/icons"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Chip = styled(MuiChip)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const DefaultChips = () => {
  const handleDelete = () => {
    alert(L('You clicked the delete icon.'))
  }

  const handleClick = () => {
    alert(L('You clicked the chip.'))
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Default Chips')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('defaultChipsDes')}
        </Typography>
        <div>
          <Chip label={L('Basic Chip')} m={1} />
          <Chip
            avatar={<Avatar>{L('MB')}</Avatar>}
            label={L('Clickable Chip')}
            onClick={handleClick}
            m={1}
          />
          <Chip
            avatar={<Avatar alt="Natacha" src="/static/img/avatars/avatar-1.jpg" />}
            label={L('Deletable Chip')}
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={L('Clickable Deletable Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Clickable Deletable Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
          />
          <Chip
            label={L('Custom delete icon Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            label={L('Clickable Link Chip')}
            component="a"
            href="#chip"
            clickable
            m={1}
          />
          <Chip
            avatar={<Avatar>{L('MB')}</Avatar>}
            label={L('Primary Clickable Chip')}
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Primary Clickable Chip')}
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
          />
          <Chip
            label={L('Deletable Primary Chip')}
            onDelete={handleDelete}
            color="primary"
            m={1}
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={L('Deletable Secondary Chip')}
            onDelete={handleDelete}
            color="secondary"
            m={1}
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Deletable Secondary Chip')}
            onDelete={handleDelete}
            color="secondary"
            m={1}
          />
        </div>
      </CardContent>
    </Card>
  )
}

const OutlinedChips = () => {
  const handleDelete = () => {
    alert(L('You clicked the delete icon.'))
  }

  const handleClick = () => {
    alert(L('You clicked the chip.'))
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Outlined Chips')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('outlinedChipsDes')}
        </Typography>
        <div>
          <Chip label={L('Basic Chip')} m={1} />
          <Chip
            avatar={<Avatar>{L('MB')}</Avatar>}
            label={L('Clickable Chip')}
            onClick={handleClick}
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={<Avatar alt={L('Natacha')} src="/static/img/avatars/avatar-1.jpg" />}
            label={L('Deletable Chip')}
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={L('Clickable Deletable Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Clickable Deletable Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            m={1}
            variant="outlined"
          />
          <Chip
            label={L('Custom delete icon Chip')}
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            label={L('Clickable Link Chip')}
            component="a"
            href="#chip"
            clickable
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={<Avatar>{L('MB')}</Avatar>}
            label={L('Primary Clickable Chip')}
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Primary Clickable Chip')}
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
            m={1}
            variant="outlined"
          />
          <Chip
            label={L('Deletable Primary Chip')}
            onDelete={handleDelete}
            color="primary"
            m={1}
            variant="outlined"
          />
          <Chip
            avatar={
              <Avatar>
                <FaceIcon />
              </Avatar>
            }
            label={L('Deletable Secondary Chip')}
            onDelete={handleDelete}
            color="secondary"
            m={1}
            variant="outlined"
          />
          <Chip
            icon={<FaceIcon />}
            label={L('Deletable Secondary Chip')}
            onDelete={handleDelete}
            color="secondary"
            m={1}
            variant="outlined"
          />
        </div>
      </CardContent>
    </Card>
  )
}

const ChipArray = () => {
  const [ chipData, setChipData ] = useState([
    { key: 0, label: L("Angular") },
    { key: 1, label: L("jQuery") },
    { key: 2, label: L("Polymer") },
    { key: 3, label: L("React") },
    { key: 4, label: L("Vue.js") }
  ])

  const handleDelete = data => () => {
    if (data.label === L("React")) {
      alert(L('whyDelReact')) // eslint-disable-line no-alert
      return
    }

    setChipData(chipData.filter(item => item.key !== data.key))
  }

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Chip array')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('chipArrayDes')}
        </Typography>
        <div>
          {chipData.map(data => {
            let icon = null

            if (data.label === L("React")) {
              icon = <TagFacesIcon />
            }

            return (
              <Chip
                key={data.key}
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
                m={1}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function Chips() {
  return (
    <React.Fragment>
      <Helmet title={L('Chips')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Chips')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Chips')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <DefaultChips />
          <ChipArray />
        </Grid>
        <Grid item xs={12} md={6}>
          <OutlinedChips />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Chips
