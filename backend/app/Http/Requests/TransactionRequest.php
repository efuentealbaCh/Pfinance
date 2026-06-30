<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
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
            'user_account_id' => ['required', 'uuid', 'exists:user_accounts,id'],
            'category_id'     => ['required', 'uuid', 'exists:categories,id'],
            'amount'          => ['required', 'numeric', 'min:0.01'],
            'description'     => ['nullable', 'string', 'max:500'],
            'date'            => ['required', 'date'],
            'type'            => ['required', 'in:income,expense'],
            'is_shared'       => ['nullable', 'boolean'],
        ];
    }

    /**
     * Mensajes de validación en español.
     */
    public function messages(): array
    {
        return [
            'user_account_id.required' => 'Debes seleccionar una cuenta.',
            'user_account_id.exists'   => 'La cuenta seleccionada no es válida.',
            'category_id.required'     => 'Debes seleccionar una categoría.',
            'category_id.exists'       => 'La categoría seleccionada no es válida.',
            'amount.required'          => 'El monto es obligatorio.',
            'amount.numeric'           => 'El monto debe ser un número.',
            'amount.min'               => 'El monto debe ser mayor a cero.',
            'description.max'          => 'La descripción no puede superar los 500 caracteres.',
            'date.required'            => 'La fecha es obligatoria.',
            'date.date'                => 'La fecha no tiene un formato válido.',
            'type.required'            => 'El tipo de transacción es obligatorio.',
            'type.in'                  => 'El tipo debe ser "income" o "expense".',
        ];
    }
}
