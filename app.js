let search = $("#user-input").val();

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=o11Pk6ZG5HRAkFACfAm8ABPMR3iZ0rGI"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL);
    console.log(response);
    let results = response.articles;
    for(i=0; i < results.length; i++){
        let articleDes = $("<p>").text(results[i].description);
            articleDes.addClass("articleDes");
        let articleImg = $("<img>");
            articleImg.attr("src", results[i].urlToImage)
            articleImg.addClass("articleImg");
        let articleTitle = $("<h2>").text(results[i].title)
            articleTitle.addClass("articleTitle");


        // append to page





    }
});

var queryURL2 = "https://newsapi.org/v2/everything?q=technology&apiKey=1529cadd622c471fb9b3bf964c426cf8"
$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function (response1) {
    console.log(queryURL2);
    console.log(response1);
    let results2 = response.response.docs;
    for(i=0; i < results2.length; i++){
        let articleDes2 = $("<p>").text(results2[i].lead_paragraph);
        articleDes2.addClass("articleDes");
    let articleImg2 = $("<img>");
        articleImg2.attr("src", results2[i].urlToImage)
        articleImg2.addClass("articleImg");
    let articleTitle2 = $("<h2>").text(results2[i].headline.main)
        articleTitle2.addClass("articleTitle");
    }
});

// $("#sumbit").on("click", function(){
//     
// })