# node for backend

- install latest package or `typescript`, together with `tsconfig.json` file
- install package `ts-node` for running index typescript file
- install package `nodemon` for not refresh (hot reload on development)

## unit test with jest

## end-to-end testing with cypress

- [create many workers and manage them](https://github.com/piscinajs/piscina)
- [design user permission in code](https://css-tricks.com/handling-user-permissions-in-javascript/)
- [best practices](https://github.com/goldbergyoni/nodebestpractices)

---

# node tools

## pm2

- start: `pm2 start app.js --name my-api`
- list: `pm2 list`

## eslint 

install module: `npm install eslint --save-dev`

init file: `npx eslint --init` to install with suggested steps

example for config file using ES Module, Typescript, on Browser:

NOTE: TO KEEP PROJECT SIMPLE, ESLINT TO BE UPDATED LATER

## prettier

install prettier: `npm install prettier --save-dev`

create config file: `prettier.config.js` with below content:

```js
module.exports = {
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "singleQuote": true
}
```

format all files: `npx prettier --write .`

## how to minimize bundle size of tailwind css

remember to use plugin `purgecss`, sample as below:

```javascript
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    purgecss({
      content: ['./**/*.html', './**/*.tsx'],
    }),
  ],
};
```

## nvm

nvm install 16.0.0

nvm use 16.0.0


## is `nodejs` blocked as running heavy CPU tasks

ref: https://yarin.dev/nodejs-cpu-bound-tasks-worker-threads/

yes, NodeJS is single thread. If we are executing an Fibonacci of 50 (for example), and open another terminal to `curl` to different endpoint it will be blocked => wait until the first request of Fibonacci of 50 to response.

to avoid that, NodeJS designs has 3 methods: splitting up tasks with `setImmediate()`, spawning a child process, using worker threads.

example of using child process:

```javascript
const http = require('http');
const path = require('path');
const { fork } = require('child_process');

const port = 3000;

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log('Incoming request to:', url.pathname);

    if (url.pathname === '/fibonacci') {
      const n = Number(url.searchParams.get('n'));
      console.log('Calculating fibonacci for', n);

      const childProcess = fork(path.join(__dirname, 'fibonacci-fork'));

      childProcess.on('message', (message) => {
        res.writeHead(200);
        return res.end(`Result: ${message}`);
      });

      childProcess.send(n);
    } else {
      res.writeHead(200);
      return res.end('Hello World!');
    }
  })
  .listen(port, () => console.log(`Listening on port ${port}...`));
```

work thread in NodeJS is different from classic threads of other languages. It runs on different V8 and not share with the main thread => safety.

should use worker pool to avoid creating new thread on every request.


---
