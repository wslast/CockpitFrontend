/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description: 
 */
import utils from '@/functions/utils'
export default {
    state: {
        routes: [{
            path: "/",
            query: {},
            name: "首页"
        }]
    },
    mutations: {
        //添加单个路由
        pushRoutes(state, v) {
            let path = {
                path: v.path ? v.path : v.redirect,
                query: v.query,
                name: v.meta.title
            }
            if(!state.routes.includes(path)) {
                return state.routes.push(path);
            }
        },
        //删除单个路由
        deleteRoutes(state, v) {
            return state.routes.splice(v,1);
        },
        //添加完整路由
        addRoutes(state, v) {
            if(v && v.length > 0) {
                let routes = v.map(item => {
                    let obj = {
                        path: item.path ? item.path : item.redirect,
                        query: item.query,
                        name: item.meta.path
                    }
                    return obj;
                })
                //直接数组去重 将相同路由舍弃
                let newRoute = [routes[0]];
                for (const iterator of routes) {
                    for (const route of newRoute) {
                        let isNew = true;
                        if(iterator.path === route.path) {
                            route.query = route.query ? route.query : iterator.query;
                            route.name = route.name ? route.name : iterator.name;
                            isNew = false;
                        }
                        if(isNew) {
                            newRoute.push(iterator);
                        }
                    }
                }
                let dealTitle = [];
                //判断假如title是数组 添加一空路由
                for (let iterator of newRoute) {
                    if(utils.isArray(iterator.name)) {
                        for (let i = 0; i < iterator.name.length; i++) {
                            if(i === iterator.name.length - 1) {
                                let realRoute = JSON.parse(JSON.stringify(iterator));
                                realRoute.name = iterator.name[iterator.name.length-1];
                                dealTitle.push(realRoute);
                            }else {
                                let readOnlyRoute = JSON.parse(JSON.stringify(iterator));
                                readOnlyRoute.name = iterator.name[i];
                                readOnlyRoute.path = "";
                                dealTitle.push(readOnlyRoute);
                            }
                        }
                    }else {
                        dealTitle.push(iterator);
                    }
                }
                return state.routes = dealTitle;
            }
        },
        //重置整个路由
        resetRoutes(state, v) {
            return state.routes = [{
                path: "/",
                query: {},
                name: "首页"
            }]
        },
    }
}