<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class EntrepriseController extends Controller
{
    public function showAllCompanies()
    {
        $companies = User::whereIn('role', ['entreprise'])->get();
        return view("admin.list_entreprise",["data"=> $companies]);
    }
    public function deleteCompany($id)
    {
        $company=User::find($id);
        $company->delete();
        return redirect("/list_companies");
    }

    public function get_company_id($id)
    { $company = User::find($id);
        return view('admin.edit_company', ['data' => $company]);
    }
    public function EditCompany(Request $req)
    {
        $company=User::find($req->id);
        
            $company->company_name=$req->company_name;
            $company->email=$req->email;
            $company->phone=$req->phone;
            $company->address=$req->address;
            $company->url_company=$req->url_company;
    
           
            $company->save();
            return redirect("/list_companies");
       



    }
}
