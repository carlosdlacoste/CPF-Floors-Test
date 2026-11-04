# Diagnóstico Inicial: Resolución de Incidencias e Infraestructura de Inventario
**Empresa:** Juliam Corp LLC  
**Rol:** Desarrollador / Especialista Técnico  
**Fase:** 1 - Diagnóstico Operativo y Estructura de Datos Mínima  

---

## 1. Resumen Ejecutivo
El colapso actual en el almacén central de Juliam Corp no responde a un fallo tecnológico aislado, sino a una ruptura en la **fuente única de verdad** de la información. La combinación de archivos de Excel fragmentados, macros sin control centralizado y la incorporación de personal nuevo sin un proceso de *onboarding* estandarizado ha generado silos de datos, desactualización del stock en tiempo real y cuellos de botella críticos en la operación diaria.

---

## 2. Causas Raíz del Problema
* **Descentralización de la Información:** Creación paralela de múltiples archivos de Excel por parte del personal nuevo, lo que fragmentó los registros y rompió la sincronía del stock real.
* **Falta de Estandarización y Onboarding:** Ausencia de una capacitación inicial clara sobre el uso, mantenimiento y exclusividad de las herramientas de control ya existentes en la empresa.
* **Gestión Frágil:** Dependencia de macros configuradas empíricamente sin validación de integridad o restricciones de edición, facilitando errores humanos y pérdida de trazabilidad.

---

## 3. Procesos de Negocio Más Impactados
El impacto operativo se concentra directamente en la **Línea de Despacho, Ventas y Atención al Cliente**:
* **Filas Eternas y Retrasos:** Al no contar con visibilidad real del stock en bodega, el personal de despacho no puede confirmar entregas de inmediato, deteniendo el flujo operativo.
* **Pérdida de Clientes y Ventas Diarias:** Clientes esperando o marchándose ante la incapacidad de procesar sus pedidos con agilidad.
* **Riesgo Financiero por Quiebre de Stock:** Imposibilidad de planificar compras precisas a distribuidores, exponiendo a la empresa a pérdidas económicas directas.

---

## 4. Estructura de Datos Mínima Necesaria (Solución de Contingencia)
Para retomar el control operativo de inmediato y unificar los datos dispersos en una sola matriz de emergencia, la estructura de datos mínima requerida es la siguiente:

### Matriz de Control de Inventario (Excel / Hoja Única)
1. **Catálogo / Identificación del Insumo:**
   * Código de Producto / SKU
   * Descripción del artículo (ej. contenedores, vasos, servilletas)
2. **Control de Movimientos (Entradas y Salidas):**
   * Fecha y Hora del movimiento
   * Tipo de Movimiento (`Entrada` por compra a distribuidor / `Salida` por venta o despacho)
   * Cantidad (unidades)
   * Responsable / Operador que registra
3. **Stock Actual Consolidado:**
   * Stock Inicial + Total Entradas - Total Salidas = **Stock Real Disponible**