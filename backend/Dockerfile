# Versão Finalíssima do backend/Dockerfile

FROM php:8.2-fpm

WORKDIR /var/www/html

# Instala dependências do sistema.
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    libzip-dev

# Limpa o cache do apt.
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala as extensões PHP necessárias.
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip xml intl

# Instala o Composer.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia os arquivos da aplicação.
COPY . .

# Instala as dependências do Composer.
RUN composer install --no-interaction --no-plugins --no-scripts --no-dev --prefer-dist

# Muda o proprietário dos arquivos.
RUN chown -R www-data:www-data /var/www/html

EXPOSE 8000

# Comando para iniciar o servidor de desenvolvimento do Laravel.
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]