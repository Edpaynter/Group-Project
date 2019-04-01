// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKfJo1VeVmdtGhGWEgv8o9_0aG_jg74JA",
  authDomain: "group-project-1b69f.firebaseapp.com",
  databaseURL: "https://group-project-1b69f.firebaseio.com",
  projectId: "group-project-1b69f",
  storageBucket: "group-project-1b69f.appspot.com",
  messagingSenderId: "45502728244"
};
firebase.initializeApp(config);
database = firebase.database()

placeholder = "https://www.gaskinsbennett.com/wp-content/uploads/2017/06/placeholder-500x500.jpg"

function createView(snapshot) {
  console.log("hello")
  console.log(snapshot)
  let favImg = snapshot.val().img
  let favTitle = snapshot.val().title
  let favUrl = snapshot.val().url
  console.log(favImg)
  console.log(favTitle)
  console.log(favUrl)

  myFavoriteImg = $("<img>")
  myFavoriteImg.addClass("mr-2 rounded rounded-circle")
  myFavoriteImg.attr("width", "200")
  myFavoriteImg.attr("height", "200")
  myFavoriteImg.attr("id", "favorites-image")
  myFavoriteImg.attr("src", favImg)

  favoriteDivTitle = $("<div>")
  favoriteDivTitle.attr("id", "favorites-api-object-title")
  favoriteDivTitle.addClass("pt-3")
  favoriteDivTitle.attr("width", "100%")
  favoriteDivTitle.attr("height", "100%")
  favoriteDivTitle.attr("fill", "#007bff")
  favoriteDivTitle.attr("name", "Article Title")
  favoriteDivTitle.text('')

  favoriteDivStrong = $("<strong id='api-object-date'>")
  favoriteDivStrong.addClass("d-block text-dark")
  favoriteDivStrong.text(favTitle)

  addFavoriteBtn = $("<button class='border-0'>")
  addFavoriteBtn.attr("id", "favorites-add-to-favorites")
  addFavoriteBtn.text("")

  addFavorite = $('<small class="d-block float-right">')
  addFavorite.append(addFavoriteBtn)

  favoriteDivPTag = $("<p style=color:black>")
  favoriteDivPTag.attr("id", "favorites-api-object-description") 
  favoriteDivPTag.addClass("media-body pb-3 mb-0 small lh-125 border-bottom border-gray")
  favoriteDivPTag.append(favoriteDivStrong)
  // favoriteDivPTag.append(favTitle)
  favoriteDivPTag.append(addFavorite)

  myFavorite = $("<div class='text-muted pt-3 pb-3'>")
  myFavorite.attr("id", "favorites-api-object")
  myFavorite.append(myFavoriteImg)
  myFavorite.append(favoriteDivTitle)
  myFavorite.append(favoriteDivPTag)


  var myFavoriteAtag = $("<a>")
  myFavoriteAtag.attr("href", favUrl)
  myFavoriteAtag.attr("target", "_blank")
  myFavoriteAtag.append(myFavorite)

  
  $("#favorites-content").prepend(myFavoriteAtag)
}

$(document).on("click", '#add-to-favorites', function () {
  
  
  let addImg = $(this).parents("#outer-div").find("#api-object").find("img").attr("src")
  let addTitle = $(this).parents("#outer-div").find("#api-object").find("div").attr("name")
  let addUrl = $(this).parents("#outer-div").find("#api-object").find("div").attr("url")
  console.log(addImg)
  console.log(addTitle)
  console.log(addUrl)
  

  newEntry = {
    title: addTitle,
    img: addImg,
    url: addUrl,
  }
  database.ref().push(newEntry)

  
})


database.ref().on("child_added", function (snapshot) {
  
  createView(snapshot)
  

});
