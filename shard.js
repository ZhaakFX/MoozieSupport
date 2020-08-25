const { join } = require('path')
const { ShardingManager } = require('discord.js')
const manager = new ShardingManager(join(__dirname, 'index.js'), { token: require('./config.js').token })

manager.spawn()
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))
