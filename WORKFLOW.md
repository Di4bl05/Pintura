# 🚀 Flujo de Trabajo Git

## Estructura de Ramas

### Ramas Principales

- **`main`** 🌟
  - Rama de PRODUCCIÓN
  - Conectada a Vercel para deploy automático
  - ⚠️ **NUNCA hacer commits directos aquí**
  - Solo recibe merges desde `dev`

- **`dev`** 🔧
  - Rama de DESARROLLO
  - Aquí trabajas tú y tu compañero
  - Base para nuevas features

### Ramas de Diseño (Referencia)

- `design-v2`
- `design-v3-innovative`
- `design-v4-editorial`
- `design-v5-revolutionary`
- Se mantienen para consulta pero no se usan activamente

---

## 📝 Proceso de Trabajo Diario

### 1️⃣ Comenzar a Trabajar

```bash
# Asegúrate de estar en dev
git checkout dev

# Obtén los últimos cambios
git pull origin dev
```

### 2️⃣ Desarrollar Nueva Feature

**Opción A: Trabajo directo en dev (proyecto pequeño)**
```bash
# Ya estás en dev, solo trabaja y commitea
git add .
git commit -m "feat: descripción del cambio"
git push origin dev
```

**Opción B: Feature branches (recomendado a futuro)**
```bash
# Crea una rama para tu feature
git checkout -b feature/nombre-descriptivo

# Trabaja y commitea
git add .
git commit -m "feat: descripción"
git push origin feature/nombre-descriptivo

# Cuando termines, haz merge a dev
git checkout dev
git merge feature/nombre-descriptivo
git push origin dev
```

### 3️⃣ Pasar a Producción

```bash
# Cuando dev esté estable y listo para producción
git checkout main
git pull origin main

# Merge de dev a main
git merge dev

# Push a producción (esto activa el deploy en Vercel)
git push origin main

# Vuelve a dev para seguir trabajando
git checkout dev
```

---

## 🎯 Convenciones de Commits

Usa prefijos descriptivos:

- `feat:` nueva funcionalidad
- `fix:` corrección de bugs
- `style:` cambios de estilos/diseño
- `refactor:` mejoras de código sin cambiar funcionalidad
- `docs:` documentación
- `chore:` tareas de mantenimiento

**Ejemplos:**
```bash
git commit -m "feat: añadido nuevo servicio de consultoría"
git commit -m "fix: corregido bug en el formulario de contacto"
git commit -m "style: actualizado el hero con nuevo diseño"
```

---

## ⚠️ Reglas Importantes

1. **NUNCA trabajes directamente en `main`**
   - Siempre trabaja en `dev`
   - `main` solo para deploys controlados

2. **Comunicación con tu compañero**
   - Antes de hacer push, haz pull
   - Si hay conflictos, resuélvelos juntos
   - Avísale cuando hagas cambios grandes

3. **Testing antes de producción**
   - Prueba todo en `dev` antes de mergear a `main`
   - Vercel desplegará automáticamente desde `main`

4. **Ramas de diseño**
   - No las borres, son referencia
   - Si necesitas algo de ellas, usa cherry-pick

---

## 👥 Permisos de Colaboradores

### Problema: El colaborador no puede hacer push

Si tu colaborador no puede subir cambios a las ramas, sigue estos pasos:

#### Paso 1: Verificar el nivel de acceso

1. Ve al repositorio en GitHub: `https://github.com/Di4bl05/Pintura`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Collaborators and teams** (Colaboradores y equipos)
4. Busca al colaborador en la lista

#### Paso 2: Cambiar el rol del colaborador a Write

Si el colaborador aparece con rol **Read**, cámbialo a **Write**:

1. Haz clic en el ícono de configuración ⚙️ junto al nombre del colaborador
2. Selecciona **Write** en el menú de roles
3. Confirma el cambio

> **Roles disponibles:**
> - `Read` → Solo puede ver el código (❌ no puede hacer push)
> - `Triage` → Puede gestionar issues (❌ no puede hacer push)
> - `Write` → Puede hacer push a ramas (✅ recomendado para colaboradores)
> - `Maintain` → Puede gestionar el repositorio sin acceso a settings
> - `Admin` → Acceso completo al repositorio

#### Paso 3: El colaborador debe aceptar la invitación

Si el colaborador nunca aceptó la invitación:

1. Ve a **Settings → Collaborators and teams**
2. Si aparece como "Pending invite", el colaborador debe aceptar el correo de invitación
3. O comparte este enlace directo: `https://github.com/Di4bl05/Pintura/invitations`

#### Verificación rápida para el colaborador

El colaborador puede verificar su acceso ejecutando:

```bash
# Clonar el repositorio (solo primera vez)
git clone https://github.com/Di4bl05/Pintura.git
cd Pintura

# Verificar acceso a una rama
git checkout dev
git pull origin dev

# Hacer un commit de prueba
echo "test" > test.txt
git add test.txt
git commit -m "test: verificar acceso"
git push origin dev

# Si el push funciona, los permisos están correctos
# Después borrar el archivo de prueba
git rm test.txt
git commit -m "chore: eliminar archivo de prueba"
git push origin dev
```

---

## 🆘 Comandos Útiles

```bash
# Ver en qué rama estás
git branch

# Ver el estado de tus cambios
git status

# Ver las diferencias de tus cambios
git diff

# Ver el historial de commits
git log --oneline

# Deshacer cambios locales (antes de commit)
git checkout -- archivo.tsx

# Ver todas las ramas (locales y remotas)
git branch -a

# Eliminar rama local (cuando ya no la necesites)
git branch -d nombre-rama
```

---

## 🔄 Workflow Visual

```
design-v2 ────────────────────┐
design-v3-innovative ─────────┤
design-v4-editorial ──────────┤─→ (mantener para referencia)
design-v5-revolutionary ──────┘

dev ──┬──→ feature/nueva-funcionalidad ──→ merge back to dev
      │
      ├──→ trabajo diario (tú y tu compañero)
      │
      └──→ cuando esté listo ──→ merge to main ──→ 🚀 VERCEL DEPLOY

main ──→ PRODUCCIÓN (solo recibe merges de dev)
```

---

Necesito q la pagina tenga una seccion principal, un formulario de contacto detallado un sistema de resenas conectado por una api a google maps o algo x el estilo, una agaleria de imagenes de antes y despues del trabajo yuna seccion de serviciones detallados y con los rangos de precios, los datos q no conoces dejalo como placeholder o con daots improvisados ya los cambiare luego tambien ecesito q me digas si debeira agregar algo mas a la pagina y hazlo con el diseno de 