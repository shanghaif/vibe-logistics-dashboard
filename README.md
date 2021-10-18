# vibe-logistics-dashboard
This website generates front page of new logistics system.

## Version for
**npm > ^7.0.0 | ^8.0.0**

NVM is recommended, install nvm by yourself.

(using node v16.11.0 (npm v8.0.0))

```
nvm install v16.11.0
nvm use v16.11.0
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
npm run dev:mock // API use mockjs
npm run serve
```

### Compiles and minifies for production
```
npm run build
npm run build:mock // API use mockjs
```

### Lints and fixes files
```
npm run lint
```

_____
## Technology stack
* CLI:
  * vite (run and build faster)
  * vue-cli3 (easier)
* MVVM framework:
  * vue3 (virtual dom)
  * vuex (state management)
* Router:
  * vue-router (history pattern)
* UI framework:
  * element-plus (sass and less dependence, import indemand)
* API simulation:
  * mockjs (import indemand)
* Js compatibility:
  * babel (convert js and help element import css indemand)
* Formatter:
  * Eslint (formate code)

### See more info in [package.json](./package.json).

_____
### Customize configuration
See [Vite Configuration Reference](https://vitejs.cn/guide/).

See [Vue-Cli Configuration Reference](https://cli.vuejs.org/config/).

See [Eslint Configuration Reference](https://eslint.bootcss.com/docs/user-guide/getting-started).

