<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

final class BookRequest extends FormRequest
{
    public function authorize(): bool { return true; } // API de estudo local, não autorização pronta.
    public function rules(): array
    {
        $presence = $this->isMethod('PATCH') ? 'sometimes' : 'required';
        return ['title' => [$presence, 'required', 'string', 'max:200'],
                'author' => [$presence, 'required', 'string', 'max:200']];
    }
    public function after(): array
    {
        return [function (Validator $validator): void {
            if ($this->isMethod('PATCH') && !$this->hasAny(['title', 'author'])) {
                $validator->errors()->add('body', 'Envie title ou author para alterar.');
            }
        }];
    }
}
