@extends('admin.theme')

@section('title', 'Dashboard')

@section('contenu')
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 class="mb-sm-0 font-size-18">Dashboard</h4>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xl-4">
        <div class="card overflow-hidden">
            <div class="bg-primary-subtle">
                <div class="row">
                    <div class="col-7">
                        <div class="text-primary p-3">
                            <h5 class="text-primary">Welcome Back!</h5>
                            <p>Supadata Dashboard</p>
                        </div>
                    </div>
                    <div class="col-5 align-self-end">
                        <img src="assets/images/profile-img.png" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
            <div class="card-body pt-0">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="avatar-md profile-user-wid mb-4">
                            <img src="/assets/my_images/admin_logo.png" alt="" class="img-thumbnail rounded-circle">
                        </div>
                        <h5 class="font-size-14 text-truncate">Khiari Ahmed</h5>
                        <p class="text-muted mb-0 text-truncate">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-8">
        <div class="row">
            <div class="col-md-4">
                <div class="card mini-stats-wid">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1 text-center">
                                <p class="text-muted fw-medium">Utilisateurs<br>personne-physique</p>
                                <h4 class="mb-0 ">1</h4>
                            </div>
                            <div class="flex-shrink-0 align-self-center">
                                <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                    <span class="avatar-title">
                                        <i class="fas fa-user-friends font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card mini-stats-wid">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1 text-center">
                                <p class="text-muted fw-medium">Ambassadeurs</p>
                                <h4 class="mb-0 ">3</h4>
                            </div>
                            <div class="flex-shrink-0 align-self-center">
                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                    <span class="avatar-title rounded-circle bg-primary">
                                        <i class="fas fa-user-friends font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card mini-stats-wid">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1 text-center">
                                <p class="text-muted fw-medium">Utilisateurs <br>personne-morale</p>
                                <h4 class="mb-0 ">3</h4>
                            </div>
                            <div class="flex-shrink-0 align-self-center">
                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                    <span class="avatar-title rounded-circle bg-primary">
                                        <i class="fas fa-building font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mini-stats-wid">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1 text-center">
                                <p class="text-muted fw-medium">Message</p>
                                <h4 class="mb-0 ">6</h4>
                            </div>
                            <div class="flex-shrink-0 align-self-center">
                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                    <span class="avatar-title rounded-circle bg-primary">
                                        <i class="far fa-envelope font-size-24"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
       
        
        </div>
    </div>
    <div class="row">
    <div class="card col-xl-4 me-5">
        <div class="card-body d-flex align-items-start justify-content-between">
            <div>
                <h4 class="card-title mb-4">Gains Mensuels</h4>
                <p class="text-muted">Ce Mois</p>
                <h3>324DT</h3>
                <p class="text-muted">
                    <span class="text-success me-2"> 12% <i class="mdi mdi-arrow-up"></i></span>
                    Par rapport à la période précédente
                </p>
              
            </div>
          
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="mt-4">
                    <div id="radialBar-chart" data-colors='["--bs-primary"]' class="apex-charts"></div>
                </div>
            </div>
        </div>
      
    </div>
    <div class="card col-xl-5">
        <div class="card-body">
            <div class="d-flex flex-wrap align-items-start">
                <h5 class="card-title mb-3 me-2">Visiteurs</h5>

               
            </div>

            <div class="d-flex flex-wrap">
                <div>
                    <p class="text-muted mb-1">Nombre totale des visiteurs</p>
                    <h4 class="mb-3">72</h4>
                    <p class="text-success mb-0"><span>0.6 % <i class="mdi mdi-arrow-top-right ms-1"></i></span></p>
                </div>
                <div class="ms-auto align-self-end">
                    <i class="bx bx-group display-4 text-light"></i>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>


@endsection
