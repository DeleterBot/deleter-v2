import AbstractDatabaseOperationOptions from '@/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseGetOptions extends AbstractDatabaseOperationOptions {
  selector?: string,
  raw?: boolean,
  array?: boolean
}