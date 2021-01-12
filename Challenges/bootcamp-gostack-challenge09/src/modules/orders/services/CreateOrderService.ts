import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existentsProduct = await this.productsRepository.findAllById(
      products,
    );

    if (!existentsProduct.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existentProductIds = existentsProduct.map(product => product.id);

    const checkInexistentProduct = products.filter(
      product => !existentProductIds.includes(product.id),
    );

    if (checkInexistentProduct.length) {
      throw new AppError(
        `Could not find any product ${checkInexistentProduct[0].id}`,
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        existentsProduct.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(
        `The quantity ${findProductsWithNoQuantityAvailable[0].quantity}
         is not available for ${findProductsWithNoQuantityAvailable[0].id}`,
      );
    }

    const serializedProduct = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentsProduct.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProduct,
    });

    const orderProductsQuantity = products.map(product => ({
      id: product.id,
      quantity:
        existentsProduct.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
