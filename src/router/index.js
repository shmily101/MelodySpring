//路由的配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
//引入界面
import index from '../pages/index.vue'
import create from '../pages/create.vue'
import login from '../pages/login.vue'
import transcp from '../pages/transcp.vue'
import transmk from '../pages/transmk.vue'
import mine from '../pages/mine.vue'
import test from '../pages/test.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

//实例化VueRounter
const router = new VueRouter({
	//定义routes路由的集合，数组类型
	routes: [
		//单个路由均为对象类型，path代表的是路径，name是名称，component代表的是引入的组件
		{
			path: '/', 
			name: 'index',
			component: index,
		},
		{
			path: '/login',
			name: 'login',
			component: login,
		},
		{
			path: '/create',
			name: 'create',
			component: create,
		},
		{
			path: '/transcp',
			name: 'transcp',
			component: transcp,
		},
		{
			path: '/transmk',
			name: 'transmk',
			component: transmk,
		},
		{
			path: '/mine',
			name: 'mine',
			component: mine,
		},
		{
			path: '/test',
			name: 'test',
			component: test,
		},
	]
});

//抛出这个实例对象方便外部读取以及访问
export default router