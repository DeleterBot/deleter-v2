import Colors from 'colors'

export default class Logger {

  public get info() {
    return this.log
  }

  private get defaultDepartment() {
    return global.deleter?.shard?.ids ? 'shard ' + global.deleter.shard.ids : 'manager'
  }

  private prependDepartment(department: string) {
    let result = department

    if (department.length < 15) {
      const length = 14 - department.length,
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

  public log(department = this.defaultDepartment, ...content: any) {
    console.log(
      Colors.bgBlue( ' INFO ').black,
      this.prependDepartment(department),
      Colors.white('|'), ...content
    )
  }

  public error(department =  this.defaultDepartment, ...content: any) {
    console.log(
      Colors.bgRed( ' FAIL ').black,
      this.prependDepartment(department),
      Colors.white('|'),
      ...content
    )
  }

  public warn(department =  this.defaultDepartment, ...content: any) {
    console.log(
      Colors.bgYellow( ' WARN ').black,
      this.prependDepartment(department),
      Colors.white('|'),
      ...content
    )
  }
}
