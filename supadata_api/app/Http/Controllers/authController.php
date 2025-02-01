<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Particulier;
use App\Models\Entreprise;
use App\Models\Ambassador;
use App\Models\Employe;
use App\Models\SocialLinks;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

use App\Http\Resources\UserResource;


class authController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
       $existUser=User::where('email',$data['email'])->where('role',$data['role'])->first();
       if ($existUser && Hash::check($data['password'], $existUser->password)) {
        return response()->json([
            'error' => 'Email and password combination already exists'
        ], 422);
    }
        
        if ($request->hasFile('profile_picture')) {
            $data['profile_picture'] = $request->file('profile_picture')->store('profile_pictures', 'public');
        }
    
        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('company_logos', 'public');
        }
    
        if ($request->hasFile('cover_photo')) {
            $data['cover_photo'] = $request->file('cover_photo')->store('cover_photos', 'public');
        }
    
        // Create the user
        $user = User::create([
            'name' => $data['name']?? null ,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'profile_picture' => $data['profile_picture']?? null  ,
            'company_logo' => $data['company_logo'] ?? null,
            'cover_photo' => $data['cover_photo']  ,
            'job_title' => $data['job_title'] ?? null,
            'department' => $data['department'] ?? null,
            'company_name' => $data['company_name'] ?? null,
            'phone' => $data['phone'],
            'url_company' => $data['url_company'] ?? null,
            'address' => $data['address'],
            'color' => $data['color'],
            'police' => $data['police'],
            'role' => $data['role'],
        ]);
    
        // Handle social links
        if (!empty($data['socialLinks'])) {
            foreach ($data['socialLinks'] as $socialLink) {
                SocialLinks::create([
                    'user_id' => $user->id,
                    'name' => $socialLink['name']?? null,
                    'url_link' => $socialLink['url_link']?? null,
                ]);
            }
        }
    
        // Handle role-specific creation
        switch ($data['role']) {
            case 'particulier':
                Particulier::create(['user_id' => $user->id]);
                break;
            case 'ambassador':

                
                    Ambassador::create([
                        'user_id' => $user->id,
                        'country_key' => $data['country']['key'], 
                        'country_name'=>$data['country']['label']
                    ]);
               
                break;
            case 'employe':
                Employee::create(['user_id' => $user->id]);
                break;
            case 'entreprise':
                Entreprise::create(['user_id' => $user->id]);
                break;
        }
    
        // Generate and return a token with a cookie
        $token = $user->createToken('secret')->plainTextToken;
        $cookie = cookie('token', $token, 60 * 24);
    
        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }
    
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
       
        $user = User::with('socialLinks')->where('email', $data['email'])->first();
        
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect'
            ], 401);
        }
    
        if ($user->role === 'ambassador') {
            $ambassadorDetails = Ambassador::where('user_id', $user->id)->first();
            if ($ambassadorDetails) {
                $user->ambassadorDetails = $ambassadorDetails;
            }
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        $cookie = cookie('token', $token, 60 * 24);
        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);
    }
    
  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();

    $cookie = cookie()->forget('token');

    return response()->json([
        'message' => 'Logged out successfully!'
    ])->withCookie($cookie);
  } 
  public function getUser($id) {
    try {
        $user = User::with('socialLinks')->findOrFail($id); 
        if ($user->role == 'ambassador') {
            $user->load('ambassador'); // Ensure this relationship is correctly defined
        }
        return response()->json($user);
    } catch (\Exception $e) {
        return response()->json(['error' => 'User not found'], 404);
    }
}
public function editUser(RegisterRequest $request,$id)
{
    $data = $request->validated();
    $user=User::findOrFail($id);
    $user->update([
        'name' => $data['name'] ?? $user->name,
        'email' => $data['email'] ?? $user->email,
        'password' => isset($data['password']) ? Hash::make($data['password']) : $user->password,
        'job_title' => $data['job_title'] ?? $user->job_title,
        'department' => $data['department'] ?? $user->department,
        'company_name' => $data['company_name'] ?? $user->company_name,
        'phone' => $data['phone'] ?? $user->phone,
        'url_company' => $data['url_company'] ?? $user->url_company,
        'address' => $data['address'] ?? $user->address,
        'color' => $data['color'] ?? $user->color,
        'police' => $data['police'] ?? $user->police,
    ]);
    if ($request->hasFile('profile_picture')) {
        $user->profile_picture = $request->file('profile_picture')->store('profile_pictures', 'public');
    }
    if ($request->hasFile('company_logo')) {
        $user->company_logo = $request->file('company_logo')->store('company_logos', 'public');
    }
    if ($request->hasFile('cover_photo')) {
        $user->cover_photo = $request->file('cover_photo')->store('cover_photos', 'public');
    }

    $user->save();
    if (!empty($data['socialLinks'])) {
        // Delete existing social links
        SocialLinks::where('user_id', $user->id)->delete();

        // Add new social links
        foreach ($data['socialLinks'] as $socialLink) {
            SocialLinks::create([
                'user_id' => $user->id,
                'name' => $socialLink['name'] ?? null,
                'url_link' => $socialLink['url_link'] ?? null,
            ]);
        }
        switch ($user->role) {
            case 'particulier':
                Particulier::updateOrCreate(['user_id' => $user->id]);
                break;
    
            case 'ambassador':
                Ambassador::updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'country_key' => $data['country']['key'] ?? null,
                        'country_name' => $data['country']['label'] ?? null
                    ]
                );
                break;
    
            case 'employe':
                Employee::updateOrCreate(['user_id' => $user->id]);
                break;
    
            case 'entreprise':
                Entreprise::updateOrCreate(['user_id' => $user->id]);
                break;
        }
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => new UserResource($user),
        ]);

}
}
public function deleteUser($id)
{
    try {
        
        $user = User::findOrFail($id);
        
       
        SocialLinks::where('user_id', $user->id)->delete();

     
        switch ($user->role) {
            case 'ambassador':
                Ambassador::where('user_id', $user->id)->delete();
                break;
            case 'particulier':
                Particulier::where('user_id', $user->id)->delete();
                break;
            case 'employe':
                Employee::where('user_id', $user->id)->delete();
                break;
            case 'entreprise':
                Entreprise::where('user_id', $user->id)->delete();
                break;
        }
        
       
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'User not found'], 404);
    }
}

}