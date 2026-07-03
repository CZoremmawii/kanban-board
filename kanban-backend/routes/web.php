<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KanbanController;

Route::get('/columns', [KanbanController::class, 'getColumns']);
Route::post('/cards', [KanbanController::class, 'addCard']);
Route::delete('/cards/{id}', [KanbanController::class, 'deleteCard']);
Route::patch('/cards/{id}/move', [KanbanController::class, 'moveCard']);