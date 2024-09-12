# The Resident Manager

Mini projek manajemen iuran bulanan untuk warga perumahan

## Tech Stack

- Laravel
- React + TypeScript
- TailwindCSS
- DaisyUI

## Petunjuk Instalasi

### Back End

- Masuk ke folder backend
- Buat .env dengan keys sebagai berikut:

```
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_TIMEZONE=UTC
    APP_URL=http://localhost

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=residentsDB
    DB_USERNAME=root
    DB_PASSWORD=
```

- Ketikkan command berikut di terminal

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

- Ketikkan command berikut di terminal

```
    npm install
    npm run dev
```
