<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLinks extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'url_link',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
