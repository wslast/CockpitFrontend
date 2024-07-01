const roles = () => import('../pages/auth/roles/index.vue');
const user = () => import('../pages/auth/user/index.vue');
const menu = () => import('../pages/auth/menu/index.vue');
const funcs = () => import('../pages/auth/funcs/index.vue');
const permission = () => import('../pages/auth/permission/index.vue');
const district = () => import('../pages/auth/district/index.vue');
const organ = () => import('../pages/auth/organ/index.vue');
const organview = () => import('../pages/auth/organview/index.vue');
const dutyList = () => import('../pages/auth/duty/dutyList.vue');
const modify = () => import('../pages/auth/modify/index.vue');

const systemParSet = () => import('../pages/auth/system/systemParSet.vue');
const changedata = () => import('../pages/auth/changedata/index.vue');
const organUser = () => import('../pages/auth/organUser/index.vue');

export default [
	{
		path: '/auth/role',
		name: 'roles',
		meta: {
			title: '角色管理',
			icon: 'dashboard',
			path: ['用户权限', '角色管理'],
			noCache: true,
			affix: true,
		},
		component: roles,
	},
	{
		path: '/user/mod-password',
		name: 'modify',
		meta: {
			title: '修改密码',
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: modify,
	},
	{
		path: '/user/mod-user',
		name: 'changedata',
		meta: {
			title: '修改资料',
			path: ['用户中心', '修改资料'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: changedata,
	},
	{
		path: '/auth/user',
		name: 'user',
		meta: {
			title: '用户管理',
			path: ['用户权限', '用户管理'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: user,
	},
	{
		path: '/auth/menu',
		name: 'menu',
		meta: {
			title: '菜单管理',
			path: ['用户权限', '菜单管理'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: menu,
	},
	{
		path: '/auth/funcs',
		name: 'funcs',
		meta: {
			title: '操作管理',
			path: ['用户权限', '操作管理'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: funcs,
	},
	{
		path: '/auth/dutyList',
		name: 'dutyList',
		meta: {
			title: '职务管理',
			path: ['用户权限', '职务管理'],
			icon: 'dashboard',
			noCache: true, //是否缓存
			affix: true, //是否固定图钉
		},
		component: dutyList,
	},
	{
		path: '/auth/systemParSet',
		name: 'systemParSet',
		meta: {
			title: '参数设置',
			icon: 'dashboard',
			noCache: true, //是否缓存
			affix: true, //是否固定图钉
		},
		component: systemParSet,
	},

	{
		path: '/auth/permission',
		name: 'permission',
		meta: {
			title: '权限管理',
			path: ['用户权限', '权限管理'],
			icon: 'dashboard',
			noCache: true, //是否缓存
			affix: true, //是否固定图钉
		},
		component: permission,
	},
	{
		path: '/auth/district',
		name: 'district',
		meta: {
			title: '区域授权',
			path: ['用户权限', '区域授权'],
			icon: 'dashboard',
			noCache: true, //是否缓存
			affix: true, //是否固定图钉
		},
		component: district,
	},
	{
		path: '/auth/organ',
		name: 'organ',
		meta: {
			title: '组织结构',
			path: ['用户权限', '组织结构'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: organ,
	},
	{
		path: '/auth/organview',
		name: 'organview',
		meta: {
			title: '机构一览',
			path: ['用户权限', '机构一览'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: organview,
	},
	{
		path: '/auth/organUser',
		name: 'organUser',
		meta: {
			title: '机构用户管理',
			path: ['用户权限', '机构用户管理'],
			icon: 'dashboard',
			noCache: true,
			affix: true,
		},
		component: organUser,
	},
];
