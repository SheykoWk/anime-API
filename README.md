# Rutas

- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me

- /api/v1/auth/login
- /api/v1/auth/register
- /api/v1/auth/password-recovery
- /api/v1/auth/verify-account

- /api/v1/users
- - GET 

- /api/v1/users/:id
- - GET  
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/users/me
- - GET
- - PUT
- - PATCH
- - DELETE

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST 
- - PATCH


//ENTREGABLE PROGRAMAS Y CHAPTERS

- /api/v1/programs
- - GET (Obtener todos los programas) X
- - POST (Crear programas) X


- /api/v1/programs/:program_id
- - GET (Obtener un programa en especifico) X
- - PUT (Editar un programa) X
- - DELETE (Eliminar un programa) X


- /api/v1/programs/:program_id/chapters
- - GET (Obtener todos los capitulos del programa) X
- - POST (Agregar capitulos al programa) X


- /api/v1/programs/:program_id/chapters/:chapter_id
- - GET (Obtener un capitulo especifico) X 
  ------1.muestra [] vacio cuando chpater_id esta mal
- - PUT (Editar capitulo) X
- - DELETE (Eliminar capitulo)  X
  ------1.muestra [] vacio cuando chpater_id esta mal


- /api/v1/media/cover/:imgName
- - GET (Ver la portada de un programa) X
-----Error cuando el nopmbre del archivo esta mal

- /api/v1/media/chapters/:imgName
- - GET (Ver el capitulo) X
-----Error cuando el nopmbre del archivo esta mal

- /api/v1/programs/:program_id/covers
- - POST (Postear portada del programa) X
------Guarda la imagen en carpeta aun con program_id incorrecto

- /api/v1/chapters/:chapter_id/chapters 
- - POST (Postear portada del programa) X
------Guarda el video en carpeta aun con chapter_id incorrecto
