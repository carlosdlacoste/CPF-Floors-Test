import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService, Movement } from './app.service.js';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('movements')
  getMovements() {
    return this.appService.getMovements();
  }

  @Get('stock')
  getStock() {
    return this.appService.getStockStatus();
  }

  @Post('movements')
  createMovement(@Body() movementData: Omit<Movement, 'id'>) {
    return this.appService.addMovement(movementData);
  }
}
