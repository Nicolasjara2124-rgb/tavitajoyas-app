import FormularioNuevaVenta from './components/FormularioNuevaVenta';
import TablaCobranzas from './components/TablaCobranzas';

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 p-4">
      <h1 className="text-center text-3xl font-bold text-black mb-8">Tavitajoyas</h1>
      <FormularioNuevaVenta />
      <div className="mt-8">
        <TablaCobranzas />
      </div>
    </main>
  );
}