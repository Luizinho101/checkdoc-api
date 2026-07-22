const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const { validarCpfController } = require('../src/controllers/cpfController');

const swaggerDocument = require(path.join(process.cwd(), 'swagger.json'));

const app = express();
app.use(express.json());

const swaggerOptions = {
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css',
  ],
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js'
  ],
  
  explorer: false, 
};


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
// ------------------------------------------------


app.get('/', (req, res) => {
  res.json({ 
    status: "online",
    message: "CheckDoc API está online e operando com sucesso!" 
  });
});

app.post('/cpf', validarCpfController);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[OK] Servidor rodando em http://localhost:${PORT}`);
    console.log(`[DOC] Swagger UI disponível em http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;