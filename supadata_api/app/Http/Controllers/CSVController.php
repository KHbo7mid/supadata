<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Entreprise;
use App\Models\Employe;
use App\Mail\EmployeInvitation;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\EmployeImport;
class CSVController extends Controller
{

    public function upload(Request $request)
{
    try {
      

        // Validate the request
        $request->validate([
            'file' => 'required|file',
            'user_id' => 'required|exists:users,id',
        ]);

      
        // Retrieve the Entreprise associated with the user_id
        $user_id = $request->input('user_id');
        $entreprise = Entreprise::where('user_id', $user_id)->firstOrFail();

        

        // Handle file upload
        $file = $request->file('file');

        

        // Parse the Excel file
        $import = new EmployeImport($entreprise->id, $user_id );
        Excel::import($import, $file);

       
        // Get the imported employees
        $employees = $import->getEmployees();

       

        // Add employees and associate them with the Entreprise
        foreach ($employees as $employeeData) {
            Employe::create([
                'user_id' => $employeeData['user_id'], // Assuming user_id is part of employee data
                'entreprise_id' => $entreprise->id,
                // Add other employee fields as necessary
            ]);

            // Send email to the employee
            $invitationLink = route('complete.card', ['token' => $employeeData['token']]);
            Mail::to($employeeData['email'])->send(new EmployeInvitation($invitationLink));        }

        return response()->json(['message' => 'Employees added and emails sent.'], 200);

    } catch (\Exception $e ) {
        \Log::error('Error uploading file: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to process the file.'], 500);
    }
}

}