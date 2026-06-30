<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bank_id'         => ['required', 'uuid', 'exists:banks,id'],
            'account_type_id' => ['required', 'uuid', 'exists:account_types,id'],
            'identifier'      => ['nullable', 'string', 'max:100'],
            'balance'         => ['required', 'numeric', 'min:0'],
        ];
    }

    /**
     * Mensajes de validación en español.
     */
    public function messages(): array
    {
        return [
            'bank_id.required'         => 'Debes seleccionar un banco.',
            'bank_id.exists'           => 'El banco seleccionado no es válido.',
            'account_type_id.required' => 'Debes seleccionar un tipo de cuenta.',
            'account_type_id.exists'   => 'El tipo de cuenta seleccionado no es válido.',
            'balance.required'         => 'El saldo es obligatorio.',
            'balance.numeric'          => 'El saldo debe ser un número.',
            'balance.min'              => 'El saldo no puede ser negativo.',
        ];
    }
}
