
function gerarDigito(numerosBase) {
  let contador = numerosBase.length + 1;
  let somador = 0;

  numerosBase.forEach(numero => {
    somador += numero * contador;
    contador--;
  });

  let resto = (somador * 10) % 11;
  return resto === 10 ? 0 : resto;
}


const validarCpfController = (req, res) => {

  const { cpf } = req.body;


  if (!cpf) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "O campo 'cpf' é obrigatório no corpo da requisição."
    });
  }

  const apenasNumeros = String(cpf).replace(/\D/g, '');

  if (apenasNumeros.length !== 11) {
    return res.status(200).json({
      cpf: apenasNumeros,
      valido: false,
      mensagem: "CPF inválido. O documento deve possuir 11 dígitos."
    });
  }

  const cpfConvertido = apenasNumeros.split('').map(Number);


  const primeiroDigito = gerarDigito(cpfConvertido.slice(0, 9));
  const segundoDigito = gerarDigito(cpfConvertido.slice(0, 10));

  const ehValido = (cpfConvertido[9] === primeiroDigito && cpfConvertido[10] === segundoDigito);

  return res.status(200).json({
    cpf: apenasNumeros,
    valido: ehValido,
    mensagem: ehValido ? "CPF válido!" : "CPF inválido!"
  });
};

module.exports = {
  validarCpfController
};