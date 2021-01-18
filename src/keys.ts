import {BindingKey} from '@loopback/context';
import {DataFactory} from './controllers';
import {GeocoderService} from './services';


export namespace geoCoderServiceBindings {
  export const GeoServiceInstance = BindingKey.create<GeocoderService>(
    'service.geocoder',
  );
}


export namespace DataFactoryBindings {
  export const DataFactoryInstance = BindingKey.create<DataFactory>(
    'data-factory',
  );
}
