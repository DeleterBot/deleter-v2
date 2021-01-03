import AbstractDatabaseOperationOptions from '@/types/database/AbstractDatabaseOperationOptions'

export default interface DatabaseGetOptions extends AbstractDatabaseOperationOptions {
  selector?: string
}