@extends('admin.theme')
@section('title','Edit Company')
@section("contenu")





<div class="row">
    <div class="col-xl-6">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Edit Company </h4>

                <form action="/EditCompany/{{$data->id}}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="formrow-firstname-input" class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="formrow-firstname-input" placeholder="Company Name" name="company_name" value="{{$data->company_name}}">
                    </div>
                    <div class="mb-3">
                        <label for="formrow-email-input" class="form-label">Email</label>
                        <input type="email" class="form-control" id="formrow-email-input" placeholder="Email" name="email" value="{{$data->email}}">
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
                                <label for="formrow-inputCity" class="form-label">Address</label>
                                <input type="text" class="form-control" id="formrow-inputCity" placeholder="Address" name="address" value="{{$data->address}}">
                            </div>
                        </div>
                      
                        
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="formrow-inputZip" class="form-label">Company URL</label>
                                <input type="text" class="form-control" id="formrow-inputZip" placeholder="Company URL" name="url_company" value="{{$data->url_company}}">
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