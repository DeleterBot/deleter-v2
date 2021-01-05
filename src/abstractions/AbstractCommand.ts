import Base from './Base'
import CommandConfig from '../types/commands/CommandConfig'
import CommandDetails  from '@/types/commands/CommandDetails'

export default abstract class AbstractCommand extends Base implements CommandConfig {
  public name: string
  public ru: CommandDetails
  public en: CommandDetails
  public gg: CommandDetails

  protected constructor(config: CommandConfig) {
    super()
    this.name = config?.name
    this.en = config?.en
    this.ru = config?.ru
    this.gg = config?.gg
  }
}