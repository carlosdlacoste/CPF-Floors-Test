# Juliam Corp - Sistema de Gestión de Inventarios (MVP)

Este repositorio contiene la solución desarrollada para la prueba técnica de **Juliam Corp**, enfocada en resolver la dispersión de información y el descontrol de inventario mediante una plataforma web centralizada y dockerizada.

## 📋 Descripción del Proyecto

El proyecto proporciona un MVP funcional para la gestión y validación de stock en tiempo real. Permite al personal de almacén y gerencia registrar entradas y salidas de mercancía, garantizando la integridad de las existencias y evitando pérdidas operativas en la línea de despacho.

### Características Principales

* **Gestión de Stock:** Registro de entradas y salidas con validación inmediata de disponibilidad.

* **Entorno Aislado:** Containerización completa de servicios mediante Docker y Docker Compose.

* **Documentación Estratégica:** Diagnóstico operativo y propuesta de arquitectura escalable a largo plazo.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js / Vite

* **Backend:** NestJS (Node.js)

* **Contenedores:** Docker & Docker Compose

* **Control de Versiones:** Git / GitHub

## 🚀 Requisitos Previos

Para ejecutar este proyecto en cualquier máquina solo se requiere:

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.

* Git (para clonar el repositorio).

*No es necesario tener instalado Node.js ni configurar entornos locales manualmente.*

## ⚡ Instalación y Ejecución con Docker

1. **Clonar el repositorio:**

   ```
   git clone https://github.com/carlosdlacoste/CPF-Floors-Test.git
   cd mvp
   
   ```

2. **Asegurarse de que Docker Desktop esté abierto** (verificar que el motor de Docker esté activo).

3. **Levantar los servicios:**
   Ejecuta el siguiente comando en la raíz del proyecto para construir las imágenes y levantar los contenedores:

   ```
   docker-compose up --build
   
   ```

4. **Acceso a la Aplicación:**
   Una vez completada la construcción, accede desde tu navegador web a:

   * **Frontend (Interfaz de Usuario):** `http://localhost:5173`

   * **Backend (API NestJS):** `http://localhost:3000`

## 🛑 Detener la Aplicación

Para apagar los contenedores de forma segura, presiona `Ctrl + C` en la terminal donde se ejecuta el comando y corre:

```
docker-compose down

```

O bien, puedes detener el contenedor directamente desde la interfaz gráfica de **Docker Desktop**.

## 📄 Documentación Incluida

En la carpeta `/diagnosis` encontrarás el análisis diagnostico del problema:

* `diagnosis.md`: Evaluación del problema y solucion propuesta.

En la carpeta `/contingency` encontrarás la solucion de inteligencia operativa:

* `Inventario_Contingencia_JuliamCorp.xlsx`: plantilla operativa de Excel con la informacion centralizada.

* `User-Manual-Inventory-Contingency-System.md`: manual de uso paso a paso para el operador final sobre la solucion de inteligencia operativa.

En la carpeta `/proposal` encontrarás la propuesta estructurada para la solucion a largo plazo:

* `propuesta-arquitectura.md`: Hoja de ruta estratégica para la evolución del sistema a mediano/largo plazo (ERP/WMS, automatizaciones con n8n e integración con IA).