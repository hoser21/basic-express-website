// Author: Kevin Hoser

/**
 * Prints the data from the form after the form
 * and sends post to update database
 */
function submitForm() {
    var quantity = $("#quantity").val();
    var topping = $("input[name=topping]:checked").val();
    var notes = $("#notes").val();

    var quantity_str = "Quantity: " + quantity;
    var topping_str = "Topping: " + topping;
    var notes_str = "Notes: " + notes;

    $("#cake_form").after("<h3>Thank You! Your order had been submitted.</h3>" +
        "<p>" + quantity_str + "<br>" +
        topping_str  + "<br>" +
        notes_str + "</p>");

    var query_path = "/neworder/" + quantity + "/" + topping + "/" + encodeURIComponent(notes);
    console.log("Query Path for Adding Order: " + query_path);
    $.post(query_path);
}

function updateTotalOrders(month) {
    var query_path = "/orders/" + month;

    $("#order_month").text(month);

    $.post(query_path, null, function(orders) {
        $("#order_history").empty();

        // parse JSON data and put every entry onto the list
        // if there are no orders for the month, specify

        var order_data = orders["data"];
        var toAdd

        if ( jQuery.isEmptyObject(order_data) ) {
            toAdd = "<p>There are no order for this month.</p>";
            $("#order_history").append(toAdd);
        } else {
            $.each(order_data, function(i, item) {
                var toAdd = $("<li></li>").text(item["QUANTITY"] + " " + item["TOPPING"]);
                $("#order_history").append(toAdd);
            });
        }
    });
}

/*
 * Form Validation:
 * 1. warns user that cheesecake contains dairy if 
 *      the word 'vegan" is in the notes
 * 2. otherwise, clears the form html and prints out the order
 */
eventValidateForm = function() {
    var notes = $("#notes").val().toLowerCase();

    // alert for vegan
    if (notes.search("vegan") != -1) {
        alert("Warning: We noticed you mentioned vegan in your notes. " +
            "Please be aware that cheesecake contains dairy.");
    } else {
        submitForm();
        $("#cake_form").remove();
    }

}


$(document).ready(function() {

    // update the default total orders (jan)
    updateTotalOrders("Jan");

    $("#cake_form").submit(eventValidateForm);

    // 1. update the hover menu title to be the month the user clicked on
    // 2. update the total order list by using a GET request
    $(".dropdown-click").click(function() {
        updateTotalOrders($(this).text());
    });
});