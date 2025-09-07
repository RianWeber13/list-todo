<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
           $table->id(); // Cria uma coluna de ID numérico, que é a chave primária.
            $table->string('title'); // Cria uma coluna de texto para o título da tarefa.
            $table->text('description')->nullable(); // Cria uma coluna de texto mais longo para a descrição, que pode ser deixada em branco (nula).
            $table->boolean('completed')->default(false); // Cria uma coluna para 'verdadeiro/falso', para sabermos se a tarefa foi concluída. O padrão é 'falso'.
            $table->timestamps(); // Cria colunas para armazenar quando a tarefa foi criada e atualizada.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
