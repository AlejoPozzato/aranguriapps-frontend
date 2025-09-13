# 🎨 Frontend - Gestor de Materias

Aplicación web para gestionar materias, profesores, fechas de examen y archivos asociados.

---

## 🧭 Ejemplos de Uso (Flujos de Usuario)

### 🔑 1. Registro y Login
1. El usuario abre la app en `http://localhost:5173`.
2. Hace clic en **"Registrarse"** e ingresa:
    - Nombre
    - Email
    - Contraseña
3. La aplicación crea su cuenta y redirige al login.
4. El usuario ingresa su **email y contraseña**, recibe un **token JWT** que se guarda en `localStorage`.
5. Ahora puede acceder al panel de materias.

---

### 📚 2. Crear una Materia
1. Desde el panel principal, hace clic en **"Agregar materia"**.
2. Completa:
    - Nombre de la materia
    - Profesor
    - Horario
3. Presiona **"Guardar"**.
4. La materia aparece en la lista sin recargar la página (gracias a React + Axios).

---

### 📎 3. Agregar Archivos a la Materia
1. Luego de crear una materia, el usuario selecciona la opción **"Archivos"** en la materia recién creada.
2. Se abre un modal para subir archivos.
3. Ingresa:
    - Nombre del archivo
    - URL o enlace de descarga
4. Presiona **"Subir"**.
5. El archivo queda asociado a la materia y se muestra en la lista de archivos de esa materia.

---

### 📝 4. Editar Materia
1. En la lista de materias, el usuario toca el botón **"Editar"** de la materia deseada.
2. Cambia, por ejemplo, el horario.
3. Presiona **"Guardar cambios"**, el frontend hace un `PUT /materias/{id}` al backend.
4. La lista se actualiza automáticamente.

---

### 🗑️ 5. Eliminar Materia
1. El usuario selecciona el botón **"Eliminar"**.
2. Aparece un modal de confirmación.
3. Si confirma, el frontend hace un `DELETE /materias/{id}`.
4. La materia desaparece de la lista.

---

### 🚪 6. Cerrar Sesión
1. Desde el menú, selecciona **"Cerrar sesión"**.
2. Se borra el token del `localStorage` y se redirige al login.

---

## 🛠️ Tecnologías Utilizadas

- **React + Vite**  
  Elegí **Vite** como bundler y herramienta de desarrollo porque es mucho más rápido que Create React App, utiliza **ESBuild** para compilar, es fácil de configurar y genera un build de producción optimizado y ligero.  
  Junto a React puedo crear **componentes reutilizables**, manejar el **estado** de la app de forma clara e integrar librerías de terceros con facilidad.  
  En conjunto, **React + Vite** me permitieron un desarrollo moderno, rápido y eficiente.

- **Material UI (MUI)**  
  Librería de componentes para diseño moderno y responsivo.  
  Elegí esta librería para concentrarme en la **lógica de negocio** (manejo de estados, API calls, validación de datos y errores) en lugar de diseñar y maquetar componentes desde cero.  
  Además, MUI es flexible y me permite adaptar los componentes a mis necesidades.

- **Axios / Fetch API**  
  Para comunicarme con el backend con una sintaxis limpia y soporte para promesas.  
  Axios convierte las respuestas automáticamente a JSON y permite manejar errores de forma clara con `try/catch`.

- **React Icons**  
  Para íconos de edición, eliminación y visualización de forma sencilla y consistente.

---

## ⚙️ Instalación y Ejecución

### ✅ Requisitos Previos
- **Node.js 20+** instalado

### 💻 Correr Localmente
1. **Clonar el repositorio:**

git clone https://github.com/AlejoPozzato/aranguriapps-frontend.git

cd aranguriapps-frontend


2. **Instalar dependencias:**

npm install

3. **Levantar el proyecto:**

npm run dev

La aplicación estará disponible en:  
👉 [http://localhost:5173](http://localhost:5173)

---

### 📌 Notas
Este proyecto está diseñado para funcionar junto con el backend:  
🔗 [aranguriAppsBackend](https://github.com/AlejoPozzato/aranguriAppsBackend)

Por lo tanto, **es necesario levantar primero el backend** para que el frontend pueda consumir sus servicios y ser completamente funcional.
