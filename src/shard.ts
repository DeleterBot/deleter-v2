import Deleter from "@/structures/Client";
import ProcessEnv from "@/types/ProcessEnv";
import DeleterClientOptions from "@/types/DeleterClientOptions";

const { TOKEN } = process.env as unknown as ProcessEnv
let options: DeleterClientOptions | undefined

try {
  options = require('./options')
} catch (e) {} // eslint-disable-line no-empty

const deleter = new Deleter(TOKEN, options)
deleter.load()