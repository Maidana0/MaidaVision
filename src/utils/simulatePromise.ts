
const simulatePromise = (time: number = 3000, valor: boolean = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valor) {
        resolve("Operación simulada exitosa");
      } else {
        reject("Operación simulada fallida");
      }
    }, time);
  });
};

export default simulatePromise