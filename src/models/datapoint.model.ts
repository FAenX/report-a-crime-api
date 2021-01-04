import {Entity, model, property} from '@loopback/repository';

export interface Coordinates {
  type: 'Point',
  coordinates: number[]
}

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


  constructor(data?: Partial<Datapoint>) {
    super(data);
  }
}

export interface DatapointRelations {
  // describe navigational properties here
}

export type DatapointWithRelations = Datapoint & DatapointRelations;
