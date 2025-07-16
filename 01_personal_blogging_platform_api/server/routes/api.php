<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;

Route::prefix('posts')->group(function() {
    Route::get('/', [PostController::class, "index"]);
    Route::post('/', [PostController::class, "store"]);
    Route::get('{id}', [PostController::class, "show"]);
    Route::put('{id}', [PostController::class, "update"]);
    Route::delete('{id}', [PostController::class, "destroy"]);
});
