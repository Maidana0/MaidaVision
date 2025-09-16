


const Biography = ({ biography, name }: { biography: string, name: string }) => {
  return (
    <div className="md:max-w-8/12 w-full max-w-full space-y-2">
      <h1 className="text-4xl font-bold md:block hidden">
        {name}
      </h1>

      <div className="text-balance px-4 py-3 max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">Biografía</h2>
        {
          biography
            ? biography.split("\n").map((paragraph, index) => {
              return paragraph != "" && (
                <p className="text-lg leading-7 brightness-90" key={index + "-paragraph"}>
                  {paragraph}
                  {index != biography.split("\n").length - 1 && <span className="block h-[1px] rounded-2xl bg-muted-foreground/25 my-3 w-10/11 mx-auto"></span>}
                </p>
              );
            })
            : <p className="text-lg leading-7 brightness-90">No hay biografía disponible para {name}.</p>
        }
      </div>
    </div>
  )
}

export default Biography