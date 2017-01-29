// JQuery code to connect to Microsoft Computer API

// Global Key to connect to the API
var key = "81938164601d4cbc87d2d81ca1683e3f";
    
// On document load
$(function() {
    var url;

    //This function is executed when the submit button is clicked
    $('#submit').click( function() {
        url = $('#link').val();

        // Clear the previous image and info
        $('#image-field').empty();
        $('#name-field').empty();
        $('#confidence-field').empty();

        callAPI(url);
    });

    // Function to connect to the actual API
    function callAPI(url){
        var body = {"url": url};
        var params = {
            // Request parameters
            "visualFeatures": "Categories, Tags",
            "details": "Celebrities",
            "language": "en",
        };

        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
            },
            type: "POST",
            // Request body
            data: JSON.stringify(body),
        })
        .done(function(data) {
            console.log("success");
            console.log(data);

            // Update the webpage with the picture of the link
            $('#image-field').append('<img src="' + url + '"/>')
            $('#name-field').append('<h2>What Microsoft thinks this is:</h2>');

            // Loop for every tag the API provides
            for (var i = 0; i < data.tags.length; i++) {
                $('#name-field').append('<p>' + data.tags[i].name + '</p>');
            }

            // Update webpage with confidence score
            $('#confidence-field').append('<p>Microsoft is ' + data.categories[0].score + ' confident about its results.</p>');

        })
        // If the call is unsucessful
        .fail(function() {
            console.log("error");
        });
    }
});