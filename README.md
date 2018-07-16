# mock-proxy
用于mock和proxy的服务器，可以某些api使用proxy某些api使用mock数据

## Installation
``` bash
npm install --save-dev ma-mock
```

## Usage

创建`.mamockrc.js`文件
``` js
const path = require('path');

// 默认配置
module.exports = {
  prefix: '/__DEV__',
  rootPath: path.resolve(__dirname, './data/mock'),
  proxyPath: path.resolve(__dirname, './data/proxy'),
  proxyFilename: 'config.json',
};
```

webpack配置proxyTable
``` js
// ...省略
module.exports = {
  // ...省略
  dev: {
    // ...省略
    proxyTable: {
      // 填写 .mamockrc.js的prefix，默认为'/__DEV__'
      '/__DEV__': {
        target: 'http://localhost:3001', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      }
    },
  },
}
```

运行命令
``` bash
mamock [--port 3001]
```

## Dev
``` bash
# Installation
npm install

# dev
npm run dev

# build
npm run build

# start
npm run start

# format code style
npm run format
```

# Update
## v0.1.0
server端已完成，mock数据与proxy config写在./server/data内，因没有使用redis，所以./server/lib/Global维护一份全局变量

## v0.2.0
client端完成

## v0.2.1
添加`precommit`，进行`prettier`格式化和client端`eslint`检查

## v1.0.0
可以通过`mamock`命令启动，自动读取配置文件，前端展示readme

## v1.0.1
增加example

## v1.0.2
更新example配置
