import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import DeleterProcessEnv from '@/types/DeleterProcessEnv'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client

  constructor() {
    super()

    const { DB_CONNECTION_POINT } = process.env as DeleterProcessEnv

    this.connection = new Cassandra.Client({
      contactPoints: [ DB_CONNECTION_POINT ]
    })

    this.connection.connect()
  }

  public execute(query: string, params: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator