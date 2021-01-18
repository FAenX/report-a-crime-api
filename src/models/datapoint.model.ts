import {Entity, model, property} from '@loopback/repository';

export type Coordinates = {
  type: 'Point',
  coordinates: number[]
}

const year = new Date().getFullYear()
const month = new Date().getMonth()
const date = new Date().getDate()

@model()
export class Datapoint extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'object',
    required: true,
  })
  coordinates: Coordinates; // use google geo-encoder

  @property({
    type: 'string',
    required: true,
  })
  category: string;

  @property({
    type: 'date',
    default: new Date(year, month, date)
  })
  date?: Date;

  @property({
    type: 'string',
    required: true
  })
  details?: string;


  constructor(data?: Partial<Datapoint>) {
    super(data);
  }
}

export interface DatapointRelations {
  // describe navigational properties here
}

export type DatapointWithRelations = Datapoint & DatapointRelations;
