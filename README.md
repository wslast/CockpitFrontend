# 项目模版

## 使用说明

### 私有库地址

私有库页面地址 <http://116.62.38.68:4873>
可以查看/下载当前私有库已上传的插件

### 安装npm切换源插件 nrm

安装后报path无效 看这个链接 <https://blog.csdn.net/S_aitama/article/details/113706339>
下面是应该替换的代码

```
    const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
```

```
    npm install nrm -g
```

### 添加私有库源

```
    nrm add jhNpm http://116.62.38.68:4873/
```

### 切换到私有库源

```
    nrm use jhNpm
```

### 项目依赖安装

当前私有库已有插件会直接下载 没有的自动去npm下载相应的插件

```
    npm i
```

## src/jh文件夹说明

该文件夹存放框架相关的代码，如果有自定义需求可以通过重写路由的方式实现自定义，尽量不要对该文件夹内容进行直接修改，否则后续更新可能会现预期之外的问题。

## src/jh/pages/jhAuth说明

该文件夹下代码为jh-auth包中的组织结构,用户管理及个人中心的源码,如果由自定义需求,可以直接修改其中源码,在src/jh/router/demoRouter中有路由实现,可以将jh-auth包中的对应路由覆盖掉.
