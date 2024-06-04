# The Resident Manager
Mini projek manajemen iuran bulanan untuk warga perumahan

## Tech Stack
- Laravel
- React + TypeScript
- TailwindCSS
- DaisyUI

## Petunjuk Instalasi
### Backend
- Masuk ke folder backend
- Pastikan konfigurasi DB di .env sudah diset
```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=residentsDB
    DB_USERNAME=root
    DB_PASSWORD=
```
- Ketikan command Berikut
```
    composer install
    php artisan key:generate
    php artisan migrate
    php artisan storage:link
    php artisan serve
```
### Front End
- Masuk ke folder frontend
- Pastikan TypeScript sudah terinstall global
```
    npm install -g typescript
```
- Ketikan command Berikut
```
    npm install
    npm run dev
```
