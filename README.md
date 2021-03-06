## 配置模版

https://github.com/ococa/scaffolds

## 使用方式

1. 全局安装

```
npm install yarx -g
```

or

```
yarn add yarx -g
```

2. 初始化项目

```
yarx init <projectName>
```

建立项目

3. 尽情享用你的项目

## 脚手架用到的依赖

- download-git-repo，下载并提取 git 仓库，用于下载项目模板。
- Inquirer.js，通用的命令行用户界面集合，用于和用户进行交互。
- commander.js，可以自动的解析命令和参数，用于处理用户输入的命令。
- handlebars.js，模板引擎，将用户提交的信息动态填充到文件中。
- ora，下载过程久的话，可以用于显示下载中的动画效果。
- chalk，可以给终端的字体加上颜色。
- log-symbols，可以在终端上显示出 √ 或 × 等的图标
