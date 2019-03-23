// let search = $("#user-input").val();
//NEWS API AJAX
// var queryURL = "https://newsapi.org/v2/everything?q=technology&apiKey=1529cadd622c471fb9b3bf964c426cf8"
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(queryURL);
//     console.log(response);
//     let results = response.articles;
//     console.log(results);
//     for(i=0; i < results.length; i++){
//         let articleDiv = $("<div>")
        
//         let articleDes = $("<p>").text(results[i].description);
//             articleDes.addClass("articleDes");
//         let articleImg = $("<img>");
//             articleImg.attr("src", results[i].urlToImage)
//             articleImg.addClass("articleImg");
//         let articleTitle = $("<h2>").text(results[i].title)
//             articleTitle.addClass("articleTitle");

//             articleDiv.append(articleImg, articleTitle, articleDes)
//             $("#display").append(articleDiv);

//         // append to page

//     }
// });

var queryURL2 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=o11Pk6ZG5HRAkFACfAm8ABPMR3iZ0rGI"
$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function (response2) {
    console.log(queryURL2);
    console.log(response2);
    let results2 = response2.response.docs;
    for(i=0; i < results2.length; i++){

        let artcicleDiv2 = $("<div>")

        let articleDes2 = $("<p>").text(results2[i].lead_paragraph);
        articleDes2.addClass("articleDes");
    let articleImg2 = $("<img>");
        articleImg2.attr("src", "https://www.nytimes.com/" + results2[i].multimedia[2].url)
        articleImg2.addClass("articleImg");
    let articleTitle2 = $("<h2>").text(results2[i].headline.main)
        articleTitle2.addClass("articleTitle");

        artcicleDiv2.append(articleImg2, articleTitle2, articleDes2);
        $("#display").append(artcicleDiv2);
    }
});

// $("#sumbit").on("click", function(){
//     
// })
