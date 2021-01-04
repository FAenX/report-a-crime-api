import {DefaultCrudRepository} from '@loopback/repository';
import {Datapoint, DatapointRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DatapointRepository extends DefaultCrudRepository<
  Datapoint,
  typeof Datapoint.prototype.id,
  DatapointRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Datapoint, dataSource);
  }
}
