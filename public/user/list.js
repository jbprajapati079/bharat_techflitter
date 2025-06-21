let currentPage = 1;
let search = '';

function loadUsers(page = 1) {

    //fetch api data 
    $.get(`/api/users?page=${page}&search=${search}`, function (data) {
        let thead = `
                    <thead class="table">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                `;


        let tbody = '<tbody>';
        $.each(data.data, function (i, user) {
            tbody += `
                        <tr class="user-row" data-id="${user.id}">
                            <td>${i + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>
                                <button class="btn btn-sm btn-success view-btn" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#userModal">View</button>
                            </td>
                        </tr>
                    `;
        });
        tbody += '</tbody>';
        $('#users-table').html(thead + tbody);


        // start pagination
        const from = data.from || 0;
        const to = data.to || 0;
        const total = data.total || 0;
        $('#entries-info').html(`Showing ${from} to ${to} of ${total} entries`);

        const totalPages = data.last_page;
        const current = data.current_page;
        let pag = '';

        const pageButton = (page) => {
            return `<button class="btn btn-sm mx-1 ${page === current ? 'btn-outline-primary' : 'btn-outline-primary'} page-btn" data-page="${page}">${page}</button>`;
        };

        let pagesToShow = new Set();

        // Always show first page
        pagesToShow.add(1);

        // Always show current - 1, current, current + 1
        if (current > 1) pagesToShow.add(current - 1);
        pagesToShow.add(current);
        if (current < totalPages) pagesToShow.add(current + 1);

        // Add show page 
        [1000, 4000].forEach(p => {
            if (p <= totalPages) pagesToShow.add(p);
        });

        // Always show last page
        pagesToShow.add(totalPages);

        // Convert to sorted array
        const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);

        // skipped page ranges
        let lastPage = 0;
        sortedPages.forEach(p => {
            if (p - lastPage > 1) {
                pag += `<span class="mx-1">...</span>`;
            }
            pag += pageButton(p);
            lastPage = p;
        });

        $('#pagination').html(pag);
        // end pagination
    });
}

// start get user detail data 
function loadUserDetail(id, target = 'user-detail') {
    $.get(`/api/users/${id}`, function (user) {
        const content = `
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                `;
        $('#' + target).html(content);
    });
}
// end user detail data 

// start show user data of current page
$(document).on('click', '.page-btn', function () {
    currentPage = $(this).data('page');
    loadUsers(currentPage);
});
// end show user data of current page

// Show user detail
$(document).on('click', '.user-row', function (e) {
    if (!$(e.target).hasClass('view-btn')) {
        loadUserDetail($(this).data('id'), 'user-detail');
    }
});


// search of user
$('#search').on('input', function () {
    search = $(this).val();
    loadUsers(1);
});

// Clear button of user
$('#clear-search').on('click', function () {
    $('#search').val('');
    search = '';
    loadUsers(1);
});

// Auto-refresh every 10 seconds
setInterval(() => loadUsers(currentPage), 10000);


// start show user detail modal
$(document).on('click', '.view-btn', function () {
    const userId = $(this).data('id');
    $('#user-modal-body').html('<div class="text-muted">Loading...</div>');

    $.get(`/api/users/${userId}`, function (user) {
        const userdetail = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        `;
        $('#user-modal-body').html(userdetail);
    });
});
// end show user detail modal


// userdata load
loadUsers();