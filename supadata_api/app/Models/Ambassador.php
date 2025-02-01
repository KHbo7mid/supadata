<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambassador extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
         'country_key',
         'country_name'
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
