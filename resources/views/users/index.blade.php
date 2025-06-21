<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Users List</title>
</head>

<body>
<div class="container mt-4">
        <div class="row">
            <div class="col-md-8">
                <div class="input-group mb-3">
                    <input type="text" id="search" class="form-control" placeholder="Search user...">
                    <button class="btn btn-outline-danger" id="clear-search">Clear</button>
                </div>

                <table class="table table-bordered table-hover" id="users-table"></table>

                <!-- Pagination + Entry Info on single line -->
                <div class="d-flex justify-content-between align-items-center mt-2 flex-nowrap overflow-auto gap-2">
                    <div id="entries-info" class="text-muted small flex-shrink-0"></div>
                    <div id="pagination" class="d-flex flex-wrap justify-content-end flex-grow-1 gap-1"></div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <h5 class="card-header">User Detail</h5>
                    <div class="card-body">
                        <div id="user-detail">Click on a user row...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Start Show user Detail Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userModalLabel">User Detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="user-modal-body">
                    <div class="text-muted"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Show user Detail Modal -->

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="{{asset('user/list.js')}}"></script>