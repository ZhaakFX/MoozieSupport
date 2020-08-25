const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  'ownerID': '203438864730161153',

  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  'token': 'TOKEN-HERE',

  'logsGuild': '747798495154405446',
  'logsChannel': '747798367043584020',

  // Default per-server settings. New guilds have these settings.

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.

  'defaultSettings': {
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
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    {
      level: 0,
      name: 'Utilisateur',
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    {
      level: 1,
      // This is the name of the role.
      name: 'Modérateur',
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => message.member.roles.cache.has(message.settings.modRole)
    },

    {
      level: 2,
      name: 'Administrateur',
      check: (message) => message.member.roles.has(message.settings.adminRole)
    },
    // This is the server owner.
    {
      level: 3,
      name: 'Propriétaire du serveur',
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    {
      level: 4,
      name: 'Propriétaire du bot',
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}

module.exports = config
