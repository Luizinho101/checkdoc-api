const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const { validarCpfController } = require('../src/controllers/cpfController')

const swaggerDocument = require(path.join(__dirname, '../swagger.json'));

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
  res.json({ 
    status: "online",
    message: "CheckDoc API está online e operando com sucesso!" 
  });
});


app.get('/cpf', validarCpfController);




if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[OK] Servidor rodando em http://localhost:${PORT}`);
    console.log(`[DOC] Swagger UI disponível em http://localhost:${PORT}/api-docs`);
  });
}


module.exports = app;