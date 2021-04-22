export default function makeGuild(guildID: string) {
  return `
    (async () => {
    const guild = deleter.guilds.cache.get('${guildID}'),
      result = {}
      
    if (guild && guild.available) {
      
      result.available = true
      result.id = guild.id
      result.name = guild.name
      result.iconURL = guild.iconURL()
      result.region = guild.region

      if (!result.iconURL) result.iconURL = null
      else result.iconURL = result.iconURL.replace('.webp', '.png')

      result.channels = []
      result.emojis = []
      result.roles = []
      
      if (deleter.db.cache) {
        const guildCache = await deleter.db.cache.get('guilds:' + guild.id)
        if (guildCache) result.lang = guildCache.lang?.interface
      }

      if (!result.lang) result.lang = result.region === 'russia' ? 'ru' : 'en'
      
      guild.channels.cache.forEach(channel => {
        if (channel && !channel.deleted && (channel.type !== 'category' && channel.type !== 'unknown')) {
          result.channels.push({
            id: channel.id,
            name: channel.name,
            manageable: channel.manageable,
            type: channel.type,
            position: channel.rawPosition,
            deletable: channel.deletable
          })
        }
      })
      
      guild.roles.cache.forEach(role => {
        if (role && !role.deleted) {
          result.roles.push({
            id: role.id,
            name: role.name,
            hexColor: role.hexColor || null,
            color: role.color ?? null,
            managed: role.managed,
            editable: role.editable,
            position: role.position
          })
        }
      })
      
      guild.emojis.cache.forEach(emoji => {
        if (emoji && !emoji.deleted) {
          result.emojis.push({
            id: emoji.id,
            name: emoji.name,
            animated: emoji.animated,
            available: emoji.available,
            managed: emoji.managed
          })
        }
      })
      
      result.roles = result.roles.sort((a, b) => b.position - a.position)
      result.channels = result.channels.sort((a, b) => a.position - b.position)
    }
    
    return result.available ? result : null
    })()
    `
}
