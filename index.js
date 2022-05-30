#!/usr/bin/env node

import * as fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as readline from 'node:readline'

let count = 0;
let countWin = 0;

const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv._[0];

console.log(argv);

if (fileName == undefined) {
    console.log('Не указано имя файла для логирования результатов');
    process.exit(0);
}

fs.open(fileName, 'r', (err) => {
    if (err) {
        console.log('Ошибка - файл не существует');
    }
})

const readInterface = readline.createInterface({
    input: fs.createReadStream(fileName)
});

readInterface.on('line', (line) => {
    count++;

    if (JSON.parse(line).result == "Выигрыш") {
        countWin++;
    }
}).on('close', () => {
    console.log(`Общее количество партий: ${count}` +
            `\nКоличество выигранных партий: ${countWin}` +
            `\nКоличество проигранных партий: ${count - countWin}` +
            `\nПроцентное соотношение выигранных партий: ${Math.floor((countWin / count)* 100)} %`);

});