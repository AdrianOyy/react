import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import {
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Button = styled(MuiButton)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`

function SimpleCard() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {L('Word of the Day')}
        </Typography>
        <Typography variant="h5" component="h2">
          {L('benevolent')}
        </Typography>
        <Typography color="textSecondary">{L('adjective')}</Typography>
        <Typography component="p">
          {L('well meaning and kindly.')}
          <br />
          {L('a benevolent smile')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{L('Learn More')}</Button>
      </CardActions>
    </Card>
  )
}

function MediaCard() {
  return (
    <Card mb={6}>
      <CardActionArea>
        <CardMedia
          image="/static/img/unsplash/unsplash-1.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {L('Lizard')}
          </Typography>
          <Typography component="p">
            {L('LizardDes')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {L('Share')}
        </Button>
        <Button size="small" color="primary">
          {L('Learn More')}
        </Button>
      </CardActions>
    </Card>
  )
}

function Cards() {
  return (
    <React.Fragment>
      <Helmet title={L('Cards')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Cards')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Cards')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MediaCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SimpleCard />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Cards
