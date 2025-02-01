<?php

namespace App\Imports;

use App\Models\Employe;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToArray;
class EmployeImport implements ToArray
{
    protected $entreprise_id;
    protected $user_id_entreprise;

    protected $employees = [];

    public function __construct($entreprise_id,$user_id)
    {
        $this->entreprise_id = $entreprise_id;
        $this->user_id_entreprise=$user_id;
    }

    public function array(array $array)
    {
       
        $entreprise = User::find($this->user_id_entreprise);

        if (!$entreprise) {
            \Log::error('Entreprise not found with ID: ' . $this->entreprise_id);
            return;
        }

        $header = true; // Flag to skip the header row
        foreach ($array as $row) {
            if ($header) {
                $header = false; // Skip the header row
                continue;
            }

            

            // Validate and process each row
            if (isset($row[0], $row[1], $row[2], $row[3], $row[4])) {
                $existingUser = User::where('email', $row[1])
                ->where('role', 'employe')
                ->first();

if ($existingUser) {
\Log::warning('User with email ' . $row[1] . ' and role employe already exists.');
continue; // Skip this row
}
                // Create User with the role 'employe'
                $user = User::create([
                    'name' => $row[0],
                    'email' => $row[1],
                    'phone' => $row[2],
                    'job_title' => $row[4],
                    'department' => $row[3],
                    'role' => 'employe',
                    'company_logo'=>$entreprise->company_logo,
                    'cover_photo'=>$entreprise->cover_photo,
                    'company_name'=>$entreprise->company_name,
                    'url_company'=>$entreprise->url_company,
                    'phone'=>$entreprise->phone,
                    'address'=>$entreprise->address,
                    'color'=>$entreprise->color,
                    'police'=>$entreprise->police,
           
                    'password' => bcrypt('defaultpassword'), // Set a default password or handle as needed
                ]);

                // Create corresponding Employe record
              

                $this->employees[] = [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'token' => $user->createToken('Personal Access Token')->plainTextToken,
                ];

               
            } else {
                \Log::warning('Row did not pass validation: ' . json_encode($row));
            }
        }

       
    }

    public function getEmployees()
    {
        return $this->employees;
    }
}
