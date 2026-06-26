import TablaCobranzas from "./components/TablaCobranzas";
import FormularioNuevaVenta from "./components/FormularioNuevaVenta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-200 text-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 drop-shadow-sm">Sistema TAVITAJOYAS</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <FormularioNuevaVenta />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <TablaCobranzas />
      </div>
      
    </main>
  );
}