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
        Schema::table('tasks', function (Blueprint $table) {
            // Adiciona a nossa coluna 'task_date' do tipo data,
            // e a coloca depois da coluna 'completed'.
            $table->date('task_date')->after('completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            // A função 'down' desfaz o que a 'up' fez.
            $table->dropColumn('task_date');
        });
    }
};