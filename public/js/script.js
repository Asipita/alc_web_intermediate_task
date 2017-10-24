$('#create_form, #list_form, #delete_form, #resource_update_form ').hide();

$('#create_resource_button').on('click', () => {
    $('.first_page, #list_form, #delete_form, #resource_update_form, .first_table').hide();
    $('#create_form').show();

})

$('#show_resource_button').on('click', () => {
    $('.first_page, #create_form, #delete_form, #resource_update_form, .first_table').hide();
    $('#list_form').show();

})

$('#delete_resource_button').on('click', () => {
    $('.first_page, #create_form, #list_form, #resource_update_form, .first_table').hide();
    $('#delete_form').show();
})

$('#update_resource_button').on('click', () => {
    $('.first_page, #create_form, #list_form, #delete_form, .first_table').hide();
    $('#resource_update_form').show()

})




var ajaxSubmit = (url, method, form) => {
    $.ajax({
        url,
        method,
        data: form.serialize()
    }).done((msg) => {
        Materialize.toast(msg, 2000, 'rounded');
        form[0].reset();
    })
}

$('#create_submit').on('click', () => {
    ajaxSubmit('/create_resource', 'POST', $('#create_form'))

})



$('#list_submit').on('click', () => {
    // alert('hello')
    $.ajax({
        url: '/list_resource',
        method: 'POST',
        data: $('#list_form').serialize()
    }).done((result) => {
        // alert(result);


        if (result.length === 0) {
            return Materialize.toast('file not found', 2000, 'rounded')
        } else {
            $('#list_form').hide();
            increaseRows(result);
            $('.first_table').show();
            $('#list_form')[0].reset();

        }

    })
})

$('#list_all_submit').on('click', () => {
    // alert('hello')
    $.ajax({
        url: '/list_all',
        method: 'GET',
    }).done((result) => {
        if (result.length === 0) {
            return Materialize.toast('there are no resources in the database', 2000, 'rounded')
        }

        // $('#list_form').hide();
        $('#list_form').hide();
        increaseRows(result);
        $('.first_table').show();


    })
})

$('#delete_resource').on('click', () => {
    $.ajax({
        url: '/delete_resource',
        method: 'DELETE',
        data: $('#delete_form').serialize()
    }).done((result) => {
        if (result === `bad`) {
            return Materialize.toast(`error! resource does not exist`, 2000, 'rounded')
        }
        Materialize.toast(result, 2000, 'rounded');
        $('#delete_form')[0].reset();
    })
})

$('#update_submit').on('click', () => {
    $.ajax({
        url: '/update_resource',
        method: 'PATCH',
        data: $('#resource_update_form').serialize()
    }).done((result) => {
        Materialize.toast(result, 3000, 'rounded')
        $('#resource_update_form')[0].reset();
    })
})

var increaseRows = (result) => {
    // $('.madmin').hide();

    $('.first_table').html(`
    <table class="table responsive-table bordered card">
        <thead class="teal white-text card hoverable">
            <tr>
                <td>fullname</td>
                <td>Date Of Birth</td>
                <td>Nationality</td>
                <td>Gender</td>
                <td>State Of Origin</td>
                <td>Admission number</td>
                <td>Class in</td>
                <td>Class Out</td>
                <td>Entry Date</td>
                <td>Exit Date</td>
            </tr>
        </thead>
        <tbody class="list_body">
        </tbody>
        <div>

        <!-- <a href="index.html" class="btn pulse">Close</a>-->
        </div>
    </table>


`)

    let count = result.length;

    for (var i = 0; i < count; i++) {
        $('.results-container').show();
        $('.list_body').append(`
                <tr class="black-text text-darken-2">
                    <td>${result[i].surname} ${result[i].firstname} ${result[i].lastname}</td>
                    <td>${result[i].date_of_birth}</td>
                    <td>${result[i].nationality}</td>
                    <td>${result[i].gender}</td>
                    <td>${result[i].state_of_origin}</td>
                    <td>${result[i].admission_number}</td>
                    <td>${result[i].class_in}</td>
                    <td>${result[i].class_out}</td>
                    <td>${result[i].entry_date}</td>
                    <td>${result[i].exit_date}</td>
                </tr>
            `)
    }

}