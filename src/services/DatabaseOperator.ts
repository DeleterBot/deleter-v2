import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'
import DeleterProcessEnv from '@/types/deleter/DeleterProcessEnv'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client

  constructor() {
    super()

    const { DB_USRN, DB_PSWD } = process.env as DeleterProcessEnv

    this.connection = new Cassandra.Client({
      cloud: {
        secureConnectBundle: './secure-connect-deleterdb.zip'
      },
      credentials: {
        username: DB_USRN,
        password: DB_PSWD
      }
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