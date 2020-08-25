const inquirer = require('inquirer')
const Enmap = require('enmap')
const { readFileSync, writeFileSync } = require('fs')

let baseConfig = readFileSync(join(__dirname, 'config.base.js'), 'utf8')

const defaultSettings = {
  'prefix': '+',
  'supportRole': '747887425900249110', // !!!!! use ID instead !!!!!!
  'muteRole': '745975297282801735', // !!!!! use ID instead !!!!!!
  'modLogChannel': '747798367043584020', // !!!!! use ID instead !!!!!!
  'modRole': '747798367043584020', // !!!!! use ID instead !!!!!!
  'adminRole': '747798367043584020', // !!!!! use ID instead !!!!!!
  'systemNotice': true, // This gives a notice when a user tries to run a command that they do not have permission to use.
  'welcomeChannel': '741748854415949834', // !!!!! use ID instead !!!!!!
  'welcomeMessage': '📥 {user}, joined the server.',
  'welcomeEnabled': false,
  'autorole': '747799201500626955', // !!!!! use ID instead !!!!!!
  'autoroleEnabled': false
}

const settings = new Enmap({
  name: 'settings',
  cloneLevel: 'deep',
  ensureProps: true
})

let prompts = [
  {
    type: 'list',
    name: 'resetDefaults',
    message: 'Do you want to reset default settings?',
    choices: ['Yes', 'No']
  },
  {
    type: 'input',
    name: 'token',
    message: 'Please enter the bot token from the application page.'
  },
  {
    type: 'input',
    name: 'ownerID',
    message: 'Please enter the bot owner\'s User ID'
  },
];

(async function () {
  console.log('Setting Up MoozieSupport Bot Configuration...')
  await settings.defer
  if (!settings.has('default')) {
    prompts = prompts.slice(1)
    console.log('First Start! Inserting default guild settings in the database...')
    await settings.set('default', defaultSettings)
  }

  const answers = await inquirer.prompt(prompts)

  if (answers.resetDefaults && answers.resetDefaults === 'Yes') {
    console.log('Resetting default guild settings...')
    await settings.set('default', defaultSettings)
  }

  baseConfig = baseConfig
    .replace('{{ownerID}}', answers.ownerID)
    .replace('{{token}}', answers.token)

  writeFileSync(join(__dirname, 'config.js'), baseConfig)
  console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!')
  console.log('Configuration has been written, enjoy!')
  await settings.close()
}())
