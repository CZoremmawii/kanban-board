<?php

namespace App\Http\Controllers;

use App\Models\Column;
use App\Models\Card;
use Illuminate\Http\Request;

class KanbanController extends Controller
{
    // GET /api/columns
    public function getColumns()
    {
        $columns = Column::with('cards')->orderBy('order')->get();
        return response()->json($columns);
    }

    // POST /api/cards
    public function addCard(Request $request)
    {
        $request->validate([
            'column_id' => 'required|exists:columns,id',
            'title' => 'required|string|max:255',
        ]);

        $card = Card::create([
            'column_id' => $request->column_id,
            'title' => $request->title,
            'order' => 0,
        ]);

        return response()->json($card, 201);
    }

    // DELETE /api/cards/{id}
    public function deleteCard($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();
        return response()->json(['message' => 'Card deleted']);
    }

    // PATCH /api/cards/{id}/move
    public function moveCard(Request $request, $id)
    {
        $request->validate([
            'column_id' => 'required|exists:columns,id',
        ]);

        $card = Card::findOrFail($id);
        $card->column_id = $request->column_id;
        $card->save();

        return response()->json($card);
    }
    public function updateCard(Request $request, $id)
    {
        $request->validate(['title'=>'sometimes|string|max:255',
        'due_date'=>'sometimes|nullable|date',]);
        $card = Card::findOrFail($id);
        $card->update($request->only(['title','due_date']));
        return response()->json($card);
    }
}