# Manual de Uso: Sistema de Contingencia de Inventario
**Destinado a:** Equipo de Almacén y Operadores de Despacho  
**Objetivo:** Garantizar la trazabilidad y el control de stock inmediato.

---

## 1. Registro de Entradas (Llegada de Insumos)
Cada vez que un proveedor entregue insumos en el almacén:
1. Abra el archivo `Inventario_Contingencia_JuliamCorp.xlsx`.
2. Vaya a la pestaña **`Movimientos`**.
3. En una nueva fila, ingrese:
   - **Fecha:** Fecha del día (`AAAA-MM-DD`).
   - **Tipo:** Escriba `ENTRADA`.
   - **SKU:** Ingrese el código exacto del producto (consulte la pestaña `Catalogo` si no lo conoce).
   - **Cantidad:** Número de unidades recibidas.
   - **Responsable:** Su nombre o iniciales.

---

## 2. Registro de Salidas (Despacho a Clientes)
Cada vez que se prepare un pedido para despacho:
1. Vaya a la pestaña **`Movimientos`**.
2. En una nueva fila, ingrese:
   - **Fecha:** Fecha del día.
   - **Tipo:** Escriba `SALIDA`.
   - **SKU:** Código del producto despachado.
   - **Cantidad:** Número de unidades que salen del almacén.
   - **Responsable:** Su nombre.

---

## 3. Verificación de Stock y Reabastecimiento
- Para conocer cuánto stock real queda disponible de cualquier producto, **no cuente manualmente**. Diríjase únicamente a la pestaña **`Stock_Actual`**.
- Si la columna **Estado** muestra `⚠️ REABASTECER`, notifique inmediatamente al área de compras.