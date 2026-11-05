import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';

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

  // Estados para el formulario de nuevo movimiento
  const [type, setType] = useState<'ENTRADA' | 'SALIDA'>('ENTRADA');
  const [sku, setSku] = useState<string>('CONT-001');
  const [quantity, setQuantity] = useState<number>(10);
  const [responsible, setResponsible] = useState<string>('Carlos');

  // Función para cargar los datos del backend
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

  // Manejar el envío del formulario
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

      // Limpiar y recargar los datos para ver el stock actualizado al instante
      alert('Movimiento registrado con éxito');
      fetchData();
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      alert('Hubo un error al registrar el movimiento');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>📦 Sistema de Inventario - Juliam Corp</h1>
      <p>Panel de control logístico en tiempo real.</p>

      {/* Formulario para registrar entradas/salidas */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>Registrar Nuevo Movimiento</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Movimiento:</label>
            <select value={type} onChange={(e) => setType(e.target.value as 'ENTRADA' | 'SALIDA')} style={{ width: '100%', padding: '8px' }}>
              <option value="ENTRADA">ENTRADA (Compra / Ingreso)</option>
              <option value="SALIDA">SALIDA (Despacho / Consumo)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Producto (SKU):</label>
            <select value={sku} onChange={(e) => setSku(e.target.value)} style={{ width: '100%', padding: '8px' }}>
              {products.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Responsable:</label>
            <input
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" style={{ background: '#0070f3', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Guardar Movimiento
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de Stock Actual */}
      <h3>Estado Actual del Inventario</h3>
      {loading ? (
        <p>Cargando inventario...</p>
      ) : (
        <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>SKU</th>
              <th>Producto</th>
              <th>Entradas</th>
              <th>Salidas</th>
              <th>Stock Disponible</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.totalEntradas}</td>
                <td>{item.totalSalidas}</td>
                <td><strong>{item.stockDisponible}</strong></td>
                <td style={{ color: item.estado.includes('REABASTECER') ? 'red' : 'green', fontWeight: 'bold' }}>
                  {item.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;