//Global Varibles
var newsArray = [];



function createViewHere(title, url, img, desc) {
    

    let favTitle = title
    let newDesc = desc
    
    myFavoriteImg = $("<img>")
    myFavoriteImg.addClass("mr-2 rounded rounded-circle")
    myFavoriteImg.attr("width", "200")
    myFavoriteImg.attr("height", "200")
    myFavoriteImg.attr("id", "image")
    myFavoriteImg.attr("onerror", "this.src='https://fallmeeting.agu.org/2014/files/2012/09/blue-swirl.jpg'")
    myFavoriteImg.attr("src", img)


    favoriteDivTitle = $("<div>")
    favoriteDivTitle.attr("id", "article-name")
    favoriteDivTitle.addClass("pt-3 ")
    favoriteDivTitle.attr("width", "100%")
    favoriteDivTitle.attr("height", "100%")
    favoriteDivTitle.attr("fill", "#007bff")
    favoriteDivTitle.attr("name", title)
    favoriteDivTitle.attr("url", url)
    favoriteDivTitle.append(favTitle)
  
    favoriteDivStrong = $("<strong id='api-object-date'>")
    favoriteDivStrong.addClass("d-block text-dark")
    

    addFavoriteBtn = $("<button class='border-0' id='add-to-favorites'>")
    addFavoriteBtn.text("Add to Favorites")
  
    addFavorite = $('<small class="d-block float-right pb-3">')
    addFavorite.append(addFavoriteBtn)
  
    favoriteDivPTag = $("<p style=color:black>")
    favoriteDivPTag.attr("id", "api-object-description") 
    favoriteDivPTag.addClass("media-body pb-3 mb-0 small lh-125 border-bottom border-gray")
    favoriteDivPTag.append(favoriteDivStrong)
    favoriteDivPTag.text(newDesc)
    


    myFavorite = $("<div class='text-muted pt-3 pb-3'>")
    myFavorite.attr("id", "api-object")
    myFavorite.append(myFavoriteImg)
    myFavorite.append(favoriteDivTitle)
    myFavorite.append(favoriteDivPTag)
    
    myFavoriteAtag = $("<a>")
    myFavoriteAtag.attr("href", url)
    myFavoriteAtag.attr("target", "_blank")
    myFavoriteAtag.attr("id", "a-tag")
    myFavoriteAtag.append(myFavorite)

    outerDiv = $("<div class='container content'>")
    outerDiv.attr("id", "outer-div")
    outerDiv.append(addFavorite, myFavoriteAtag )
    


    $("#recent-updates-content").append(outerDiv)
  }




//NYT API Search Function
function NYTSearch(searchterm) {
    //construct query URL for our search term for New York Times
    var NYTqueryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchterm + "&api-key=o11Pk6ZG5HRAkFACfAm8ABPMR3iZ0rGI";
    //AJAX Call
    $.ajax({
        url: NYTqueryURL,
        method: "GET"
    }).then(function (NYTresponse) {
        // console.log("NYT query URL: " + NYTqueryURL);
        // console.log("NYT response object: " + NYTresponse);
        let NYTresults = NYTresponse.response.docs;
        for (i = 0; i < NYTresults.length; i++) {
            let NYTarticleTitle = NYTresults[i].headline.main;
            let NYTarticle = NYTresults[i].lead_paragraph;
            let NYTurl = NYTresults[i].web_url;
            let image = '';



            if (NYTresults[i].multimedia.length > 0) {
                image = "https://nytimes.com/" + NYTresults[i].multimedia[2].url;
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
        // console.log("WSJ Query Url: " + WSJqueryURL);
        // console.log(WSJresponse);
        let WSJresults = WSJresponse.articles;
        // console.log("WSJ response object" + WSJresults);
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
        // console.log(shuffledArray);
        $("#recent-updates-content").empty()
        for(i=0; i < 15; i++){
            
            // console.log(shuffledArray[i])
            // console.log(shuffledArray[i].title);
            // console.log(shuffledArray[i].image);
            // console.log(shuffledArray[i].url);
            createViewHere(shuffledArray[i].title, shuffledArray[i].url, shuffledArray[i].image,  shuffledArray[i].description)
        }
    });
    
    
};//END of WSJ API Search Function



//Seachbar Function + populate newsArray
$("#submitButton").on("click", function (event) {
    event.preventDefault()
    
    newsArray = []
    
    //NYT+WSJ AJAX calls
    let userSearchterm = $("#user-input").val();
    
    NYTSearch(userSearchterm);
    $("#user-input").val("")
    //populate articles array
    let searchbarResults = newsArray.push(NYTarticleDiv, WSJarticleDiv);
    //push new articles array to html
    $("#display").append(searchbarResults);
    
    
})
//END of Searchbar Function


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
$( document ).ready(function() {     NYTSearch("tech trends");     WSJsearch("tech trends"); });
console.log(newsArray);