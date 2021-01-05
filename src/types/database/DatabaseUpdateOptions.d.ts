import AbstractDatabaseOperationOptions from '@/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseUpdateOptions extends AbstractDatabaseOperationOptions {
  upsert?: boolean,
  condition?: string
}