#!/usr/bin/env node

const args = process.argv;
const axios = require('axios');
const ora = require('ora');
const chalk = require('chalk');


const api = "https://date.nager.at/api/v2/PublicHolidays/";

let date = new Date();
let year = date.getFullYear();

const {
    getCode
} = require('country-list');

const country = args[2];

const code = getCode(country);

var figlet = require('figlet');


figlet('Holidates !', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

const _cliProgress = require('cli-progress');

// create new progress bar
const b1 = new _cliProgress.SingleBar({
    format: 'Progress |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} || Speed: {speed}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

// initialize the bar - defining payload token "speed" with the default value "N/A"
b1.start(100, 0, {
    speed: ""
});

// update values
b1.increment(1);
b1.update(100);

// stop the bar
b1.stop();


const holidates = async () => {
    try {
        const result = await axios.get(`${api}${year}/${code}`)
        var data = result.data

        console.log("");
        console.log(chalk.bgMagenta.bold("List of holidays in " + country + " : "));
        console.log("");

        data.forEach(el => {
            console.log(chalk.magenta('Date : ') + el.date + ' - ' + chalk.magenta('Nom : ') + el.name);
        });
        console.log("");

    } catch (err) {
        console.error(err);
    }
};


holidates();