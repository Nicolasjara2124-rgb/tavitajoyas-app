import TablaCobranzas from "./components/TablaCobranzas";
import FormularioNuevaVenta from "./components/FormularioNuevaVenta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sistema TAVITAJOYAS</h1>
      
      {/* Aquí insertamos el componente para agregar nuevas clientas */}
      <div className="mb-8">
        <FormularioNuevaVenta />
      </div>
      
      {/* Aquí abajo queda tu tabla */}
      <TablaCobranzas />
      
    </main>
  );
}