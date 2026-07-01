<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SavingsGoalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:150',
            ],
            'target_amount' => [
                'required',
                'numeric',
                'min:1',
            ],
            'deadline' => [
                'nullable',
                'date',
                'after:today',
            ],
            'icon' => [
                'nullable',
                'string',
                'max:10',
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
            'name.required'          => 'El nombre de la meta es obligatorio.',
            'name.max'               => 'El nombre no puede superar los 150 caracteres.',
            'target_amount.required' => 'El monto objetivo es obligatorio.',
            'target_amount.numeric'  => 'El monto objetivo debe ser un valor numérico.',
            'target_amount.min'      => 'El monto objetivo debe ser al menos $1.',
            'deadline.date'          => 'La fecha límite debe ser una fecha válida.',
            'deadline.after'         => 'La fecha límite debe ser posterior a hoy.',
            'icon.regex'             => 'El icono debe ser un emoji válido.',
            'color.regex'            => 'El color debe ser un código hexadecimal válido (ej: #FF6B6B).',
        ];
    }
}
