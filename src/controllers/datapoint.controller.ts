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
import _ from 'lodash'

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
              type: 'object',
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Datapoint) filter?: Filter<Datapoint>,
  ): Promise<CrimeDateGraph> {
   
     const data = await this.datapointRepository.find(filter);

     let mapResult = data.map(async (datum)=>{

      let data;

      datum.date ?  data = {
        primary: new Date(datum.date),
        secondary: (await this.datapointRepository.count({ date: { eq: datum.date } })).count
      } : data = null 

     return data
     
    })
    
    const res = await Promise.all(mapResult)
     

     return [{label: 'crime per date', data: _.compact(res)}]


  }
  
}

type CrimeDateGraph= [{
  label: string,
  data: {primary: Date | null , secondary: number }[]
}]
