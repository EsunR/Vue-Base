## 0. 说明
该项目为快速搭建Vue项目提供了一套基础模板方案，统一包含了Vue、Vuex、Vue-Router等基础组件，同时提供了其他组件的方案，请选择使用。

![](https://img.shields.io/badge/Base-Vue2.2-brightgreen.svg)
![](https://img.shields.io/badge/Build-Vue--Cli3-blue.svg)
![](https://img.shields.io/badge/Install-Yarn-red.svg)


## 1. 模板列表
- Vue+ElementUI
- Vue+ElementUI+jQuery+Bootstrap

## 2. 说明
### 2.1 gloable.vue
存放了所有全局变量
```js
// main.js
// 导入
import global from './common.vue'
//指定到全局属性COMMON上
Vue.prototype.COMMON = global
```
可以在全局中通过`this.COMMON.[variableName]`调用，如：
```js
let location = this.COMMON.index_location;  // '/login.html'
```

### 2.2 login文件夹
1. login/components/login.vue是登录模板，用来填写用户登录信息，它包含了以下几个方法：
    ```js
    loginClick()  // 点击登录按钮时执行，在此处执行Ajax，成功后会跳转到common.js中设置的服务器主页路径
    setCookie()   // 封装了设置Cookie的方法
    getCookie()   // 封装了获取Cookie的方法
    ```

    注意：使用该模板当登录页面，必须让服务器端在验证完登录后返回一个包含Token的object，该Token会被保存在浏览器LocalStroage下的`token`字段，完整的返回数据示例如下：
    ```js
    {
      code: 1,
      data: {
        token: 'xxx.xxx.xxx'
      }
    }
    ```

2. login/components/register.vue是注册模板，会自动校验表单内容，表单的内容默认包含了账号、用户名、密码三个关键字段，它包含了以下几个方法：
    ```js
    registerClick() // 当用户点击注册按钮时执行，再次执行Ajax
    ```

### 2.3 Style.css
在assets文件夹中存在一个Style.css文件，可以在此编写全局的CSS，同时提供一个style.scss文件。

### 2.4 Token验证
模板提供了一个Token校验机制，当用户访问`index.html`时，会验证浏览器的LocalStroage中是否存在token字段（并没有检测Token的有效性，只是单纯检测是否有token字段），如果没有就禁止访问，自动退回`login.html`，要求用户注册。该功能在默认不启用用，在`/router.js`文件中修改vue的路由卫士和import中的备注代码，即可启用：
```js
// /router.js
import global from './common.vue'
... ...
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    console.log("get success");
    next();
  } else {
    console.log("no token!");
    window.location.href = global.login_location
    next();
  }
})
... ...
```