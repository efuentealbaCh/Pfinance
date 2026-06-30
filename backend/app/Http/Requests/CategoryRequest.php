<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // En update, ignorar el registro actual para el unique
        $categoryId = $this->route('category');

        return [
            'name'  => [
                'required',
                'string',
                'max:100',
                Rule::unique('categories', 'name')->ignore($categoryId),
            ],
            'icon'  => [
                'nullable',
                'string',
                'max:10',
                // Validar que sea un carácter emoji (rango Unicode extendido)
                'regex:/^\X{1,2}$/u',
            ],
            'color' => [
                'nullable',
                'string',
                'regex:/^#([A-Fa-f0-9]{6})$/',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'  => 'El nombre de la categoría es obligatorio.',
            'name.max'       => 'El nombre no puede superar los 100 caracteres.',
            'name.unique'    => 'Ya existe una categoría con ese nombre.',
            'icon.max'       => 'El icono no puede superar los 10 caracteres.',
            'icon.regex'     => 'El icono debe ser un emoji válido.',
            'color.regex'    => 'El color debe ser un código hexadecimal válido (ej: #FF6B6B).',
        ];
    }
}
