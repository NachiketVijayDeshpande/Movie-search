// javascript


const renderSection = document.getElementById('render-section')
const searchButton =document.getElementById('Search-Button')
const searchValue =document.getElementById('search-value')
const wathlistButton =document.getElementById('wathlist-button')
const addedpopup =document.getElementById('popup-section')
let render =[]
let imdb 


document.addEventListener('click',function(e){
    if(e.target.dataset.movieid){
        wathList(e.target.dataset.movieid)
        addedBtn()
   }
   if(e.target.dataset.remove){
    removeWatchlistItem(e.target.dataset.remove)
    renderwatchlist()
   }
   
})
wathlistButton.addEventListener('click', renderwatchlist)


function removeWatchlistItem(id){
    document.getElementById('removepopup-section').style.display ='block'
     renderSection.innerHTML =''
    const storedArray = JSON.parse(localStorage.getItem('Movies'))
const index = storedArray.indexOf(id)
   if (storedArray.includes(id)) {
    storedArray.splice(index,1);
    localStorage.setItem('Movies', JSON.stringify(storedArray));
      return storedArray;      
  }
  
}






function wathList(imdbid){
    fetch(`https://www.omdbapi.com/?apikey=59be13da&i=${imdbid}`)
.then(res => res.json())
.then(data => {

manageLocalStorageArray('Movies',data.imdbID)

})

}

function manageLocalStorageArray(key, data) {
  let storedArray = JSON.parse(localStorage.getItem(key)) || [];
  if (!storedArray.includes(data)) {
    storedArray.push(data);
  }

  localStorage.setItem(key, JSON.stringify(storedArray));

  return storedArray;
}
    
    


function returnMovieId(){
fetch("https://www.omdbapi.com/?s=movie&apikey=59be13da")
.then(res =>res.json())
.then(data=>{ render = data.Search.map(function(each){

  renderMovies(each.imdbID)
  
  } )

})

}

returnMovieId()

function renderMovies(imdbid){
fetch(`https://www.omdbapi.com/?apikey=59be13da&i=${imdbid}`)
.then(res => res.json())
.then(data => {renderOnscreen(data)})
}

function renderOnscreen(data){
         renderSection.innerHTML +=  `<div id="styling-render">
                                            <div>
                                                <img src='${data.Poster}' id="poster-image">
                                            </div>
                                            <div id="styling-subdiv">
                                                <div id="flexcont">
                                                    <p id="movie-title">${data.Title}</p>
                                                    <p id="movie-rating">⭐️ ${data.imdbRating}</p>
                                                </div>
                                                <div id="movie-details" >
                                                    <p>${data.Runtime}</p>
                                                    <p>${data.Genre}</p>
                                                    
                                                    <p><i class="fa-solid fa-circle-plus" data-movieid="${data.imdbID}"></i>      Watchlist</p>
                                                </div>
                                                <p id="movie-plot">${data.Plot}</p>
                                                </div>
                                            </div>
                                    </div>`
    

}

searchButton.addEventListener('click', searchMovie)


function searchMovie(value){
    renderSection.innerHTML =''
  
    fetch(`https://www.omdbapi.com/?apikey=59be13da&s=${searchValue.value}`)
    .then(res=>res.json())
    .then(data =>{
    
    data.Search.map(function(data){
         fetch(`https://www.omdbapi.com/?apikey=59be13da&i=${data.imdbID}`)
        .then(res => res.json())
        .then(data => {renderOnscreen(data)})

        })
                                    }) 



}




function renderwatchlist(){
   
        document.getElementById('popup-section').style.display ='none'

    renderSection.innerHTML =''
    const list = JSON.parse(localStorage.getItem('Movies')).map(function(each){
        fetch(`https://www.omdbapi.com/?apikey=59be13da&i=${each}`)
.then(res => res.json())
.then(data => {

renderSection.innerHTML +=  `<div id="styling-render">
                                            <div>
                                                <img src='${data.Poster}' id="poster-image">
                                            </div>
                                            <div id="styling-subdiv">
                                                <div id="flexcont">
                                                    <p id="movie-title">${data.Title}</p>
                                                    <p id="movie-rating">⭐️ ${data.imdbRating}</p>
                                                </div>
                                                <div id="movie-details" >
                                                    <p>${data.Runtime}</p>
                                                    <p>${data.Genre}</p>
                                                    
                                                    <p>
                                                    <i class="fa-solid fa-circle-minus" data-remove="${data.imdbID}"></i> Remove</p>
                                                </div>
                                                <p id="movie-plot">${data.Plot}</p>
                                                </div>
                                            </div>
                                    </div>`
    




})
        
    })

}

function addedBtn(){
    setTimeout(() => {
  addedpopup.style.display ='block'
}, 500);

    
        setTimeout(() => {
  addedpopup.style.display ='none'
}, 1500);

}
