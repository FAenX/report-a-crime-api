import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

export type Coordinates = {
    lat: number,
    lng: number
}

console.log(process.env.MONGO_DATABASE)

// mongoose connection
mongoose.connect(
  `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`, {
    // auth: { "authSource": "admin" },
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(res=>res).catch(err=>console.log(err));


const Datapoint = {
  id: String,
  date: Date
};

const datapoint = mongoose.model(
  'Datapoint', new mongoose.Schema(Datapoint), 'Datapoint',
);

@bind({scope: BindingScope.TRANSIENT})
export class GeocoderService {
  constructor() {}

  async geoSearch(coordinates: Coordinates): Promise<unknown> {
    try {
      const datapoints = await datapoint.find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [coordinates.lng, coordinates.lat],
            },
            $maxDistance: 20000,
          },
        },
      });
      return datapoints;
    } catch (e) {
      throw new HttpErrors.BadRequest(e);
    }
  }

}
