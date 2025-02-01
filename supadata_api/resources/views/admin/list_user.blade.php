@extends('admin.theme')
@section('title','Users')
@section("contenu")

                       
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0 font-size-18">List of Users</h4>

                                   

                                </div>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-sm mb-3">
                                <div class="search-box me-2 d-inline-block">
                                    <div class="position-relative">
                                        <input type="text" class="form-control" autocomplete="off" id="searchTableList" placeholder="Search...">
                                        <i class="bx bx-search-alt search-icon"></i>
                                    </div>
                                </div>
                            </div>
                            
                           
                          
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="table-responsive">
        
                                       
        
                                        
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Address</th>
                                                        <th>Job Title</th>
                                                        <th>Company Name</th>

                                                        <th>Edit</th>
                                                        <th>Delete</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    @foreach($data as $item)
                                                    @if ($item)
                                                    <tr >
                                                        <td >{{ $item->name }}</td>
                                                        <td >{{ $item->email }}</td>
                                                        <td >{{ $item->phone }}</td>
                                                        <td >{{ $item->address }}</td>
                                                        <td >{{ $item->job_title }}</td>
                                                        <td >{{ $item->company_name }}</td>


                                                        <td style="width: 100px">
                                                            <a class="btn btn-outline-secondary btn-sm edit" title="Edit" href="/edit_user/{{$item->id}}">
                                                                <i class="fas fa-pencil-alt"></i>
                                                            </a>
                                                        </td>
                                                        <td style="width: 100px">
                                                            <form action="{{ route('delete_user', $item->id) }}" method="POST" style="display:inline;">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="submit" class="btn btn-outline-secondary btn-sm" title="Delete" onclick="return confirm('Are you sure you want to delete this user?');">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                                    </svg>
                                                                </button>
                                                            </form>
                                                        </td>
                                                    </tr>
                                                    @endif
                                                   @endforeach
                                                </tbody>
                                                </table>
                                      
        
                                    </div>
                                </div>
                            </div> 
                        </div> 
        
       
                        
                        
@endsection