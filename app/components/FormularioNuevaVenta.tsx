"use client";
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FormularioNuevaVenta() {
  const [datos, setDatos] = useState({
    nombre: '',
    whatsapp: '569',
    producto: '',
    monto: '',
    fecha: new Date().toISOString().split('T')[0]
  });
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    try {
      await addDoc(collection(db, 'ventas_credito'), {
        nombre_clienta: datos.nombre,
        whatsapp_clienta: datos.whatsapp.replace(/\D/g, ''),
        producto: datos.producto,
        monto_total: Number(datos.monto),
        saldo_pendiente: Number(datos.monto),
        total_abonado: 0,
        fecha_venta: datos.fecha,
        ultima_fecha_pago: datos.fecha,
        estado: 'pendiente'
      });
      
      // Limpiamos los datos INMEDIATAMENTE sin interrupciones de alertas
      setDatos({ nombre: '', whatsapp: '569', producto: '', monto: '', fecha: new Date().toISOString().split('T')[0] });
      
    } catch (error) {
      console.error("Error al guardar en base de datos:", error);
    } finally {
      // Forzamos que el botón se libere sí o sí
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
      <h2 className="text-2xl font-bold text-black underline mb-4">Tavitajoyas - Nueva Venta</h2>
      <input type="text" placeholder="Nombre Clienta" required className="w-full border-2 border-gray-600 p-2 mb-3 rounded" value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} />
      <input type="tel" placeholder="WhatsApp" required className="w-full border-2 border-gray-600 p-2 mb-3 rounded" value={datos.whatsapp} onChange={(e) => setDatos({...datos, whatsapp: e.target.value})} />
      <input type="text" placeholder="Joya comprada" required className="w-full border-2 border-gray-600 p-2 mb-3 rounded" value={datos.producto} onChange={(e) => setDatos({...datos, producto: e.target.value})} />
      <input type="number" placeholder="Monto Total ($)" required className="w-full border-2 border-gray-600 p-2 mb-3 rounded" value={datos.monto} onChange={(e) => setDatos({...datos, monto: e.target.value})} />
      <div className="pt-2">
        <label className="block text-sm font-bold text-black mb-1">Fecha de compra:</label>
        <input type="date" required className="w-full border-2 border-gray-600 p-3 mb-4 rounded" value={datos.fecha} onChange={(e) => setDatos({...datos, fecha: e.target.value})} />
      </div>
      <button disabled={cargando} className="w-full bg-black text-white p-4 rounded-md font-bold text-lg hover:bg-gray-800 transition-colors">
        {cargando ? 'Registrando...' : 'Registrar Venta'}
      </button>
    </form>
  );
}