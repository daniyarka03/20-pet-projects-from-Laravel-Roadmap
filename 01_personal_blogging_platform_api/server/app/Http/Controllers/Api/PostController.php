<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'topic' => 'max:255'
        ]);

        $post = Post::create($validatedData);

        return response()->json("Created successfuly", 201);
    }

    public function show(string $id)
    {
        $post = Post::find($id);
        return response()->json($post);
    }

    public function update(Request $request, string $id)
    {
      $validatedData = $request->validate([
            'title' => 'sometimes|required|max:255',
            'content' => 'sometimes|required',
            'topic' => 'sometimes|max:255'
        ]);

       $post = Post::find($id);
       $post->update($validatedData);

        return response()->json(data: "Updated successfuly", status: 200);
    }

    public function destroy(string $id)
    {
        Post::destroy($id);
        return response()->json(data: 'Post deleted successfuly', status: 204);
    }
}
