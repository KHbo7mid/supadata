<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $role = $this->input('role');
        $email = $this->input('email');
        return [
            'name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->where(function ($query) use ($role, $email) {
                    return $query->where('role', $role);
                })
            ],
            'password' => [
                'required',
                'string',
                Password::min(8),
               
            ],
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'company_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'job_title' => 'nullable|string',
            'department' => 'nullable|string',
            'company_name' => 'nullable|string',
            'phone' => 'required|string',
            'url_company' => 'nullable|string',
            'address' => 'required|string',
            'color' => 'required|string',
            'police' => 'required|string',
            'role' => 'required|string',
           'country' => ['required_if:role,ambassador', 'array'],
'country.key' => ['required_if:role,ambassador', 'string', 'size:2'],
'country.label' => ['required_if:role,ambassador', 'string', 'max:255'],
            'socialLinks' => 'nullable|array',
        'socialLinks.*.name' => 'nullable|string',
        'socialLinks.*.url_link' => 'nullable|string',
        ];
    }
}
