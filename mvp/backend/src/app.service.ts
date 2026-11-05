import { Injectable, BadRequestException } from '@nestjs/common';

// Definimos la estructura de un Producto y un Movimiento
export interface Product {
  sku: string;
  name: string;
  category: string;
  minStock: number;
}

export interface Movement {
  id: number;
  date: string;
  type: 'ENTRADA' | 'SALIDA';
  sku: string;
  quantity: number;
  responsible: string;
}

@Injectable()
export class AppService {
  // Simulación de la base de datos en memoria (nuestro catálogo inicial)
  private products: Product[] = [
    { sku: 'CONT-001', name: 'Contenedor Plástico 16oz', category: 'Contenedores', minStock: 100 },
    { sku: 'VAS-001', name: 'Vaso Plástico 12oz', category: 'Vasos', minStock: 150 },
  ];

  // Simulación de los movimientos iniciales
  private movements: Movement[] = [
    { id: 1, date: '2026-11-01', type: 'ENTRADA', sku: 'CONT-001', quantity: 500, responsible: 'Carlos' },
    { id: 2, date: '2026-11-02', type: 'SALIDA', sku: 'CONT-001', quantity: 120, responsible: 'Carlos' },
  ];

  // 1. Obtener el Catálogo
  getProducts(): Product[] {
    return this.products;
  }

  // 2. Obtener los Movimientos
  getMovements(): Movement[] {
    return this.movements;
  }

  // 3. Registrar un nuevo Movimiento (Entrada o Salida)
  addMovement(movementData: Omit<Movement, 'id'>): Movement {
    if (movementData.type === 'SALIDA') {
      const currentStock = this.getStockStatus();
      const productStock = currentStock.find(item => item.sku === movementData.sku);

      const available = productStock ? productStock.stockDisponible : 0;

      if (available < movementData.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para el SKU ${movementData.sku}. Disponible: ${available}, solicitado: ${movementData.quantity}`
        );
      }
    }

    const newId = this.movements.length + 1;
    const newMovement: Movement = { id: newId, ...movementData };
    this.movements.push(newMovement);
    return newMovement;
  }

  // 4. Calcular el Stock Actual
  getStockStatus() {
    return this.products.map((product) => {
      const totalEntradas = this.movements
        .filter((m) => m.sku === product.sku && m.type === 'ENTRADA')
        .reduce((sum, m) => sum + m.quantity, 0);

      const totalSalidas = this.movements
        .filter((m) => m.sku === product.sku && m.type === 'SALIDA')
        .reduce((sum, m) => sum + m.quantity, 0);

      const stockDisponible = totalEntradas - totalSalidas;
      const estado = stockDisponible <= product.minStock ? '⚠️ REABASTECER' : '✅ OK';

      return {
        sku: product.sku,
        name: product.name,
        totalEntradas,
        totalSalidas,
        stockDisponible,
        estado,
      };
    });
  }
}
