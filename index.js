'use strict';
var fs = require('fs');
const inquirer = require('inquirer');

console.log('Hi, welcome to');
console.log(`
██████╗░░█████╗░░█████╗░██╗░░██╗░██████╗░█████╗░░█████╗░███╗░░██╗███╗░░██╗███████╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗██╔══██╗████╗░██║████╗░██║██╔════╝██╔══██╗
██████╔╝███████║██║░░╚═╝█████═╝░╚█████╗░██║░░╚═╝███████║██╔██╗██║██╔██╗██║█████╗░░██████╔╝
██╔═══╝░██╔══██║██║░░██╗██╔═██╗░░╚═══██╗██║░░██╗██╔══██║██║╚████║██║╚████║██╔══╝░░██╔══██╗
██║░░░░░██║░░██║╚█████╔╝██║░╚██╗██████╔╝╚█████╔╝██║░░██║██║░╚███║██║░╚███║███████╗██║░░██║
╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝
`);

const questions = [{
        type: 'confirm',
        name: 'localorserver',
        message: 'Do You Want To Scan A Server?',
        default: false,
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your Email adress?",
        validate(value) {
            const pass = value.match(
                '^\s*$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$'
            );
            if (pass) {
                return true;
            }

            return 'Please enter a valid email';
        },
    },
    {
        type: 'checkbox',
        name: 'Select languages',
        message: 'What languages packs do you want to monitor?',
        choices: [new inquirer.Separator(' = The Lang = '),
            {
                name: 'Python',
            },
            {
                name: 'Javascript',
            },
            {
                name: 'PHP',
            },
            {
                name: 'Java',
            },
            {
                name: 'C#',
            },
            {
                name: 'Go',
            },

        ],
    },
    {
        type: 'expand',
        name: 'system',
        message: 'Choose your opearting systems',
        choices: [{
                key: 'L',
                name: 'linux',
                value: 'linux',
            },
            {
                key: 'W',
                name: 'windows',
                value: 'windows',
            },
            {
                key: 'O',
                name: 'Mac OSX',
                value: 'mac',
            },
            {
               key: 'A',
               name: 'All Systems',
               value: 'All',
           },
        ],
    },
    {
        type: 'rawlist',
        name: 'mode',
        message: 'Choose your dashboard mode',
        choices: ['Developer', 'IR Team', 'Both'],
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
    let json = JSON.stringify(answers, null, '  ');
    fs.writeFile('configs/projectconfig.json', json, function (err, result) {
        if (err) console.log('error', err);
    });
    console.log('Good!, We are ready to luanch!')
});
