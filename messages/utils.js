

function imageSearch(q) {
        var params = {
            // Request parameters
            "count": "1",
            "offset": "0",
            "mkt": "en-us",
            "safeSearch": "Strict",
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c1c3171e40a84965bd28375ea50f12ef");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    }