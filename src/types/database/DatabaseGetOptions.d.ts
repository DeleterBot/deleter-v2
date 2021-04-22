import AbstractDatabaseOperationOptions from '@src/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseGetOptions extends AbstractDatabaseOperationOptions {
  selector?: string
  raw?: boolean
  array?: boolean
  everything?: boolean
  transform?: any
}
