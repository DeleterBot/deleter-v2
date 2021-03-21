import AbstractDatabaseOperationOptions from '@src/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseUpdateOptions extends AbstractDatabaseOperationOptions {
  upsert?: boolean
  condition?: string
}
