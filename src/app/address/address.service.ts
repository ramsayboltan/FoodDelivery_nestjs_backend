import { Injectable } from '@nestjs/common';
import { Address } from '@app/models/address.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { addressInterface } from '@app/helpers/interfaces/address';
import { Observable } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}

  async create<T extends addressInterface>(model: T): Promise<Address | Observable<Address | T>> {
    const { user, country, state, city, address_line1, address_line2, is_activated, zip_code } = model;
    const address = await new this.addressModel({
      user,
      country,
      state,
      city,
      address_line1,
      address_line2,
      is_activated,
      zip_code,
    }).save();
    return address;
  }

  async createMany<T extends addressInterface[]>(addressArr: T): Promise<any> {
    const mappCallback = add => {
      return new this.addressModel({
        user: add.user,
        mode: add.mode,
        is_activated: add.is_activated,
        country: add.country,
        state: add.state,
        city: add.city,
        address_line1: add.address_line1,
        address_line2: add.address_line2,
        zip_code: add.zip_code,
        type: add.type,
      }).save();
    };

    const mappedData = [...addressArr].map(mappCallback);

    const allAddress = await Promise.all(mappedData);

    return allAddress;
  }
}
