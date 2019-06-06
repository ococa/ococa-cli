#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

const packageVersion = `${require('./package').version}`

program.version(packageVersion, '-v, --version')
  .command('init <name>')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer.prompt([
        {
          name: 'description',
          message: '请输入项目描述'
        },
        {
          name: 'author',
          message: '请输入作者名称'
        }
      ]).then((answers) => {
        const spinner = ora('正在下载模板...');
        spinner.start();
        download('ococa/scaffolds', name, { clone: true }, (err) => {
          if (err) {
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
          } else {
            spinner.succeed();
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            }
            // 修改package.json配置
            fs.readFile(`./${name}/package.json`, 'utf8', function (err, data) {
              if (err) {
                spinner.stop();
                console.error(err);
                return;
              }
              const packageJson = JSON.parse(data);
              packageJson.name = meta.name;
              packageJson.description = meta.description;
              packageJson.author = meta.author;
              var updatePackageJson = JSON.stringify(packageJson, null, 2);
              fs.writeFile(`./${name}/package.json`, updatePackageJson, 'utf8', function (err) {
                if (err) {
                  spinner.stop();
                  console.error(err);
                  return;
                } else {
                  spinner.stop();
                  console.log(symbols.success, chalk.green('项目初始化完成'));
                  console.log(`
                                  ${chalk.bgWhite.black('   Run Application  ')}
                                  ${chalk.yellow(`cd ${name}`)}
      
                                  ${chalk.yellow('yarn')}
      
                                  ${chalk.yellow('npm start')}
      
                                  ${chalk.yellow('npm build')}
      
                                  ${chalk.yellow('npm test')}
                                `);
                }
              });
            });
          }
        })
      })
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red('项目已存在'));
    }
  })
program.parse(process.argv);
