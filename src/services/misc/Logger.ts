import Colors from 'colors'
import Moment from 'moment'
import Constants from '@src/utils/Constants'

export default class Logger {

  private clearLine = false

  public set clear(condition: boolean) {
    this.clearLine = condition
  }

  public get info() {
    return this.log
  }

  private get defaultDepartment() {
    return global.deleter?.shard?.ids ? 'shard ' + global.deleter.shard.ids : 'manager'
  }

  private prependDepartment(department: string) {
    let result = department

    if (department.length < 13) {
      const length = 12 - department.length,
        isEven = length % 2 !== 0

      if (isEven) {
        result = ' '.repeat((length / 2) - 1) + department + ' '.repeat((length / 2) - 1)
      } else {
        if (length === 1) result = department + ' '
        else result = ' '.repeat(Math.floor((length / 2) - 1))
          + department
          + ' '.repeat(Math.floor((length / 2) - 2))
      }
    }

    return Colors.grey(result)
  }

  private universalLog(type: string, department: string, ...content: any) {
    if (this.clearLine && process.stdout.isTTY) process.stdout.clearLine(0) && process.stdout.cursorTo(0)
    else process.stdout.write('\n')

    process.stdout.write(
      type + ' ' +
      Colors.white('at') + ' ' +
      Colors.grey(Moment().format(Constants.getMomentFormat('time', 'en'))) + ' ' +
      Colors.white('from') + ' ' +
      this.prependDepartment(department) + ' ' +
      Colors.white('|') + ' ' + content.join(' ')
    )
  }

  public log(department = this.defaultDepartment, ...content: any) {
    this.universalLog(Colors.bgBlue(' INFO ').black, department, ...content)
  }

  public error(department = this.defaultDepartment, ...content: any) {
    this.universalLog(Colors.bgRed(' FAIL ').black, department, ...content)
  }

  public warn(department = this.defaultDepartment, ...content: any) {
    this.universalLog(Colors.bgYellow(' WARN ').black, department, ...content)
  }

  public success(department = this.defaultDepartment, ...content: any ) {
    this.universalLog(Colors.bgGreen(' DONE ').black, department, ...content)
  }

  public critical(department = this.defaultDepartment, ...content: any ) {
    this.universalLog(Colors.bgRed(' CRIT ').black, department, ...content)
  }

}
