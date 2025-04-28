import CommandTrigger from 'maidana07/components/search/command-trigger';


export default function SearchPage() {

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center">Buscador Avanzado</h1>
      <CommandTrigger />

    </div>
  );
}