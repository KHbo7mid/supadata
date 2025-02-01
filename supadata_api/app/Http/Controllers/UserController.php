<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Particulier;
use App\Models\Ambassador;

class UserController extends Controller
{
    public function showAllUsers()
    {
        $users=User::whereIn('role',['particulier'])->get();
        return view("admin.list_user",["data"=>$users]);
    }
   
    public function deleteUser($id)
    {
        $user=User::find($id);
        $user->delete();
        return redirect('/list_users');
    }
    



    //edit 
    public function get_user_id($id)
    { $user = User::find($id);
        return view('admin.edit_user', ['data' => $user]);
    }
    public function EditUser(Request $req)
    {
        $user=User::find($req->id);
        
            $user->name=$req->name;
            $user->email=$req->email;
            $user->phone=$req->phone;
            $user->address=$req->address;
            $user->job_title=$req->job_title;
    
            $user->company_name=$req->company_name;
            $user->save();
            return redirect("/list_users");
       



    }
    //ambassador
    public function showAmbassadors()
    {
        $users = User::with('ambassador')->where('role', 'ambassador')->get();

        return view("admin.list_ambassador", ["data" => $users]);        
        
        

        return view("admin.list_ambassador",["data"=>$users]);
    }
    public function get_ambassador_id($id)
    {  $user = User::with('ambassador')->find($id);
        return view('admin.edit_ambassador', ['data' => $user]);
    }
    public function EditAmbassador(Request $req)
    {
        $user=User::find($req->id);
        
            $user->name=$req->name;
            $user->email=$req->email;
            $user->phone=$req->phone;
            $user->address=$req->address;
            $user->job_title=$req->job_title;
            $ambassador = $user->ambassador;
            if ($ambassador) {
                $ambassador->country_name = $req->country_name;
                $ambassador->save();
            }
            
            $user->save();
            return redirect("/list_ambassador");
       



    }
    public function deleteAmbassador($id)
    {
        $user=User::find($id);
        $user->delete();
        return redirect('/list_ambassador');
    }
   

    
}
