import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, post,



  requestBody
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
    console.log(datapoint)

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
  ): Promise<Datapoint[]> {

     const data = await this.datapointRepository.find(filter);

    //  let mapResult = data.map(async (datum)=>{

    //   let data;

    //   datum.date ?  data = {
    //     primary: new Date(datum.date).toString(),
    //     secondary: (await this.datapointRepository.count({ date: { eq: datum.date } })).count
    //   } : data = null

     return data

    // })

    // const res = await Promise.all(mapResult)


    //  return [{label: 'crime per date', data: _.compact(res)}]


  }

}

// type CrimeDateGraph= [{
//   label: string,
//   data: {primary: string, secondary: number }[]
// }]
