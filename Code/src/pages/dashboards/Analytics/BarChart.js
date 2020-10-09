import React from "react"
import styled, { withTheme } from "styled-components"
import { L } from '../../../utils/lang'

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

import "../../../vendor/roundedBarCharts"
import { Bar } from "react-chartjs-2"

import { MoreVertical } from "react-feather"

const Card = styled(MuiCard)(spacing)

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`

const ChartWrapper = styled.div`
  height: 253px;
  width: 100%;
`

const BarChart = ({ theme }) => {
  const data = {
    labels: [
      L("Jan"),
      L("Feb"),
      L("Mar"),
      L("Apr"),
      L("May"),
      L("Jun"),
      L("Jul"),
      L("Aug"),
      L("Sep"),
      L("Oct"),
      L("Nov"),
      L("Dec")
    ],
    datasets: [
      {
        label: L('Mobile'),
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        hoverBackgroundColor: theme.palette.primary.main,
        hoverBorderColor: theme.palette.primary.main,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.625,
        categoryPercentage: 0.5
      },
      {
        label: L('Desktop'),
        backgroundColor: theme.palette.grey[200],
        borderColor: theme.palette.grey[200],
        hoverBackgroundColor: theme.palette.grey[200],
        hoverBorderColor: theme.palette.grey[200],
        data: [ 69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68 ],
        barPercentage: 0.625,
        categoryPercentage: 0.5
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    cornerRadius: 2,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          stacked: false,
          ticks: {
            stepSize: 20
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: "transparent"
          }
        }
      ]
    }
  }

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title={L('Mobile / Desktop')}
      />
      <CardContent>
        <ChartWrapper>
          <Bar data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  )
}

export default withTheme(BarChart)
