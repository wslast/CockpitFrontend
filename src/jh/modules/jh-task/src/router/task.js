const taskManage = () => import('../pages/task/taskManage/index.vue');
const taskRecord = () => import('../pages/task/taskRecord/index.vue');
const excuteTask = () => import('../pages/task/excuteTask/index.vue');
export default [
	{
		path: '/task/taskManage',
		name: 'taskManage',
		meta: {
			title: '任务管理',
			icon: 'dashboard',
			path: ['定时任务', '任务管理'],
			noCache: true,
			affix: true,
		},
		component: taskManage,
	},
	{
		path: '/task/taskRecord',
		name: 'taskRecord',
		meta: {
			title: '执行记录',
			icon: 'dashboard',
			path: ['定时任务', '执行记录'],
			noCache: true,
			affix: true,
		},
		component: taskRecord,
	},
	{
		path: '/task/excuteTask',
		name: 'excuteTask',
		meta: {
			title: '运行中任务',
			icon: 'dashboard',
			path: ['定时任务', '运行中任务'],
			noCache: true,
			affix: true,
		},
		component: excuteTask,
	},
];
