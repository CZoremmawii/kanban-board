<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('columns')->insert([
            ['title' => 'To Do', 'order' => 1,'created_at'=> now(),'updated_at'=> now()],
            ['title' => 'In Progress', 'order' => 2,'created_at'=> now(),'updated_at'=> now()],
            ['title' => 'Done', 'order' => 3,'created_at'=> now(),'updated_at'=> now()],
        ]);
        //
    }
}
