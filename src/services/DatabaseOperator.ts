import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import DeleterProcessEnv from '@/types/DeleterProcessEnv'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client

  constructor() {
    super()

    const { DB } = process.env as DeleterProcessEnv

    this.connection = new Cassandra.Client({
      contactPoints: [ DB ],
      localDataCenter: 'datacenter1',
      keyspace: 'grocery'
    })
  }

  public connect() {
    return this.connection.connect()
  }

  public execute(query: string, params: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator