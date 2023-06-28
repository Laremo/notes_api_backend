const EjemploMap = () => {
  const materias = [
    {
      nombre: 'Algebra',
      maestro: 'Urzua',
      dificultad: 1,
    },
    {
      nombre: 'Bioquimica',
      maestro: 'Martha',
      dificultad: 5,
    },
    {
      nombre: 'POO',
      maestro: 'Padilla',
      dificultad: 3,
    },
    {
      nombre: 'Bases de Datos',
      maestro: 'Lariz',
      dificultad: 5,
    },
  ];

  const resultados = materias.map((materia) => {
    console.log(`Materia: ${materia.nombre}`);
    console.log(`Maestro: ${materia.maestro}`);
    console.log(
      `${
        materia.dificultad >= 4
          ? 'Esta materia es muy dificil'
          : materia.dificultad >= 2 && materia.dificultad < 4
          ? 'Esta materia es medianamente dificil'
          : 'Esta materia es facil'
      } `
    );
  });
};

EjemploMap();
