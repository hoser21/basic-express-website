// Author: Kevin Hoser

/**
 * Prints the data from the form after the form
 */
function printForm() {
    var quantity = "Quantity: " + $("#quantity").val();
    var topping = "Topping: " + $("input[name=topping]:checked").val();
    var notes = "Notes: " + $("#notes").val();

    $("#cake_form").after("<h3>Thank You! Your order had been submitted.</h3>" +
        "<p>" + quantity + "<br>" +
        topping  + "<br>" +
        notes + "</p>");
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
        printForm();
        $("#cake_form").remove();
    }

}


$(document).ready(function() {

    $("#cake_form").submit(eventValidateForm);

    // 1. update the hover menu title to be the month the user clicked on
    // 2. update the total order list by using a GET request
    $(".dropdown-click").click(function() {

        $("#order_month").text($(this).text());

        $.post("/orders", $(this).text(), function(orders) {
            $("#order_history").empty();

            // parse JSON data and put every entry onto the list
            $.each(orders["data"], function(i, item) {
                var toAdd = $("<li></li>").text(item["quantity"] + " " + item["topping"]);
                $("#order_history").append(toAdd);
            });
        });
    });
});