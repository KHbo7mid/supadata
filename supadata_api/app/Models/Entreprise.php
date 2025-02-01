<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function employes()
    {
        return $this->hasMany(Employe::class);
    }
}
