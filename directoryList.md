|-- ODIN7CJ-PC-WEB
    |-- .babelrc
    |-- .editorconfig
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- .postcssrc.js
    |-- debug.log
    |-- directoryList.md
    |-- index.html
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- build       打包配置信息
    |-- config      环境变量
    |-- src
    |   |-- App.vue     项目入口
    |   |-- config.js       项目配置文件
    |   |-- main.js       启动入口
    |   |-- assets      静态文件目录
    |   |-- components      项目组件存放位置
    |   |   |-- index.js
    |   |-- data        接口配置文件
    |   |   |-- fetchType.js        接口类型定义
    |   |   |-- request.js      请求拦截处理
    |   |   |-- api      接口文件
    |   |-- functions       工具类
    |   |-- jh       框架功能文件（尽量不要修改！）
    |   |   |-- components
    |   |   |   |-- 404.vue
    |   |   |   |-- anchor
    |   |   |   |   |-- index.vue
    |   |   |   |-- baseDialog
    |   |   |   |   |-- index.vue
    |   |   |   |   |-- pageDialog.vue
    |   |   |   |   |-- searchDialog.vue
    |   |   |   |   |-- selectColumnDialog.vue
    |   |   |   |-- checkUser
    |   |   |       |-- users.vue
    |   |   |-- functions
    |   |   |   |-- thirdAuth.js
    |   |   |   |-- warterMark.js       水印
    |   |   |-- mixins
    |   |   |-- pages
    |   |   |   |-- demo       页面demo
    |   |   |   |   |-- index.vue
    |   |   |   |   |-- index2.vue
    |   |   |   |   |-- batchDeleteTable
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- coreCpt
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- dynamicColTable
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- filePreview
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- getSystemValue
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- picturePreview
    |   |   |   |   |-- simpleTable
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- syncInterface
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- threeTypesDialog
    |   |   |   |       |-- index.vue
    |   |   |   |       |-- components
    |   |   |   |           |-- doubleDialog.vue
    |   |   |   |           |-- singleDialog.vue
    |   |   |   |           |-- tripleDialog.vue
    |   |   |   |-- home        整体页面框架
    |   |   |   |   |-- index.vue
    |   |   |   |   |-- components
    |   |   |   |       |-- bread       面包屑
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |-- HeaderSearch        顶部搜索
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |-- headMenu        顶部菜单
    |   |   |   |       |   |-- functions.js
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |-- screen      全屏
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |-- settings        页面设置
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |   |-- RightPanel
    |   |   |   |       |   |   |-- index.vue
    |   |   |   |       |   |-- ThemePicker
    |   |   |   |       |       |-- default.vue
    |   |   |   |       |       |-- index.vue
    |   |   |   |       |-- shortCutMenu        常用菜单
    |   |   |   |       |   |-- index.vue
    |   |   |   |       |-- silder      侧边栏
    |   |   |   |       |   |-- flatSlider
    |   |   |   |       |   |   |-- menuItem.vue
    |   |   |   |       |   |   |-- slider.vue
    |   |   |   |       |   |-- treeSlider
    |   |   |   |       |       |-- slider.vue
    |   |   |   |       |       |-- components
    |   |   |   |       |           |-- Logo.vue
    |   |   |   |       |           |-- menuTree.vue
    |   |   |   |       |-- TagsView        历史页签
    |   |   |   |           |-- index.vue
    |   |   |   |           |-- scrollPane.vue
    |   |   |   |-- index       首页
    |   |   |   |   |-- index.vue
    |   |   |   |   |-- components
    |   |   |   |       |-- default.vue
    |   |   |   |-- jhAuth       用户模块部分页面拆分
    |   |   |   |   |-- changedata       个人中心
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |   |-- components
    |   |   |   |   |       |-- info.vue
    |   |   |   |   |-- organ       机构管理
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |   |-- components
    |   |   |   |   |       |-- organInfo.vue
    |   |   |   |   |-- organUser       机构用户管理
    |   |   |   |   |   |-- index.vue
    |   |   |   |   |-- user       用户管理
    |   |   |   |       |-- index.vue
    |   |   |   |       |-- components
    |   |   |   |           |-- Export2Excel.js
    |   |   |   |           |-- infoDialog.vue
    |   |   |   |           |-- selectRole.vue
    |   |   |   |-- login       登录
    |   |   |       |-- index.vue
    |   |   |       |-- thirdLogin.vue
    |   |   |-- router       路由配置
    |   |   |   |-- demoRouter.js
    |   |   |-- store       vuex配置
    |   |       |-- init.js
    |   |       |-- routeView.js
    |   |       |-- settings.js
    |   |       |-- tagsView.js
    |   |-- mixins
    |   |-- pages
    |   |-- router       路由配置
    |   |   |-- index.js
    |   |   |-- routeGuard.js
    |   |-- store       vuex配置
    |       |-- index.js
    |-- static
        |-- axios
        |   |-- axios.min.js
        |-- babel-polyfill
        |   |-- polyfill.min.js
        |-- element-ui
        |   |-- index.css
        |   |-- index.js
        |   |-- theme-chalk.css
        |   |-- fonts
        |   |   |-- element-icons.ttf
        |   |   |-- element-icons.woff
        |   |-- mixins
        |   |   |-- emitter.js
        |   |-- utils
        |       |-- merge.js
        |       |-- types.js
        |       |-- util.js
        |-- sso       单点登录
        |   |-- jh-sso.js
        |-- vue
            |-- vue-router.min.js
            |-- vue.min.js
            |-- vuex.min.js
