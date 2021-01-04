import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Datapoint} from '../models';
import {DatapointRepository} from '../repositories';

export class DatapointController {
  constructor(
    @repository(DatapointRepository)
    public datapointRepository : DatapointRepository,
  ) {}

  @post('/datapoints', {
    responses: {
      '200': {
        description: 'Datapoint model instance',
        content: {'application/json': {schema: getModelSchemaRef(Datapoint)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datapoint, {
            title: 'NewDatapoint',
            exclude: ['id'],
          }),
        },
      },
    })
    datapoint: Omit<Datapoint, 'id'>,
  ): Promise<Datapoint> {
    const coordinates: any = datapoint.coordinates;
    datapoint.coordinates = {
      type: 'Point',
      coordinates: [
        parseFloat(coordinates.lng), parseFloat(coordinates.lat)],
    };
    return this.datapointRepository.create(datapoint);
  }

  @get('/datapoints', {
    responses: {
      '200': {
        description: 'Array of Datapoint model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Datapoint, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Datapoint) filter?: Filter<Datapoint>,
  ): Promise<Datapoint[]> {
    return this.datapointRepository.find(filter);
  }


  @get('/datapoints/{id}', {
    responses: {
      '200': {
        description: 'Datapoint model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Datapoint, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Datapoint, {exclude: 'where'}) filter?: FilterExcludingWhere<Datapoint>
  ): Promise<Datapoint> {
    return this.datapointRepository.findById(id, filter);
  }
}
