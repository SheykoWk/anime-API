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



- /api/v1/programs
    - GET Obtener todos los programas
    - POST Crear programas
- /api/v1/programs/:program_id
    - POST Obtener un programa en especifico
    - PUT Editar un programa
    - DELETE Eliminar un programa
- /api/v1/programs/:program_id/chapters
    - GET Obtener todos los capitulos del programa
    - POST Agregar capitulos al programa
- /api/v1/programs/:program_id/chapters/:chapter_id
     http://localhost:8000/api/v1/programs/4bde8169-fce7-42cf-8ee8-785029f783e4/chapters/6d0e32f4-28a4-4d5d-bfd3-fe23380e9e84
        
        
        req.params.program_id
        req.params.chapter_id
        
        
    - GET Obtener un capitulo especifico
    - PUT Editar capitulo
    - DELETE Eliminar capitulo