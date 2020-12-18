import 'module-alias/register'

import Discord from "discord.js";
import DeleterClientOptions from "@/types/DeleterClientOptions";

class Deleter extends Discord.Client {
  public token: string
  public owner: string

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
    this.owner = options?.owner || 'nobody'
  }

  load() {
    return this.login(this.token)
  }
}

export default Deleter