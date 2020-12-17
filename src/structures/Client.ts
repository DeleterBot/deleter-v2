import Discord from "discord.js";
import DeleterClientOptions from "@/types/DeleterClientOptions";

class Deleter extends Discord.Client {
  public token: string

  constructor(token: string, options?: DeleterClientOptions) {
    super(options)
    this.token = token
  }

  load() {
    return this.login(this.token)
  }
}

export default Deleter