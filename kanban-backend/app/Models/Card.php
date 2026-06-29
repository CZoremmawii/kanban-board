<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['column_id', 'title','due_date', 'order'];

    public function column()
    {
        return $this->belongsTo(Column::class);
    }
}