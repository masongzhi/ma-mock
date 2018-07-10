# mock-proxy
用于mock和proxy的服务器，可以某些api使用proxy某些api使用mock数据

# Usage
```bash
# install
npm install

# dev
npm run dev

# production
npm start

# format code
npm run format
```

# Update
## v0.1.0
server端已完成，mock数据与proxy config写在./server/data内，因没有使用redis，所以./server/lib/Global维护一份全局变量

## v0.2.0
client端完成

## v0.2.1
添加`precommit`，进行`prettier`格式化和client端`eslint`检查
