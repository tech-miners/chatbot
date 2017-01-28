// JQuery code 

var key = "81938164601d4cbc87d2d81ca1683e3f";
var url = "https://placekitten.com/300/400";
// url = "http://www.dv247.com/assets/products/212018_l.jpg";
var body = {"url": url};

    $(function() {
        var params = {
            // Request parameters
            "visualFeatures": "Categories, Tags",
            "details": "Celebrities",
            "language": "en",
        };

        console.log("https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + $.param(params));

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
            // alert("success");
            console.log("success");
            console.log(data);
            $('#image-field').append('<img src="' + url + '"/>')
            $('#name-field').append('<h2>What Microsoft thinks this is:</h2>');

            for (var i = 0; i < data.tags.length; i++) {
                $('#name-field').append('<p>' + data.tags[i].name + '</p>');
            }

            $('#confidence-field').append('<p>Microsoft is ' + data.categories[0].score + ' confident about its results.</p>');

        })
        .fail(function() {
            alert("error");
        });
    });