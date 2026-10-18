<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
final class BookRequest extends FormRequest {
    public function authorize():bool {
        return true;
    }
    public function rules():array {
        $required=$this->isMethod('PATCH')?'sometimes':'required';
        return ['title'=>[$required,'string','min:1','max:120'],'category'=>[$required,'string','min:1','max:120'],'note'=>['sometimes','nullable','string','max:200']];
    }
    public function after():array {
        return [function(Validator $validator) {
            foreach(array_keys($this->all()) as $key)if(!in_array($key,['title','category','note'],true))$validator->errors()->add($key,'Campo não permitido.');
            if($this->isMethod('PATCH')&&count($this->all())===0)$validator->errors()->add('body','Envie ao menos um campo.');
        }
        ];
    }
}
