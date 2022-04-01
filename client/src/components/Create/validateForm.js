export function validate(input) {
  let errors = {};
  const urlOK = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/gi;
  const numberExpresion = /^-?\d*(\.\d+)?$/;
  //   El método search() y test() ejecutan una búsqueda que encaje entre una expresión regular y el objeto desde el que se llama.

  //Name:

  if (!input.name) {
    errors.name = "Debes ingresar un nombre para el Pokemon.";
  } else if (input.name.search(/^[a-zA-Zñáéíóúü]*$/)) {
    //Valido el input con expresion regular.
    errors.name =
      "El nombre no puede contener numeros o caracteres especiales.";
  }
  if (input.name.length > 23) {
    errors.name = "El nombre no puede exceder los 23 caracteres";
  }

  //Image:

  if (input.image && urlOK.test(input.image)) {
    errors.image = "Debes ingresar una URL valida";
  }

  //Life

  if (input.life < 1 || input.life > 100) {
    errors.life = "El valor de la vida no puede ser menor a 1 ni mayor a 100.";
  } else if (input.life.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.life = "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  //Attack

  if (input.attack < 1 || input.attack > 350) {
    errors.attack = "El poder de Ataque no puede ser menor a 1 ni mayor a 350.";
  } else if (input.attack.search(numberExpresion)) {
    errors.attack =
      "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  //Defense

  if (input.defense < 1 || input.defense > 350) {
    errors.defense = "La defensa no puede ser menor a 1 ni mayor a 350.";
  } else if (input.defense.search(numberExpresion)) {
    errors.defense =
      "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  //Speed:

  if (input.speed < 1 || input.speed > 100) {
    errors.speed = "La velocidad no puede ser menor a 1 ni mayor a 100.";
  } else if (input.speed.search(numberExpresion)) {
    errors.speed =
      "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  //Height

  if (input.height < 1 || input.height > 50) {
    errors.height = "El valor no puede ser menor a 1 ni mayor a 50 ";
  } else if (input.height.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.height =
      "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  //Weight

  if (input.weight < 0 || input.weight > 1000) {
    errors.weight = "El valor no puede ser menor a 1 ni mayor a 1000 ";
  } else if (input.weight.search(numberExpresion)) {
    //Valido el input con expresion regular.
    errors.weight =
      "El valor ingresado debe ser solo numero. ¡Intenta de nuevo!";
  }

  if (!input.types) {
    errors.types = "Debes seleccionar al menos un Typo.";
  } else if (input.types.length > 2) {
    errors.types = "Solo se admiten dos tipos";
  }

  return errors;
}
