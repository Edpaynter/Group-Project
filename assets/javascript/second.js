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

  let favImg = snapshot.val().img
  let favTitle = snapshot.val().title
  let favUrl = snapshot.val().url
  console.log(favImg)
  console.log(favTitle)
  console.log(favUrl)

  var myFavoriteAtag = $("<a>")
  myFavoriteAtag.append(myFavorite)

  myFavoriteImg = $("<img>")
  myFavoriteImg.addClass("mr-2 rounded rounded-circle")
  myFavoriteImg.attr("width", "200")
  myFavoriteImg.attr("height", "200")
  myFavoriteImg.attr("id", "image")
  myFavoriteImg.attr("src", favImg)

  addFavoriteBtn = $("<button class='border-0'>")
  addFavoriteBtn.attr("id", "add-to-favorites")
  addFavoriteBtn.text("Add to Favorites")

  addFavorite = $('<small class="d-block float-right">')
  addFavorite.append(addFavoriteBtn)

  favoriteDivStrong = $("<strong id='api-object-date'>")
  favoriteDivStrong.addClass("d-block text-dark")
  favoriteDivStrong.text(favTitle)

  favoriteDivTitle = $("<div>")
  favoriteDivTitle.attr("id", "api-object-title")
  favoriteDivTitle.addClass("pt-3")
  favoriteDivTitle.attr("width", "100%")
  favoriteDivTitle.attr("height", "100%")
  favoriteDivTitle.attr("fill", "#007bff")
  favoriteDivTitle.attr("name", "Article Title")
  favoriteDivTitle.text(favUrl)

  favoriteDivPTag = $("<p style=color:black>")
  favoriteDivPTag.attr("id", "api-object-description") 
  favoriteDivPTag.addClass("media-body pb-3 mb-0 small lh-125 border-bottom border-gray")
  favoriteDivPTag.append(favoriteDivStrong)
  favoriteDivPTag.text("jalksdjf;lasjdf;lkasd;lfjasd;lkjf;lksdajlk;fjals;kdjf;lksadjkl;dslkjfa;dls")
  favoriteDivPTag.append(addFavorite)

  myFavorite = $("<div class='text-muted pt-3 pb-3'>")
  myFavorite.attr("id", "api-object")
  myFavorite.append(myFavoriteImg)
  myFavorite.append(favoriteDivTitle)
  myFavorite.append(favoriteDivPTag)

  
  $("#favorites-content").append(myFavoriteAtag)
}

$(document).on("click", '#add-to-favorites', function () {
  let addImg = $(this).parents("#api-object").find("img").attr("src")
  let addTitle = $(this).parents("#api-object").find("div").attr("name")
  let addUrl = $(this).parents("#api-object").find("div").attr("url")
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
