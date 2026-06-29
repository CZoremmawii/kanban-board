<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $fillable = ['title', 'order'];

    public function cards()
    {
        return $this->hasMany(Card::class)->orderBy('order');
    }
}