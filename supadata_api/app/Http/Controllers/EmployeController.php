<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employe;

class EmployeController extends Controller
{
    public function completeCard(Request $request, $token)
    {
        $employee = Employe::where('api_token', $token)->first();

        if ($employee) {
            // Handle the process to complete the personal card
            return view('complete_card', ['employee' => $employee]);
        }

        return redirect('/')->with('error', 'Invalid token.');
    }
}
