<!doctype html>
<html lang="en">

    
<head>

        <meta charset="utf-8" />
        <title>@yield('title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
        <meta content="Themesbrand" name="author" />
       
        <link rel="shortcut icon" href="/assets/images/favicon.ico">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link href="/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
      
        <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        
        <link href="/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

    </head>

    <body data-sidebar="dark" data-layout-mode="light">

    
        <div id="layout-wrapper">

            
            <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                       
                        <div  >
                           

                            <a href="/" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="/assets/my_images/supadata_small.png" alt="" height="50" width="100" >
                                </span>
                                <span class="logo-lg m-3">
                                    <img src="/assets/my_images/logo.png" alt="" height="60" width="100">
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>

                       
                        <form class="app-search d-none d-lg-block">
                            <div class="position-relative">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="bx bx-search-alt"></span>
                            </div>
                        </form>

                        
                    </div>

                    <div class="d-flex">

                        <div class="dropdown d-inline-block d-lg-none ms-2">
                            <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-search-dropdown">
        
                                <form class="p-3">
                                    <div class="form-group m-0">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                       

                      

                        <div class="dropdown d-none d-lg-inline-block ms-1">
                            <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                                <i class="bx bx-fullscreen"></i>
                            </button>
                        </div>

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="bx bx-bell bx-tada"></i>
                                <span class="badge bg-danger rounded-pill">
                                </span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-notifications-dropdown">
                                <div class="p-3">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h6 class="m-0" key="t-notifications"> Notifications </h6>
                                        </div>
                                        <div class="col-auto">
                                            <a href="#!" class="small" key="t-view-all"> View All</a>
                                        </div>
                                    </div>
                                </div>
                               
                                <div class="p-2 border-top d-grid">
                                    <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                        <i class="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">View More..</span> 
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="rounded-circle header-profile-user" src="/assets/my_images/admin_logo.png"
                                    alt="Header Avatar">
                                <span class="d-none d-xl-inline-block ms-1" key="t-henry">Admin</span>
                                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                               
                               
                                
                                <a class="dropdown-item text-danger" href="#"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                            </div>
                        </div>


                    </div>
                </div>
            </header>

            
            <div class="vertical-menu">

                <div data-simplebar class="h-100">

                   
                    <div id="sidebar-menu">
                        
                        <ul class="metismenu list-unstyled" id="side-menu">
                            <li class="menu-title" key="t-menu">Menu</li>

                            <li class="mb-3">
                                <a href="/" class=" waves-effect">
                                    <i class="bx bx-home-circle"></i>
                                    <span key="t-dashboards">Dashboards</span>
                                </a>
                               
                            </li>

                          
                          

                

                        

                            <li class="mb-3">
                                <a href="/list_users" class="waves-effect">
                                    <i class="fa-solid fa-users" ></i>
                                    <span key="t-chat " class="ms-3">Utilisateurs<br> personne-physique</span>
                                </a>
                            </li>

                            
                            <li class="mb-3">
                                <a href="/list_companies" class="waves-effect">
                                    
                                    <i class="bx bx-briefcase-alt"></i>
                                    <span key="t-jobs" class="ms-3">Utilisateurs<br> personne-morale</span>
                                </a>
                             
                            </li>
                            <li class="mb-3">
                                <a href="/list_ambassador" class="waves-effect">
                                    <i class="fa-solid fa-users" ></i>
                                    <span key="t-chat " class="ms-3">Ambassadeurs</span>
                                </a>
                            </li>
                           

                            <li class="mb-3">
                                <a href="#" class=" waves-effect">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <span key="t-crypto">Payements</span>
                                </a>
                                
                            </li>
                            <li class="mb-3">
                                <a href="#" class=" waves-effect">
                                    <i class="fa-solid fa-envelope"></i>
                                    <span key="t-crypto">Messages</span>
                                </a>
                                
                            </li>
                       

                       

                      

                        

                            <li class="mb-3">
                                <a href="#" class=" waves-effect">
                                    <i class="bx bxs-user-detail"></i>
                                    <span key="t-contacts">Contacts</span>
                                </a>
                              
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="fas fa-cogs"></i> Settings
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="dropdown-item text-danger" href="#"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>

                            </li>
                            
                        </ul>
                    </div>
                    
                </div>
            </div>
           
            {{-- ----------------------- --}}
            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">
               @yield('contenu')

                       

                    </div> 
                </div>
                

                <footer class="footer">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                <script>document.write(new Date().getFullYear())</script> © Ahmed Khiari.
                            </div>
                            <div class="col-sm-6">
                                <div class="text-sm-end d-none d-sm-block">
                                    Design & Develop by khiari Ahmed
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
           

        </div>
       

        
      
      

      
        <script src="./assets/libs/jquery/jquery.min.js"></script>
        <script src="./assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="./assets/libs/metismenu/metisMenu.min.js"></script>
        <script src="./assets/libs/simplebar/simplebar.min.js"></script>
        <script src="./assets/libs/node-waves/waves.min.js"></script>

        <script src="./assets/js/app.js"></script>

        

    </body>


</html>
