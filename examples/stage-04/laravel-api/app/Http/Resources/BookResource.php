<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
final class BookResource extends JsonResource {
    public function toArray($request):array {
        return ['id'=>$this->resource['id'],'title'=>$this->resource['title'],'category'=>$this->resource['category'],'note'=>$this->resource['note']];
    }
}
