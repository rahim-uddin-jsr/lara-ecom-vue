<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
//        return response()->json($request->page);
        $categories= Category::paginate(5);
        return response()->json(['categories'=>$categories],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            $category= Category::create([
                'name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
            ]);
            // Return a JSON response with status 201 (Created)
            return response()->json([
                'message' => 'Category created successfully',
                'category' => $category,
            ], 201);

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Category creation failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to create category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, string $id)
    {
//        $this->authorize('update', Category::class);
//        $this->middleware('auth:sanctum');

        try {
            // Validate the request data
            $category = Category::find($id);
//            return  response()->json($category);
            // Create the category
            $category->update([
                'name' => $request->category_name,
                'slug' => Str::slug($request->category_name),
            ]);

            // Return a JSON response with status 201 (Created)
            return response()->json([
                'message' => 'Category updated successfully',
                'category' => $category,
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Category not found',
                'error' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Category update failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to update category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Validate the request data
            $isDeleted = Category::destroy($id);
            return response()->json([
                'message' => 'Category deleted successfully',
                'isDeleted' => $isDeleted,
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'message' => 'Category not found',
                'error' => $e->getMessage(),
            ], 404);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Category update failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'Failed to delete category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
