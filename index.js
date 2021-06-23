#!/usr/bin/env node
const { exec } = require("child_process");
const minimist = require('minimist');
const colors = require('colors');
const path = require('path');
const { stdout } = require("process");
const fs = require("fs");

const commandsToBeUsed = {};
const bootstrapped = {
    "jsx": `const Component = (props) => {
        return (
          <div className="component">
            <h1> Generic Component </h1>
          </div>
        );
      }
export default Component;`
}
switch (require("os").platform()) {
    case 'win32':
        commandsToBeUsed['currentDirectory'] = 'cd';
        commandsToBeUsed['cmdJoiner'] = '&';
        break;
    case 'linux':
        commandsToBeUsed['currentDirectory'] = 'pwd'
        commandsToBeUsed['cmdJoiner'] = '&&';
        break;
    case 'darwin':
        commandsToBeUsed['currentDirectory'] = 'pwd'
        commandsToBeUsed['cmdJoiner'] = '&&';
        break;
    default:
        commandsToBeUsed['currentDirectory'] = 'pwd'
        commandsToBeUsed['cmdJoiner'] = '&&';
        break;
}

const argv = process.argv.slice(2);

if (argv.length < 1) {
    console.error("enter some command to do something");
    process.exit(1);
}

const aliases = { jsx: 'j', js: 'javascript', css: 'c', test: 't' };
const args = minimist(argv, {
    alias: aliases,

    default: {}
});
console.log(args);
const execCallback = (error, stderr, stdout) => {
    if (error) {
        console.log(error.message.red)
    }
    if (stderr) {
        console.log(stderr.magenta);
    }
    console.log(stdout)
};
Object.keys(aliases).forEach(param => {
    if (args[param]) {
        let filesToBeCreated = args[param];
        if (args[param] instanceof Array) {
            generate([...args[param]],param);
        }
        else {
            generate([args[param]]);
        }


    }
})

function generate(pathList,param) {
    pathList.forEach(filePath => {
        const pathName = path.dirname(filePath);
        const baseName = path.basename(filePath).split('.')[0];
        console.log(pathName,baseName);
        if (pathName !== ".")
            exec(`mkdir -p ${pathName}`, (error, stderr, stdout) => {
                if (error) {
                    console.log(error.message.red)
                }
                if (stderr) {
                    console.log(stderr.magenta);
                }
            })
        if (!fs.existsSync(`${pathName}/${baseName}.${param}`))
            exec(`printf '${bootstrapped[param]}' > ${pathName}/${baseName}.${param}`, execCallback);
        else
            console.log(`file already exists`.red);
    })
}