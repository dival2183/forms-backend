const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Esquema y modelo de inscripción
const inscripcionSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  email: String,
  telefono: String,
  edad: Number,
  genero: String,
  categoria: String,
  egreso: Number,
  hijosInfo: String,
  pruebas: [String],
  entrenamiento: String,
  disponibilidad: String,
  condicionMedica: String,
  contactoEmergencia: String,
  comentarios: String,
  fecha: { type: Date, default: Date.now }
});

const Inscripcion = mongoose.model('Inscripcion', inscripcionSchema);

app.post('/api/inscripcion', async (req, res) => {
  try {
    const inscripcion = new Inscripcion(req.body);
    await inscripcion.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error al guardar inscripción:', error);
    res.status(500).json({ success: false, error: 'Error al guardar inscripción' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
