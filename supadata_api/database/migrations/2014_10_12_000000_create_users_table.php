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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email');
            $table->string('password');
            $table->string('profile_picture')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('cover_photo');
            $table->string('job_title')->nullable();
            $table->string('department')->nullable();
            $table->string('company_name')->nullable();
            $table->string('phone');
            $table->string('url_company')->nullable();
            $table->string('address');
            $table->string('color');
            $table->string('police');
            $table->string('role');
         $table->rememberToken();
            $table->timestamps();
            $table->unique(['email', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
