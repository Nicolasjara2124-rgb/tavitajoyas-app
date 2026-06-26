import TablaCobranzas from "./components/TablaCobranzas";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sistema TAVITAJOYAS</h1>
      
      <TablaCobranzas />
      
    </main>
  );
}