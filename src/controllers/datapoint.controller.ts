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
    return this.datapointRepository.create(datapoint);
  }

  @get('/datapoints/count', {
    responses: {
      '200': {
        description: 'Datapoint model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Datapoint) where?: Where<Datapoint>,
  ): Promise<Count> {
    return this.datapointRepository.count(where);
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

  @patch('/datapoints', {
    responses: {
      '200': {
        description: 'Datapoint PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datapoint, {partial: true}),
        },
      },
    })
    datapoint: Datapoint,
    @param.where(Datapoint) where?: Where<Datapoint>,
  ): Promise<Count> {
    return this.datapointRepository.updateAll(datapoint, where);
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

  @patch('/datapoints/{id}', {
    responses: {
      '204': {
        description: 'Datapoint PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datapoint, {partial: true}),
        },
      },
    })
    datapoint: Datapoint,
  ): Promise<void> {
    await this.datapointRepository.updateById(id, datapoint);
  }

  @put('/datapoints/{id}', {
    responses: {
      '204': {
        description: 'Datapoint PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() datapoint: Datapoint,
  ): Promise<void> {
    await this.datapointRepository.replaceById(id, datapoint);
  }

  @del('/datapoints/{id}', {
    responses: {
      '204': {
        description: 'Datapoint DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.datapointRepository.deleteById(id);
  }
}
