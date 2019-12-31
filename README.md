# element table fixed bottom scrollbar directive

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/el-table-fixed-scrollbar.svg)](https://www.npmjs.com/package/el-table-fixed-scrollbar)
[![npm-downloades](https://img.shields.io/npm/dm/el-table-fixed-scrollbar.svg)](https://www.npmjs.com/package/el-table-fixed-scrollbar)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Yuliang-Lee/vue2-smooth-scroll/blob/master/LICENSE)


## Features

- fixed `el-table` bottom scrollbar when it's height is too high

## Instalation

### Using module bundlers
``` bash
# install dependency
npm install --save el-table-fixed-scrollbar
```

``` javascript
// import on your project (less then 1KB gziped)
import ElTableFixedScrollbar from 'el-table-fixed-scrollbar'
Vue.use(ElTableFixedScrollbar)
```

### Browser

``` html
<body>
  <div id="app">
    <div id="wrapper-id">
      <el-table v-fixed-bottom-scrollbar="{startFixed: 230, container: '#wrapper-id'}"></el-table>
    </div>
  </div>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vue2-smooth-scroll"></script>
  <script>
  Vue.use(ElTableFixedScrollbar);
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });
</script>
</body>
```

## Usage
``` html
<div id="wrapper-id">
  <el-table v-fixed-bottom-scrollbar="{startFixed: 230, container: '#wrapper-id'}"></el-table>
</div>
```

## Custom options
### Defaults
``` js
  {
    startFixed: 0, // Distance from top of table to top of browser window when to start fix scrollbar
    container: '', // default is window, the scroll container, use document.querySelector to query the Element
  }
```

## License

[MIT](./LICENSE)
