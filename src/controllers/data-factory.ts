import {Datapoint} from '../models';

export class DataFactory{
  constructor( ){}

  async byDate(data: Datapoint[]){

    const month: any[] = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const sorted:any = {}

    data.forEach(d =>{
      const mo = month[d.date.getMonth()]
      return sorted[mo] ? sorted[mo] = sorted[mo] + 1: sorted[mo] = 1;
    })

    return {byDate: {sorted}}
  }
}
