$(document).ready(function(){

$('#LoginButton').on('click', function(){
    const email = $("#Login-Email").val();
    const password = $("#Login-Password").val();
    var data = {};
    data.email = email;	
    data.password = password;			  
    $.ajax({
        url: 'auth', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
                                
        success: function(data) {
            if (data === 'Invalid username or password'){
                // console.log(data);
                alert(data);
            }
            else{
                // console.log(data);
                location.reload();
            }
        },
    });
})

$('#RegisterButton').on('click', function(){
    const name = $("#Register-name").val();
    const email = $("#Register-email").val();
    const password = $("#Register-password").val();
    const address = $("#Register-address").val();
    var data = {};
    data.name = name;
    data.email = email;	
    data.password = password;
    data.address = address;			  
    $.ajax({
        url: 'usersRegistration', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
                                
        success: function(data) {
            if (data === 'Already registered user'){
                alert(data);
            }
            else{
                location.reload();
            }
        },
    });
})


$('.index-filtering').on('click', function(e){

    let filter = $(this).text();
    console.log(filter);
    const page = 1;
    var data = {};
    data.filter = filter;	
    data.search_for = '';			  
    data.page = page;
    $.ajax({
        url: 'items/', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            $('#itemContainer').html(html) ;
        }
    });
});

$('#filter-search').on('click', function(e){

    const filter = $("#filter").val();
    const search_for_item = $("#search_for_item").val();
    const page = 1;
    var data = {};
    data.filter = filter;				  
    data.search_for = search_for_item; 
    data.page = page;
    $.ajax({
        url: 'items/', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
        						
        success: function(html) {
            $('#itemContainer').html(html) ;
        }
    });
});

$('#button-orders').on('click', function(e){
    $.ajax({
        url: '/orders/All', 
        type: 'GET',
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            // console.log("Success");
            console.log(html);
            $("#itemContainer").html(html);
        }
    });
    
})

$('#cart-button').on('click', function(e){
    $.ajax({
        url: '/cartItems', 
        type: 'GET',
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            // console.log("Success");
            // console.log(html);
            $("#itemContainer").html(html);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
            alert(error);
        }
    });
    
})

})


$(document).on("click", ".cart-trash", function(e){
    
    var item_id = $(this).parent().nextAll('.cart-card:first').find('.card-title').attr('id');
    //console.log(item_name);
   // var data = {}
   // data.item_name = item_name;
    $.ajax({
                url: 'deleteCart/'+item_id, 
                type: 'DELETE',
                data: {},
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})

$(document).on("click", ".cart-inc", function(e){
    
    var item_id = $(this).attr('id');
    $.ajax({
                url: 'updateCart/inc/'+item_id, 
                type: 'POST',
                data: {},
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})

$(document).on("click", ".cart-dec", function(e){
    
    var item_id = $(this).attr('id');
    $.ajax({
                url: 'updateCart/dec/'+item_id, 
                type: 'POST',
                data: {},
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})



$(document).on("click", ".cart", function(e){
    var item = $(this).parent().nextAll('.custom-column-content:first').find('.item-name').text();
    var data = {}
    data.item = item;
    // console.log(item);
    $.ajax({
                url: 'cart/', 
                type: 'POST',
                data: JSON.stringify(data),
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    alert(html);
                }
            });
})

$(document).on("click", ".cart-check", function(e){
    $.ajax({
                url: '/cartItems/checkout', 
                type: 'GET',
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})

// $(document).on("click", ".orderbtn", function(e){
//     alert('order button clicked');
//     console.log('order button clicked');
// });


$(document).on("click", ".yesbtn", function(e){
    $('#myOrderModal').modal('toggle');
    //var total = $('#totalamount').val();
    $.ajax({
        url: 'orders/', 
        type: 'GET',
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            // console.log("Success");
            alert(html);
        }
    });
    
})

$(document).on("click", ".nobtn", function(e){
    $('#myOrderModal').modal('toggle');
})


$(document).on("click", ".page-number", function(e){
    var page = $(this).text();
    const filter = $("#filter").val();
    const search_for_item = $("#search_for_item").val();
    var data = {};
    data.filter = filter;				  
    data.search_for = search_for_item; 
    data.page = page;
    console.log(data);
    $.ajax({
                url: 'items/', 
                type: 'POST',
                data: JSON.stringify(data),
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})

$(document).on("click", ".availability", function(e){
    console.log("Hello");
    var id = $(this).attr('id');
    $.ajax({
                url: 'timeSlot/'+id, 
                type: 'GET',
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#itemContainer').html(html) ;
                }
            });
})







