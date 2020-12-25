import Cassandra from 'cassandra-driver'
import BaseService from '@/abstractions/BaseService'

class DatabaseOperator extends BaseService {
  public connection: Cassandra.Client

  constructor() {
    super()

    this.connection = new Cassandra.Client({
      contactPoints: [ 'localhost' ]
    })

    this.connection.connect()
  }

  public execute(query: string, params: Array<string>) {
    return this.connection.execute(query, params)
  }
}

export default DatabaseOperator