# 📌 Módulo de Autenticación y Login

Este documento describe el funcionamiento del sistema de autenticación, manejo
de dispositivos confiables, 2FA y generación de tokens seguros dentro de la
aplicación.

---

## 🔐 **1. Flujo general de autenticación**

### 1. El usuario envía

- correo
- password
- fingerprint (ID único del dispositivo)

### 2. El sistema valida

- Que el correo exista
- Que la contraseña sea correcta

### 3. Verifica si el usuario tiene habilitado el 2FA

- Si **NO lo tiene habilitado**, se solicita configuración inmediata.

### 4. Revisión de dispositivo confiable

- Se busca el dispositivo por `userId` y `fingerprint`
- Se valida si su expiración sigue vigente
- Si es confiable y vigente → **inicio de sesión directo**
- Si NO es confiable → **se solicita 2FA**

---

## 📲 **2. Autenticación de dos pasos (2FA)**

Para dispositivos no confiables o nuevos:

- Se envía un código 2FA
- El usuario debe verificarlo
- Una vez validado el código:
  - Se registra el dispositivo como **confiable**
  - Se otorga acceso normal

---

## 🛡️ **3. Gestión de dispositivos confiables**

Cada dispositivo confiable almacena:

- `userId`
- `fingerprint`
- `createdAt`
- `expiresAt` (30 días por defecto)

Si el dispositivo:

- Existe y **no ha expirado** → acceso directo
- Existe pero **expiró** → debe volver a validar 2FA
- No existe → debe validar 2FA

---

## 🕒 **4. Expiración del token de sesión**

Se genera usando JWT:

```javascript
jwt.sign({ id, role, correo }, SECRETA, { expiresIn: '7d' });
```

Duración del token: **7 días**

---

## 🔄 **5. Endpoints involucrados**

### **POST /auth/login**

- Inicia el flujo de autenticación
- Respuestas posibles:
  - `require2FASetup: true`
  - `require2FA: true`
  - `loginApproved: true`

### **POST /auth/verify-2fa**

- Verifica código 2FA
- Registra dispositivo confiable
- Entrega token de sesión

### **GET /auth/me**

- Obtiene información del usuario autenticado
- Requiere token válido

---

## 🧹 Sanitización de usuario

Antes de enviar los datos al frontend se eliminan:

- password
- metadata interna
- flags administrativos

Archivo: `helpers/sanitizadores/sanitizarUsuario.js`

---

## 🧱 **Estructura de archivos**

```javascript
/controllers/auth/
    loginController.js
    verify2FAController.js

/models/
    Usuarios.js
    DispositivosConfiables.js

/helpers/
    sanitizadores/
        sanitizarUsuario.js

/routes/auth/
    login.js
    verify-2fa.js
    me.js
```

---

## ✅ Estado actual del módulo

✔ Login completo  
✔ Validación de contraseña  
✔ Verificación de 2FA  
✔ Registro de dispositivos confiables  
✔ Token de autenticación  
✔ Middleware de protección de rutas  
✔ Sanitización de usuario  
✔ Endpoints documentados

---

## ✨ Autor

**DJKRON** **_Carlos Javier Castellanos Macias_** Desarrollo FullStack –
Seguridad – Infraestructura
