<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
           'name' => $this->name,
           'email' => $this->email,
           'profile_picture' => $this->profile_picture ? asset('storage/' . $this->profile_picture) : null,
           'company_logo' => $this->company_logo ? asset('storage/' . $this->company_logo) : null,
           'cover_photo' => $this->cover_photo ? asset('storage/' . $this->cover_photo) : null,
           'job_title'=>$this->job_title,
           'department'=>$this->department,
           'company_name'=>$this->company_name,
           'url_company'=>$this->url_company,
           'phone'=>$this->phone,
           'address'=>$this->address,
           'color'=>$this->color,
           'police'=>$this->police,
           'role'=>$this->role,
           'socialLinks' => socialLinksResources::collection($this->whenLoaded('socialLinks')),
           'ambassadorDetails' => $this->ambassadorDetails,

        ];
    }
}
