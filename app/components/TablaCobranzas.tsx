'use client';
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function TablaCobranzas() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('Todas');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'ventas_credito'), (snapshot) => {
      setVentas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const hoy = new Date();
  const mesActual = hoy.getMonth();

  const totalVendidoMes = ventas
    .filter(v => new Date(v.fecha_venta).getMonth() === mesActual)
    .reduce((acc, v) => acc + v.monto_total, 0);

  const totalRecaudado = ventas.reduce((acc, v) => acc + (v.total_abonado || 0), 0);
  const totalPendiente = ventas.reduce((acc, v) => acc + v.saldo_pendiente, 0);

  const getFechaVencimiento = (fechaUltimoPago: string) => {
    const d = new Date(fechaUltimoPago);
    d.setMonth(d.getMonth() + 1);
    return d;
  };

  const registrarAbono = async (v: any) => {
    const monto = prompt(`Saldo pendiente: $${v.saldo_pendiente.toLocaleString('es-CL')}. ¿Cuánto abonó?`);
    if (monto && !isNaN(Number(monto))) {
      await updateDoc(doc(db, 'ventas_credito', v.id), {
        total_abonado: (v.total_abonado || 0) + Number(monto),
        saldo_pendiente: v.saldo_pendiente - Number(monto),
        ultima_fecha_pago: new Date().toISOString().split('T')[0],
        estado: (v.saldo_pendiente - Number(monto)) <= 0 ? 'pagado' : 'pendiente'
      });
    }
  };

  const eliminarVenta = async (id: string, nombre: string) => {
    if (confirm(`¿Eliminar la cuenta de ${nombre}?`)) {
      await deleteDoc(doc(db, 'ventas_credito', id));
    }
  };

  const ventasFiltradas = ventas.filter(v => {
    if (v.estado === 'pagado') return false;
    const fechaVencimiento = getFechaVencimiento(v.ultima_fecha_pago);
    const esAtrasada = fechaVencimiento < hoy;
    if (filtro === 'Atrasadas') return esAtrasada;
    if (filtro === 'Al día') return !esAtrasada;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Tavitajoyas - Gestión</h1>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg text-center border border-blue-300">
          <p className="text-[10px] font-bold text-blue-800">VENTAS MES</p>
          <p className="font-bold text-black">${totalVendidoMes.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg text-center border border-green-300">
          <p className="text-[10px] font-bold text-green-800">RECAUDADO</p>
          <p className="font-bold text-black">${totalRecaudado.toLocaleString('es-CL')}</p>
        </div>
        <div className="bg-orange-100 p-3 rounded-lg text-center border border-orange-300">
          <p className="text-[10px] font-bold text-orange-800">PENDIENTE</p>
          <p className="font-bold text-black">${totalPendiente.toLocaleString('es-CL')}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['Todas', 'Atrasadas', 'Al día'].map(f => (
          <button key={f} onClick={() => setFiltro(f)} className={`px-4 py-2 rounded text-sm font-bold border ${filtro === f ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white border-2 border-gray-800 rounded-xl overflow-x-auto shadow-lg">
        <table className="w-full text-left text-sm min-w-[700px]">
          <thead className="bg-gray-200 border-b-2 border-gray-800">
            <tr>
              <th className="p-3 text-black">#</th>
              <th className="p-3 text-black">Clienta</th>
              <th className="p-3 text-black">Joya</th>
              <th className="p-3 text-black">Saldos</th>
              <th className="p-3 text-black">Vence</th>
              <th className="p-3 text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map((v, index) => {
              const fechaVencimiento = getFechaVencimiento(v.ultima_fecha_pago);
              const esAtrasada = fechaVencimiento < hoy;
              const mensaje = `Hola ${v.nombre_clienta}, te saluda Tavitajoyas. Te escribo por tu joya "${v.producto}" comprada el ${v.fecha_venta}. Tienes un saldo pendiente de $${v.saldo_pendiente.toLocaleString('es-CL')}. Te recordamos realizar un abono. ¡Muchas gracias!`;
              const linkWsp = `https://wa.me/${v.whatsapp_clienta}?text=${encodeURIComponent(mensaje)}`;

              return (
                <tr key={v.id} className={`border-b border-gray-300 ${esAtrasada ? 'bg-red-100' : ''}`}>
                  <td className="p-3 font-bold text-black">{index + 1}</td>
                  <td className="p-3 font-bold text-black">{v.nombre_clienta}</td>
                  <td className="p-3 text-black text-xs">{v.producto}</td>
                  <td className="p-3 text-black">
                    <div className="text-xs">Tot: ${v.monto_total.toLocaleString('es-CL')}</div>
                    <div className="text-sm text-red-700 font-bold">Falta: ${v.saldo_pendiente.toLocaleString('es-CL')}</div>
                  </td>
                  <td className="p-3 text-black font-bold text-xs">{fechaVencimiento.toLocaleDateString('es-CL')}</td>
                  <td className="p-3 flex gap-1">
                    <a href={linkWsp} target="_blank" className="bg-green-600 text-white px-2 py-1 rounded font-bold text-xs">Wsp</a>
                    <button onClick={() => registrarAbono(v)} className="bg-blue-700 text-white px-2 py-1 rounded font-bold text-xs">Abonar</button>
                    <button onClick={() => eliminarVenta(v.id, v.nombre_clienta)} className="bg-red-600 text-white px-2 py-1 rounded font-bold text-xs">X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}