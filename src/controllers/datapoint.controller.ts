import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, HttpErrors, param, post,



  requestBody
} from '@loopback/rest';
import {Datapoint} from '../models';
import {DatapointRepository} from '../repositories';
import {GeocoderService} from '../services';
import {DataFactory} from './data-factory';

export class DatapointController {
  constructor(
    @repository(DatapointRepository)
    public datapointRepository : DatapointRepository,
    @inject('service.geocoder')
    private geocoder: GeocoderService,
    @inject('data-factory')
    private dataFactory: DataFactory
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
    console.log(datapoint)
    try{
      return await this.datapointRepository.create(datapoint);
    }catch(e){
      throw new HttpErrors[400](e.message)
    }


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
    @param.query.object('coordinates') coordinates?: {lat: number, lng: number},
  ): Promise<any> {

    if(coordinates){
      try{
        const d = await this.geocoder.geoSearch(coordinates)
        const byDate = await this.dataFactory.byDate(d as Datapoint[])
        return {byDate: {...byDate}}
      }catch(e){throw new HttpErrors.BadRequest(e.message)}
    }

     const data = await this.datapointRepository.find();
     const byDate = await this.dataFactory.byDate(data)
     return {byDate: {...byDate}}
  }

}
