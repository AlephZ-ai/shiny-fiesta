import { CalendarOutlined, DashboardOutlined, ProjectOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [ // Path definitions that will help refine the available actions for our resources at specific paths. Actions are basically paths that u can use to perform crud operations under a single name
    {
        name: 'Dashboard',
        list: '/',
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />
        } // Store additional meta information about the resource
    },

    {
        name: 'appointments',
        list: '/appointments',
        show: 'appointments/:id',
        create: 'appointments/new',
        edit: '/appointments/edit/:id',
        meta: {
            label: 'Appointments',
            icon: <CalendarOutlined />
        }
    },

    {
        name: 'tasks',
        list: '/tasks',
        show: 'tasks/:id',
        create: 'tasks/new',
        edit: '/tasks/edit/:id',
        meta: {
            label: 'Tasks',
            icon: <ProjectOutlined />
        }
    },

]