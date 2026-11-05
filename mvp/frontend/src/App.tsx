import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import styles from './App.module.css';

interface StockItem {
  sku: string;
  name: string;
  totalEntradas: number;
  totalSalidas: number;
  stockDisponible: number;
  estado: string;
}

interface Product {
  sku: string;
  name: string;
}

function App() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [type, setType] = useState<'ENTRADA' | 'SALIDA'>('ENTRADA');
  const [sku, setSku] = useState<string>('CONT-001');
  const [quantity, setQuantity] = useState<string>('10');
  const [responsible, setResponsible] = useState<string>('Carlos');

  const fetchData = async () => {
    try {
      const [stockRes, productsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/stock'),
        axios.get('http://localhost:3000/api/products'),
      ]);
      setStock(stockRes.data);
      setProducts(productsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/movements', {
        date: new Date().toISOString().split('T')[0],
        type,
        sku,
        quantity: Number(quantity),
        responsible,
      });

      alert('Movimiento registrado con éxito');
      fetchData();
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Hubo un error al registrar el movimiento'
        : 'Hubo un error al registrar el movimiento';
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Encabezado */}
        <header className={styles.header}>
          <h1 className={styles.title}>📦 Sistema de Inventario — Juliam Corp</h1>
          <p className={styles.subtitle}>Panel de control logístico y seguimiento de stock en tiempo real.</p>
        </header>

        {/* Formulario de Movimientos */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Registrar Nuevo Movimiento</h3>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de Movimiento:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'ENTRADA' | 'SALIDA')}
                className={styles.select}
              >
                <option value="ENTRADA">ENTRADA (Ingreso)</option>
                <option value="SALIDA">SALIDA (Despacho)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Producto (SKU):</label>
              <select
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className={styles.select}
              >
                {products.map((p) => (
                  <option key={p.sku} value={p.sku}>
                    {p.name} ({p.sku})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Cantidad:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Responsable:</label>
              <input
                type="text"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className={styles.button}>
                Guardar Movimiento
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Estado del Inventario */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Estado Actual del Inventario</h3>
          
          {loading ? (
            <p className={styles.subtitle}>Cargando inventario...</p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>SKU</th>
                    <th className={styles.th}>Producto</th>
                    <th className={`${styles.th} ${styles.textCenter}`}>Entradas</th>
                    <th className={`${styles.th} ${styles.textCenter}`}>Salidas</th>
                    <th className={`${styles.th} ${styles.textCenter}`}>Stock Disponible</th>
                    <th className={`${styles.th} ${styles.textCenter}`}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((item) => (
                    <tr key={item.sku}>
                      <td className={`${styles.td} ${styles.fwBold}`}>{item.sku}</td>
                      <td className={styles.td}>{item.name}</td>
                      <td className={`${styles.td} ${styles.textCenter}`}>{item.totalEntradas}</td>
                      <td className={`${styles.td} ${styles.textCenter}`}>{item.totalSalidas}</td>
                      <td className={`${styles.td} ${styles.textCenter} ${styles.fwBold}`}>{item.stockDisponible}</td>
                      <td className={`${styles.td} ${styles.textCenter} ${item.estado.includes('REABASTECER') ? styles.statusAlert : styles.statusOk}`}>
                        {item.estado}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;