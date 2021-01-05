import AbstractDatabaseOperationOptions from '@/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseDeleteOptions extends AbstractDatabaseOperationOptions {
  timestamp?: number,
  exists?: boolean,
  condition?: string
}