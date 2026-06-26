import TablaCobranzas from "./components/TablaCobranzas";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sistema TAVITAJOYAS</h1>
      
      {/* Aquí estamos "llamando" a tu componente para que se muestre en la portada */}
      <TablaCobranzas />
      
    </main>
  );
}