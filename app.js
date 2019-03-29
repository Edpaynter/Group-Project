//Global Varibles
var newsArray = [];

//NYT API Search Function
function NYTSearch(searchterm) {
    //construct query URL for our search term for New York Times
    var NYTqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchterm + "&api-key=o11Pk6ZG5HRAkFACfAm8ABPMR3iZ0rGI";
    //AJAX Call
    $.ajax({
        url: NYTqueryURL,
        method: "GET"
    }).then(function (NYTresponse) {
        console.log("NYT query URL: " + NYTqueryURL);
        console.log("NYT response object: " + NYTresponse);
        let NYTresults = NYTresponse.response.docs;
        for (i = 0; i < NYTresults.length; i++) {
            let NYTarticleTitle = NYTresults[i].headline.main;
            let NYTarticle = NYTresults[i].lead_paragraph;
            let NYTurl = NYTresults[i].web_url;

            let image = '';
            if (NYTresults[i].multimedia.length > 0) {
                image = NYTresults[i].multimedia[2].url;
            }

            let newsArticle = {
                title: NYTarticleTitle,
                image: image,
                description: NYTarticle,
                url: NYTurl,
            }
            newsArray.push(newsArticle);
        }
        WSJsearch(searchterm);
    });
}; //END of NYT API Search Function

//WSJ API Search Function
function WSJsearch(searchterm) {
    //NEWS API AJAX
    var WSJqueryURL = "https://newsapi.org/v2/everything?q=" + searchterm + "&apiKey=1529cadd622c471fb9b3bf964c426cf8";
    //AJAX Call
    $.ajax({
        url: WSJqueryURL,
        method: "GET"
    }).then(function (WSJresponse) {
        console.log("WSJ Query Url: " + WSJqueryURL);
        console.log(WSJresponse);
        let WSJresults = WSJresponse.articles;
        console.log("WSJ response object" + WSJresults);
        for (i = 0; i < WSJresults.length; i++) {
            //create newsarticle format for news array
            let WSJarticleTitle = WSJresults[i].title;
            let WSJarticleImg = WSJresults[i].urlToImage;
            let WSJarticle = WSJresults[i].description;
            let WSJurl = WSJresults[i].url

            let newsArticle = {
                title: WSJarticleTitle,
                image: WSJarticleImg,
                description: WSJarticle,
                url: WSJurl,
            }
            newsArray.push(newsArticle);
        }
        console.log(newsArray);
        const shuffledArray = shuffle(newsArray);
        console.log(shuffledArray);
    });
};//END of WSJ API Search Function

//Seachbar Function + populate newsArray
$("#submitButton").on("click", function () {
    //NYT+WSJ AJAX calls
    let userSearchterm = $("#user-input").val();
    NYTSearch(userSearchterm);
    //Call function that empties the newsArray, then populates the array using the the new search terms
    $("#newsArray").empty();
    //populate articles array
    let searchbarResults = newsArray.push(NYTarticleDiv, WSJarticleDiv);
    //push new articles array to html
    $("#display").append(searchbarResults);
})
//END of Searchbar Function

//Document "on-click" function for articles
$(document).on("click", ".NYTarticlesDes", ".WSJarticleDes", function () {
    //open new tab function

});

//Document load function

NYTSearch("technology");

var shuffle = function (newsArray) {

    var currentIndex = newsArray.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = newsArray[currentIndex];
        newsArray[currentIndex] = newsArray[randomIndex];
        newsArray[randomIndex] = temporaryValue;
    }

    return newsArray;

};

// function articleShuffle(newsArray) {
//     var a, b, i;
//     for (i = newsArray.length - 1; i > 0; i--) {
//         a = Math.floor(Math.random() * (i + 1));
//         b = newsArray[i];
//         newsArray[i] = newsArray[a];
//         newsArray[a] = b;
//     }
//     return newsArray;
// }
console.log(newsArray);