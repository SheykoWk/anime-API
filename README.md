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

- /api/v1/programs
- - GET 
- - POST

- /api/v1/programs/:program_id
- - GET
- - PUT
- - DELETE

- /api/v1/programs/:program_id/cover
- - POST

- /api/v1/programs/:program_id/chapters
- - GET 
- - POST

- /api/v1/programs/:program_id/chapters/:chapter_id
- - GET
- - PUT
- - DELETE