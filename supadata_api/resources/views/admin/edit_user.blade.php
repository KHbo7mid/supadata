@extends('admin.theme')
@section('title','Edit User')
@section("contenu")





<div class="row">
    <div class="col-xl-6">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Edit User </h4>

                <form action="/edit_user/{{$data->id}}" method="POST">
                    @csrf
                    <input type="hidden" name="id" value="{{$data->id}}">
                    <div class="mb-3">
                        <label for="formrow-firstname-input" class="form-label">Name</label>
                        <input type="text" class="form-control" id="formrow-firstname-input" placeholder="Name" name="name" value="{{$data->name}}">
                    </div>

                    <div class="row">
                        
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="formrow-email-input" class="form-label">Email</label>
                                <input type="email" class="form-control" id="formrow-email-input" placeholder="Email" name="email" value="{{$data->email}}">
                            </div>
                        </div>
                       
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="formrow-inputCity" class="form-label">Phone</label>
                                <input type="text" class="form-control" id="formrow-inputCity" placeholder="Phone Number" name="phone" value="{{$data->phone}}">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="formrow-inputCity" class="form-label">Adress</label>
                                <input type="text" class="form-control" id="formrow-inputCity" placeholder="Address" name="address" value="{{$data->address}}">
                            </div>
                        </div>
                      
                        
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="formrow-inputZip" class="form-label">Job Title</label>
                                <input type="text" class="form-control" id="formrow-inputZip" placeholder="Job Title" name="job_title" value="{{$data->job_title}}">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="formrow-inputZip" class="form-label">Company Name</label>
                                <input type="text" class="form-control" id="formrow-inputZip" placeholder="Company Name" name="company_name" value="{{$data->company_name}}">
                            </div>
                        </div>
                    </div>

                   
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary w-md">Submit</button>
                    </div>
                </form>
            </div>
           
        </div>
       
    </div>
   

    @endsection