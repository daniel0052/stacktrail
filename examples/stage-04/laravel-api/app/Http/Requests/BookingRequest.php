<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
final class BookingRequest extends FormRequest {
    public function authorize():bool {
        return true;
    }
    public function rules():array {
        return ['name'=>['required','string','min:1','max:80'],'slot'=>['required','string']];
    }
    public function after():array {
        return [function(Validator $validator) {
            foreach(array_keys($this->all()) as $key)if(!in_array($key,['name','slot'],true))$validator->errors()->add($key,'Campo não permitido.');
        }
        ];
    }
}
