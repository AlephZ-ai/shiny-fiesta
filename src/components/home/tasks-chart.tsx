import { BookOutlined, ShopOutlined, TabletOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_APPOINTMENTS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardAppointmentsChartQuery } from '@/graphql/types'

const TasksChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardAppointmentsChartQuery>>({
    resource: 'dealStages',
    filters: [{
      field: 'title', operator: 'in', value: ['WON', 'LOST']
    }],
    meta: {
      gqlQuery: DASHBOARD_APPOINTMENTS_CHART_QUERY
    }
  });

  const dealData = React.useMemo(() => { // This expensive computation will only run again if items changes
    return mapDealsData(data?.data);
  }, [data?.data])

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) / 1000}k`
        }
      }
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `$${Math.round(Number(data.value) / 1000)}k`
        }
      }
    }
  }

  return (
    <Card style={{ height: '435px', width: '100%' }} styles={{ header: { padding: '8px 16px'}, body: { padding: '24px 24px 0 24px'}}} title={
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BookOutlined />
        <Text size='sm' style={{ marginLeft: '0.5rem' }}>Service Completion Performance</Text>
      </div>
    }>
        <Area {...config} height={325} />
    </Card>
  )
}

export default TasksChart