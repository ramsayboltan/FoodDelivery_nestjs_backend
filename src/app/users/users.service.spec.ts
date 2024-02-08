import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
// <!-- <!-- <script>
//         const order = {
//             orderId: '123456',
//             orderDate: 'September 15, 2023',
//             deliveryAddress: '123 Main Street, City, ZIP',
//             items: [
//                 { itemName: 'Burger', quantity: 2, price: 5.99 },
//                 { itemName: 'Pizza', quantity: 1, price: 12.99 },
//             ],
//             deliveryFee: 2.99,
//             tax: 1.5,
//             paymentMethod: 'Online Payment',
//             cardNumber: '**** **** **** 1234', // Last few digits
//             totalAmount: 25.47,
//             restaurantName: 'Foodie Paradise',
//             restaurantContact: '123-456-7890',
//             driverName: 'John Doe',
//             driverContact: '987-654-3210',
//             notes: 'Please deliver as soon as possible.',
//         }; -->

//     // Populate the HTML elements with order information
//     document.getElementById('order-id').textContent = order.orderId;
//     document.getElementById('order-date').textContent = order.orderDate;
//     document.getElementById('delivery-address').textContent = order.deliveryAddress;
//     const itemsList = document.getElementById('items-list');
//     order.items.forEach(item => {
//         const li = document.createElement('li');
//         li.textContent = `${item.itemName} (Quantity: ${item.quantity}, Price: $${item.price})`;
//         itemsList.appendChild(li);
//     });
//     document.getElementById('delivery-fee').textContent = order.deliveryFee;
//     document.getElementById('tax').textContent = order.tax;
//     document.getElementById('payment-method').textContent = order.paymentMethod;
//     document.getElementById('card-number').textContent = order.cardNumber;
//     document.getElementById('total-amount').textContent = order.totalAmount;
//     document.getElementById('restaurant-name').textContent = order.restaurantName;
//     document.getElementById('restaurant-contact').textContent = order.restaurantContact;
//     document.getElementById('driver-name').textContent = order.driverName;
//     document.getElementById('driver-contact').textContent = order.driverContact;
//     document.getElementById('notes').textContent = order.notes;
// </script> -->
