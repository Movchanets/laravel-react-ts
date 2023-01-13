<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {   $filename = "Products.json";

        $json = file_get_contents(base_path('public/'.$filename));
        $products = json_decode($json);
        foreach ($products as $key => $value) {
            Product::create([
                "name" => $value->name,
                "detail" => $value->detail
            ]);
        }

    }
}
