import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../../models/order.schema';
import { createOrderDto, OrderUpdateDto, orderFilterDto, PagingQueryDto } from './order.dto';
import { Observable } from 'rxjs';
import { isValidString } from '@app/utils/string';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

// import * as fs from 'fs';
import { join } from 'path';
import { orderUpdateInterface } from '@app/helpers/interfaces/order.interface';
import * as moment from 'moment';
@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async build(model: createOrderDto) {
    const {
      restaurant_id,
      item_id,
      customer_id,
      driver_id,
      mode,
      payment_method,
      deliveryFee,
      deliveryAddress,
      tax,
      totalAmount,
      note,
      admin_note,
      expiry_Date,
      card_number,
      location_from,
      location_to,
      order_time,
      distance,
      perKilometerRate,
      status,
      is_activated,
    } = model;
    const calculatedFare = this.calculateFare(distance, perKilometerRate);
    const user = new this.orderModel({
      restaurant_id,
      customer_id,
      item_id,
      payment_method,
      card_number,
      deliveryFee,
      deliveryAddress,
      tax,
      totalAmount,
      note,
      admin_note,
      order_time,
      expiry_Date,
      location_from,
      location_to,
      status,
      distance,
      perKilometerRate,
      is_activated,
      driver_id,
      mode,
      fare: calculatedFare.toString(),
    }).save();
    return user;
  }

  calculateFare(distance: string, perKilometerRate: string): string {
    // assuming the distance is in kilometer
    const distanceInKilometers = parseFloat(distance);
    const perKilometerPrice = parseFloat(perKilometerRate);
    // const perKilometerRate = 1;

    const fare = distanceInKilometers * perKilometerPrice;

    return `$${fare.toFixed(2)}`;
  }
  async createOrder(model: createOrderDto): Promise<Order> {
    return await this.build(model);
  }
  async getAllOrder(id: string, queryParams): Promise<Order[]> {
    let { page_no = '1', page_size = '50' } = queryParams;

    page_no = Number(page_no);
    page_size = Number(page_size);

    const skip = (page_no - 1) * page_size;

    const pipeline = [
      {
        $match: {
          $and: [
            { mode: new Types.ObjectId(id) },
            {
              is_deleted: false,
            },
          ],
        },
      },
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: page_size,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drivers',
          let: { driverId: '$driver_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'customers',
          let: { customerId: '$customer_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item_id',
        },
      },
      { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
    ];
    const order = await this.orderModel.aggregate([...pipeline]);
    return order;
  }

  async getByIdOrder(id: string): Promise<Order[]> {
    const order = await this.orderModel.aggregate([
      {
        $match: { $and: [{ _id: new Types.ObjectId(id) }, { is_deleted: false }] },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drivers',
          let: { driverId: '$driver_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'customers',
          let: { customerId: '$customer_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item_id',
        },
      },
      { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
    ]);
    return order;
  }

  async getByCustomerId(id: string): Promise<Order[]> {
    const order = await this.orderModel.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $match: {
          customer_id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: '$customer_id' },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: '$driver_id' },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: '$restaurant_id' },
    ]);
    return order;
  }

  async getByDriverId(id: string): Promise<Order[]> {
    const order = await this.orderModel.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $match: {
          driver_id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: '$customer_id' },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: '$driver_id' },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: '$restaurant_id' },
    ]);
    return order;
  }

  async getByRestaurantId(id: string): Promise<Order[]> {
    const order = await this.orderModel.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $match: {
          restaurant_id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: '$customer_id' },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: '$driver_id' },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: '$restaurant_id' },
    ]);
    return order;
  }

  async softDelete<T>(id: T): Promise<string> {
    const user = await this.orderModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    if (!user) {
      throw new HttpException(`order not found`, HttpStatus.BAD_REQUEST);
    }
    return 'order deleted';
  }

  async orderUpdate<T>(id: T | string, model: Partial<orderUpdateInterface>): Promise<Order | Observable<Order>> {
    const order = await this.orderModel.findByIdAndUpdate({ _id: id });
    if (!order) {
      throw new HttpException('order not found', HttpStatus.BAD_REQUEST);
    }
    if (model.restaurant_id) {
      order.restaurant_id = model.restaurant_id;
    }
    if (model.customer_id !== 'string' && model.customer_id !== '' && model.customer_id !== undefined) {
      order.customer_id = model.customer_id;
    }
    if (model.item_id !== 'string' && model.item_id !== '' && model.item_id !== undefined) {
      order.item_id = model.item_id;
    }
    if (model.driver_id !== 'string' && model.driver_id !== '' && model.driver_id !== undefined) {
      order.driver_id = model.driver_id;
    }
    if (model.mode !== 'string' && model.mode !== '' && model.mode !== undefined) {
      order.mode = model.mode;
    }
    if (model.payment_method !== 'string' && model.payment_method !== '' && model.payment_method !== undefined) {
      order.payment_method = model.payment_method;
    }
    if (model.card_number !== 'string' && model.card_number !== '' && model.card_number !== undefined) {
      order.card_number = model.card_number;
    }
    if (model.order_time !== 'string' && model.order_time !== '' && model.order_time !== undefined) {
      order.order_time = model.order_time;
    }
    if (model.order_time !== 'string' && model.order_time !== '' && model.order_time !== undefined) {
      order.order_time = model.order_time;
    }
    if (model.location_from) {
      order.location_from = model.location_from;
    }
    if (model.location_to) {
      order.location_to = model.location_to;
    }
    if (isValidString(model.expiry_Date)) {
      order.expiry_Date = model.expiry_Date;
    }
    if (isValidString(model.deliveryFee)) {
      order.deliveryFee = model.deliveryFee;
    }
    if (isValidString(model.preparing_time)) {
      order.preparing_time = model.preparing_time;
    }
    if (isValidString(model.deliveryAddress)) {
      order.deliveryAddress = model.deliveryAddress;
    }
    if (isValidString(model.tax)) {
      order.tax = model.tax;
    }
    if (isValidString(model.totalAmount)) {
      order.totalAmount = model.totalAmount;
    }
    if (isValidString(model.note)) {
      order.note = model.note;
    }
    if (isValidString(model.admin_note)) {
      order.admin_note = model.admin_note;
    }
    if (isValidString(model.status)) {
      order.status = model.status;
    }
    if (isValidString(model.distance)) {
      order.distance = model.distance;
    }
    if (isValidString(model.perKilometerRate)) {
      order.perKilometerRate = model.perKilometerRate;
    }
    if (model.is_activated) {
      order.is_activated = model.is_activated;
    }
    if (isValidString(model.fare)) {
      order.fare = model.fare;
    }
    await order.save();
    return order;
  }

  async searchOrder(name): Promise<Order[] | Observable<Order[]>> {
    const order = await this.orderModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drivers',
          let: { driverId: '$driver_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'customers',
          let: { customerId: '$customer_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item_id',
        },
      },
      { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          is_deleted: false,
          $or: [
            {
              'customer_id.fullname': {
                $regex: `.*${name}.*`,
                $options: 'i',
              },
            },
            {
              'driver_id.fullname': {
                $regex: `.*${name}.*`,
                $options: 'i',
              },
            },
            {
              'item_id.itemName': {
                $regex: `.*${name}.*`,
                $options: 'i',
              },
            },
            {
              'restaurant_id.name': {
                $regex: `.*${name}.*`,
                $options: 'i',
              },
            },
          ],
        },
      },
    ]);
    return order;
  }
  async filterOrder<T extends Partial<orderFilterDto>>(query: T): Promise<Order[]> {
    const is_active = JSON.parse(query.is_active as string);
    const is_inactive = JSON.parse(query.is_inactive as string);

    const pipeline = [
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drivers',
          let: { driverId: '$driver_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'customers',
          let: { customerId: '$customer_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item_id',
        },
      },
      { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
    ];

    const matchQuery = {
      $match: { $or: [] },
    };

    if (is_active) {
      matchQuery['$match']['$or'].push({ is_activated: true });
    }

    if (is_inactive) {
      matchQuery['$match']['$or'].push({ is_activated: false });
    }

    if (is_active || is_inactive) {
      pipeline.push(matchQuery as any);
    }

    if (query.date_from && query.date_to) {
      const start_date = moment(query.date_from).startOf('days').toISOString();
      const end_date = moment(query.date_to).endOf('days').toISOString();

      const date_match = {
        $match: {
          $and: [{ created_at: { $gte: new Date(start_date) } }, { created_at: { $lte: new Date(end_date) } }],
        },
      } as Record<string, any>;

      pipeline.push(date_match as any);
    }

    if (query.sort_order) {
      const sorting = {
        $sort: {
          'customer_id.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
          'driver_id.fullname': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
          'item_id.itemName': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
          'restaurant_id.name': query.sort_order === 'ascending' ? 1 : query.sort_order === 'descending' ? -1 : 1,
        },
      };

      pipeline.push({ ...sorting } as any);
    }

    const data = await this.orderModel.aggregate(pipeline);
    return data;
  }

  async generatePDF(orderId: string) {
    const [order] = await this.orderModel.aggregate([
      {
        $match: { $and: [{ _id: new Types.ObjectId(orderId) }, { is_deleted: false }] },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driver_id',
          foreignField: '_id',
          as: 'driver_id',
        },
      },
      { $unwind: { path: '$driver_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'drivers',
          let: { driverId: '$driver_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$driverId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'driver',
        },
      },
      { $unwind: { path: '$driver', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer_id',
        },
      },
      { $unwind: { path: '$customer_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'customers',
          let: { customerId: '$customer_id._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$customerId', '$user'],
                },
              },
            },
            {
              $lookup: {
                from: 'addresses',
                localField: 'address',
                foreignField: '_id',
                as: 'address',
              },
            },
            { $unwind: { path: '$address', preserveNullAndEmptyArrays: true } },
          ],
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'stores',
          localField: 'restaurant_id',
          foreignField: '_id',
          as: 'restaurant_id',
        },
      },
      { $unwind: { path: '$restaurant_id', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'items',
          localField: 'item_id',
          foreignField: '_id',
          as: 'item_id',
        },
      },
      { $unwind: { path: '$item_id', preserveNullAndEmptyArrays: true } },
    ]);
    // console.log('order ""=>>>>>>>>', order.restaurant_id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Read the HTML template from the file or provide it here
    const templateContent = fs.readFileSync('public/pdf.htm', 'utf8');
    // Replace placeholders in the template with data from orderData
    const content = templateContent
      .replace('{{order-id}}', order._id)
      .replace('{{order-date}}', order.order_time)
      .replace('{{delivery_address}}', order.deliveryAddress)
      .replace('{{itemName}}', order.item_id.itemName)
      .replace('{{itemPrice}}', order.item_id.price)
      .replace('{{itemQuantity}}', order.item_id.quantity)
      .replace('{{delivery_fee}}', order.deliveryFee)
      .replace('{{tax}}', order.tax)
      .replace('{{payment_method}}', order.payment_method)
      .replace('{{card_number}}', order.card_number)
      .replace('{{total_amount}}', order.totalAmount)
      .replace('{{restaurant_name}}', order.restaurant_id.name)
      .replace('{{restaurant_contact}}', order.restaurant_id.contact_number)
      .replace('{{driver_name}}', order.driver_id.fullname)
      .replace('{{driver_contact}}', order.driver_id.contact_number)
      .replace('{{notes}}', order.note);

    await page.setContent(content);

    const outputPath = join(process.cwd(), `${Date.now()}.pdf`);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
    console.log('PDF generated successfully at', outputPath);
    return order;
  }
}
