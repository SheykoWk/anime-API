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

# Programs

- /api/v1/programs

-  /
- - GET
- - POST

- /:id
- - GET
- - PUT
- - DELETE

- /:id/upload
- - POST

- /:program_id/chapter
- - GET
- - POST

- /:program_id/chapters/:chapter_id
- - GET
- - DELETE
- - PUT

- /:program_id/chapters/:chapter_id/upload
- - POST