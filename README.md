# ComponentLibrary

Building a React Typescript based storybook project from scratch

## Preparation

  * pre-requisites - set up VSCode to save onFocusChange

  * open VSCode, and using Terminal window, navigate to parent folder for projects

  * create new folder for project
  
    ```
    MKDIR project-name
    ```
  
  * initialise git

    ```
    git init
    ```

  * initialise npm with defaults

    ```
    npm init --yes
    ```

  * create readme file for describing project, taking notes and providing documentation to consumers

    ```
    touch README.md
    ```

  * install Typesript
   
    ```
    npm i typescript --save-dev
    ```

  * create Typescript configuration in root directory

    ```
    touch tsconfig.json
    ```

    ```
    {
      "compilerOptions": {
        "sourceMap": true,
        "noImplicitAny": false,
        "module": "commonjs",
        "target": "es6",
        "lib": [
          "es2015",
          "es2017",
          "dom"
        ],
        "removeComments": true,
        "allowSyntheticDefaultImports": false,
        "jsx": "react",
        "allowJs": true,
        "baseUrl": "./",
        "paths": {
          "components/*": [
            "src/components/*"
          ]
        }
      },
      "include": [
        "./src"
      ]
    }
    ```

  * Add React dependencies (should be peerDependencies?)

    ```
    npm i react react-dom --save
    ```

  * Add React types dependencies to dev configuration

    ```
    npm i @types/react @types/react-dom --save-dev
    ```

  * (Optional?) Create initial App files in root

    ```
    touch index.html
    ```

    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>React TypeScript App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    ```

    ```
    mkdir src
    touch src/index.tsx
    ```

    ```
    import * as React from 'react';
    import * as ReactDOM from 'react-dom';

    import App from './App';

    ReactDOM.render(<App/>, document.getElementById("root"));
    ```

    ```
    touch src/App.tsx
    ```

    ```
    import * as React from 'react';
    import HelloWorld from 'components/helloworld/HelloWorld';

    const App = () => {
        return (
            <>
                <HelloWorld/>
            </>
        )
    };

    export default App;
    ```

    ```
    mkdir src/components
    mkdir src/components/HelloWorld
    touch src/components/HelloWorld/HelloWorld.tsx
    ```

    ```
    import * as React from 'react';

    const HelloWorld = () => <h1>Hello World</h1>;

    export default HelloWorld;
    ```

  * install WebPack 

    ```
    npm i webpack webpack-cli webpack-dev-server --save-dev
    ```

  * and for type checking through webpack

    ```
    npm i ts-loader fork-ts-checker-webpack-plugin html-webpack-plugin --save-dev
    ```

  * create webpack configuration in root

    ```
    touch webpack.config.js
    ```

    ```
    const path = require('path');
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

    module.exports = (env) => {

      return {
          entry: './src/index.tsx',
          resolve: {
              extensions: ['.ts', '.tsx', '.js'],
              alias: {
                  components: path.resolve(__dirname, './src/components/')
              }
          },
          output: {
              path: path.join(__dirname, '/dist'),
              filename: 'build.js'
          },
          module: {
              rules: [
                  {
                      test: /\.tsx?$/,
                      loader: 'ts-loader',
                      options: {
                          // disable type checker - we will use it in fork plugin
                          transpileOnly: true
                      },
                      exclude: /dist/,
                  }
              ]
          },
          plugins: [
              new HtmlWebpackPlugin({
                  template: './index.html'
              }),
              new webpack.DefinePlugin({
                  'process.env.development': !!(env && !env.production),}),
              new ForkTsCheckerWebpackPlugin({eslint: true})
          ]
      }
    };
    ```

    * add npm scripts for start and build into package.json

    ```
    "scripts": {
      "start:dev": "webpack-dev-server --mode development --env.development --open --hot",
      "build": "webpack --mode production --env.production"
    }
    ```

    * add ESLint

    ```
    npm i eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
    ```

    NOTE
    ```
    npm WARN eslint-plugin-react@7.19.0 requires a peer of eslint@^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself.
    npm WARN eslint-plugin-react-hooks@4.0.0 requires a peer of eslint@^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself.
    npm WARN @typescript-eslint/parser@2.32.0 requires a peer of eslint@^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself.
    npm WARN @typescript-eslint/eslint-plugin@2.32.0 requires a peer of eslint@^5.0.0 || ^6.0.0 but none is installed. You must install peer dependencies yourself.
    ```

    * create ESLint configuration

    ```
    touch .eslintrc.js
    ```

    ```
    module.exports = {
        parser: '@typescript-eslint/parser',
        plugins: [
            '@typescript-eslint',
            'react',
            'react-hooks'
        ],
        env: {
            browser: true,
            jest: true
        },
        extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
        ],
        parserOptions: {
            project: [
                "tsconfig.json",
            ],
            tsconfigRootDir: __dirname,
            ecmaVersion: 2018,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            }
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react/jsx-filename-extension': ['warn', {extensions: ['.jsx', '.tsx']}],
            'react/prop-types': 'off',
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn"
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    };
    ```

    * create ESLint ignore file

    ```
    touch .eslintignore
    ```

    ```
    **/webpack.config.js
    ```

    * check npm versions

    ```
    npm update
    ```

    * to run

    ```
    npm run start:dev
    ```

    * and to stop 

    ```
    CTRL+C
    ```

    * create git ignore

    ```
    touch .gitignore
    ```

    ```
    # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

    # dependencies
    /node_modules

    # testing
    /coverage

    # production
    /build

    # misc
    .DS_Store
    .env*
    .env.local
    .env.development.local
    .env.test.local
    .env.production.local
    .sass-cache

    npm-debug.log*
    ```

    * push to new repo (create the repo in your source control library)

    ```
    git remote add origin https://github.com/{whateveryourgithubaccountis}/component-library.git
    git push -u origin master
    ```

## References

  * [React with Typescript starter kit without create-react-app incl. Webpack & ESLint](https://medium.com/@adriancelczynski/react-with-typescript-starter-kit-without-create-react-app-including-webpack-eslint-bef225c35ffa) by 
Adrian Celczyński
