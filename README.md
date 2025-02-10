# Prueba-Back

## 🏆 API REST - Torneo de Cocina con Node.js, Express y MongoDB

Este es un proyecto **API RESTful** que gestiona un torneo de cocina en el que participan chefs profesionales. La API permite:

- Registrar chefs con sus especialidades.
- Crear torneos con un número limitado de participantes.
- Registrar chefs en los torneos.
- Enviar resultados de puntajes para cada chef.
- Consultar un ranking de los chefs en cada torneo.
- Guardar la información en **MongoDB**.

---

## 📌 1. Instalación del Proyecto

### **1️⃣ Requisitos Previos**

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) `>= 14.x`
- [MongoDB](https://www.mongodb.com/try/download/community) `>= 4.x`
- [Postman](https://www.postman.com/) (opcional, pero recomendado para pruebas)

### **2️⃣ Clonar el Proyecto**

```bash
  https://github.com/Yolian007/Prueba-Back.git
  cd Prueba-Back
```

### **3️⃣ Instalar Dependencias**

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
  npm install
```

### **4️⃣ Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto y agrega:

```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/torneo_cocina
JWT_SECRET=mi_super_secreto
```

### **5️⃣ Iniciar MongoDB**

- Abre MongoDB y agrega una nueva conección.
- Deja la URI por defecto y nombra a la conección **torneo_cocina**
- Guarda e inicia la conneción

### **6️⃣ Iniciar el Servidor**

Ejecuta el siguiente comando:

```bash
  node index.js
```

Si todo está correcto, deberías ver algo como:

```
✅ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:3000
```

---

## 📌 2. Endpoints y Ejemplos de Uso

### **🧑‍🍳 Registrar un Chef**

**POST** `/api/chefs`

```json
{
  "name": "Carlos Gómez",
  "specialty": "Cocina Francesa",
  "experienceYears": 10,
  "category": "Platos principales"
}
```

**Respuesta esperada:**

```json
{
  "message": "Chef registrado exitosamente",
  "chef": { "_id": "65a9b6f1e3d4c8d1e3a2b456", "name": "Carlos Gómez", "specialty": "Cocina Francesa", "experienceYears": 10, "category": "Platos principales" }
}
```

### **📋 Obtener Todos los Chefs**

**GET** `/api/chefs` **Respuesta esperada:**

```json
{
  "chefs": [ { "_id": "65a9b6f1e3d4c8d1e3a2b456", "name": "Carlos Gómez", "specialty": "Cocina Francesa", "experienceYears": 10, "category": "Platos principales" } ]
}
```

### **🏆 Crear un Torneo**

**POST** `/api/tournaments`

```json
{
  "name": "Copa Gastronómica",
  "location": "Bogotá",
  "maxChefs": 5
}
```

**Respuesta esperada:**

```json
{
  "message": "Torneo creado exitosamente",
  "tournament": { "_id": "65b0c3f1e3d4c8d1e3a2b789", "name": "Copa Gastronómica", "location": "Bogotá", "maxChefs": 5 }
}
```

### **👨‍🍳 Inscribir un Chef en un Torneo**

**POST** `/api/tournaments/:id/register` // En :id colocar el id del torneo.

ingresar el id del Chef

```json
{
  "chefId": "65a9b6f1e3d4c8d1e3a2b456"
}
```


### **⭐ Enviar un Puntaje para un Chef**

**POST** `/api/tournaments/:id/submit`

```json
{
  "chefId": "65a9b6f1e3d4c8d1e3a2b456",
  "score": 85
}
```

### **📊 Obtener el Ranking del Torneo**

**GET** `/api/tournaments/:id/ranking` **Respuesta esperada:**

```json
{
  "tournament": "Copa Gastronómica",
  "location": "Bogotá",
  "ranking": [ { "chef": "Carlos Gómez", "score": 85 } ]
}
```

### **📌 Obtener Todos los Torneos**

**GET** `/api/tournaments` **Respuesta esperada:**

```json
{
  "tournaments": [ { "_id": "65b0c3f1e3d4c8d1e3a2b789", "name": "Copa Gastronómica", "location": "Bogotá", "maxChefs": 5 } ]
}
```

---

## 📌 3. Tecnologías Utilizadas

✅ **Node.js** - Para el backend.\
✅ **Express.js** - Para manejar las rutas.\
✅ **MongoDB & Mongoose** - Base de datos para almacenar la información.\
✅ **Dotenv** - Manejo de variables de entorno.\
✅ **Morgan** - Para registrar logs de las solicitudes HTTP.

---

## 📌 4. Desarrollador
### Linder Yolian Rodriguez Cortes 
