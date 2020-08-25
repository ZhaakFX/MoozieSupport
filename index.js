// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.

// Load up the discord.js library
const { Client, Collection } = require('discord.js')
// We also load the rest of the things we need in this file:
const { readdirSync } = require('fs')
const { join } = require('path')
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Client()

// Here we load the config file that contains our token and our prefix values.
client.config = require('./config.js')
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require('./modules/Logger')

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require('./modules/functions.js')(client)

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Collection() // use Collection
client.aliases = new Collection() // same ^

// Here we load **commands** into memory, as a collection, so they're accessible
// here and everywhere else.
const cmdFiles = readdirSync(join(__dirname, 'commands'))
client.logger.log(`Loading a total of ${cmdFiles.length} commands.`)
cmdFiles.forEach((file) => {
  if (file.endsWith('.js')) {
    const response = client.loadCommand(file)
    if (response) console.log(response)
  }
})

// Then we load events, which will include our message and ready event.
const evtFiles = readdirSync(join(__dirname, 'events'))
client.logger.log(`Loading a total of ${evtFiles.length} events.`)
evtFiles.forEach((file) => {
  const eventName = file.split('.')[0]
  client.logger.log(`Loading Event: ${eventName}`)
  const event = require(`./events/${file}`)
  // Bind the client to any event, before the existing arguments
  // provided by the discord.js event.
  // This line is awesome by the way. Just sayin'.
  client.on(eventName, event.bind(null, client))
})

// Generate a cache of client permissions for pretty perm names in commands.
client.levelCache = {}
client.config.permLevels.forEach((item) => {
  client.levelCache[item.name] = item.level
})

// Here we login the client.
client.login(client.config.token)
