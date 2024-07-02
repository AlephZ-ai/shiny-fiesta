import { Text } from '@/components/text'
import { PlusOutlined } from '@ant-design/icons'
import { useDroppable } from '@dnd-kit/core'
import { Badge, Button, Space } from 'antd'
import React from 'react'

const KanbanColumn = ({ children }: React.PropsWithChildren) => {
    const { isOver, setNodeRef, active } = useDroppable({
        id: '',
        data: ''
    })

    const count = 3
    const color = (count <= 3) ? 'cyan' : 'red'
    const description = 'Description'
    const title = 'Title'


  return (
    <div ref={setNodeRef} style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
        <div style={{ padding: '12px' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Space>
                    <Text ellipsis={{ tooltip: 'TITLE TO DO' }} size="xs" strong style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {title}
                    </Text>
                    {!!count && <Badge count={count} color={color}/>}
                </Space>  
                <Button shape='circle' icon={<PlusOutlined/>} size='small'/>
            </Space>
            {description}
        </div>
        <div style={{ flex: 1, overflowY: active ? 'unset' : 'scroll', border: '2px dashed transparent', borderColor: isOver ? '#000040' : 'transparent', borderRadius: '4px'}}>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default KanbanColumn