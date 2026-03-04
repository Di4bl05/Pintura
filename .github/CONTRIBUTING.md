# 🤝 Guía para Colaboradores

Bienvenido al proyecto **Pintura**. Esta guía explica cómo empezar a contribuir.

## Requisitos previos

1. Tener una cuenta de GitHub
2. Haber aceptado la invitación de colaborador (revisa tu correo o ve a [github.com/Di4bl05/Pintura/invitations](https://github.com/Di4bl05/Pintura/invitations))
3. Tener rol **Write** en el repositorio (el dueño debe configurarlo en Settings → Collaborators)

## Primer uso

```bash
# Clonar el repositorio
git clone https://github.com/Di4bl05/Pintura.git
cd Pintura

# Instalar dependencias
pnpm install

# Asegúrate de estar en la rama de desarrollo
git checkout dev
git pull origin dev
```

## Trabajar en una tarea

```bash
# Siempre empieza actualizando dev
git checkout dev
git pull origin dev

# Hacer cambios y commitear
git add .
git commit -m "feat: descripción de los cambios"

# Subir los cambios
git push origin dev
```

## Ramas disponibles

| Rama | Uso |
|------|-----|
| `main` | Producción (⚠️ no hacer push directo) |
| `dev` | Desarrollo principal (aquí trabajamos) |
| `dev-Ismael` | Rama personal del colaborador |
| `design-v*` | Referencia de diseño (no modificar) |

## Convenciones de commits

Usa estos prefijos en tus mensajes de commit:

- `feat:` nueva funcionalidad
- `fix:` corrección de bugs
- `style:` cambios de estilos/diseño
- `docs:` documentación
- `chore:` mantenimiento

## Si no puedes hacer push

Si ves el error `remote: Permission to Di4bl05/Pintura.git denied`, contacta al dueño del repositorio para que:

1. Vaya a **Settings → Collaborators and teams**
2. Cambie tu rol de **Read** a **Write**

Consulta la sección **👥 Permisos de Colaboradores** en [WORKFLOW.md](../WORKFLOW.md) para más detalles.
