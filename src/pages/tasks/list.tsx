import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
import KanbanColumn from '@/components/tasks/kanban/column'
import KanbanItem from '@/components/tasks/kanban/item'
import { APPOINTMENTS_QUERY, APPOINTMENT_STAGES_SELECT_QUERY } from '@/graphql/queries'
import { TaskStage } from '@/graphql/schema.types'
import { useList } from '@refinedev/core'
import React from 'react'

const List = () => {
    const { data: stages, isLoading: isLoadingStages } = useList({
        resource: 'taskStages',
        filters: [{
            field: 'title',
            operator: 'in',
            value: ['TODO', 'IN_PROGRESS', 'IN REVIEW', 'DONE']
        }],
        sorters: [{
            field: 'createdAt', order: 'asc'
        }],
        meta: {
            gqlQuery: APPOINTMENT_STAGES_SELECT_QUERY
        }
    }) 
    const { data: tasks, isLoading: isLoadingTasks } = useList({
        resource: 'tasks',
        sorters: [{
            field: 'dueDate', order: 'asc'
        }],
        pagination: {
            mode: 'off'
        },
        queryOptions: {
            enabled: !!stages,
        },
        meta: {
            gqlQuery: APPOINTMENTS_QUERY
        }
    })
    const taskStages = React.useMemo(() => {
        if (!tasks?.data || !stages?.data) return {unassignedStage: [], stages: []};

        const unassignedStage = tasks.data.filter((task) => task.stageId === null)

        const grouped: TaskStage[] = stages.data.map((stage) => ({
            ...stages,
            tasks: tasks.data.filter((task) => task.stageId.toString())
        }))

        return {
            unassignedStage,
            columns: grouped
        }

    }, [stages, tasks])


  return (
    <>
        <KanbanBoardContainer>
            <KanbanBoard>

            </KanbanBoard>

            <KanbanColumn>
                <KanbanItem>
                    This is my first to do
                </KanbanItem>
            </KanbanColumn>
            <KanbanColumn>

            </KanbanColumn>
        </KanbanBoardContainer>
    </>
  )
}

export default List