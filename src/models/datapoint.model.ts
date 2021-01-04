import {Entity, model, property} from '@loopback/repository';

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
    type: 'string',
  })
  coords?: string;

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
