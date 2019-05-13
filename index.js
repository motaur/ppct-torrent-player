const url = 'https://tv-v2.api-fetch.website'
var page = 1


$.get( url + '/movies/' + page,  ( data )=>
{
    console.log(data)
    for(i = 0; i < data.length; i++) 
    {        
        $( "#movies" ).append(`
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
            <img  src="${data[i].images.poster}" class="bd-placeholder-img card-img-top">
            <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].synopsis}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a onclick="loadMovie('${data[i]._id}', '${data[i].images.poster}')" type="button" class="btn btn-sm btn-outline-secondary">View</a>
                        <a type="button" class="btn btn-sm btn-outline-secondary">Like</a>
                    </div>
                    <small class="text-muted">9 likes</small>
                </div>
            </div>
            </div>
        </div>      
        `)
    }
  
})

function loadMovie(imdbid, poster)
{       
    $( "#frame" ).empty()

    $.get( url + '/movie/' + imdbid,  ( movie )=>{
        console.log(movie)

        //static
        $( "#frame" ).append
        (`
            <h2>${movie.title}</h2>
            <p><i class="material-icons">date_range</i> ${movie.year} <i class="material-icons">access_time</i> ${movie.runtime} min <a href="${movie.trailer}">Trailer</a> </p>
            <p>${movie.synopsis}</p>          
            
            
        `)

        //dynamics
        for (var lang in movie.torrents)
        {
            $( "#frame" ).append(`${lang}: <div class="btn-group">`)

            if(typeof(movie.torrents[lang]) === 'object') 
            {
                for (var p in movie.torrents[lang])
                {
                    $( "#frame" ).append
                    (`
                        <button 
                            onclick="play('${movie.torrents[lang][p].url}', '${imdbid}', '${poster}')" 
                            type="button" class="btn btn-sm btn-outline-secondary">
                            ${p}
                        </button>
                    `)
                }
            }            

            $( "#frame" ).append(`<div>`)
        }

        
    })    
}

function play(magnet, imdbid, poster)
{   
    //torrentstime
    $( "#frame" ).append
    (`
        <br>
        <br>
        <script>torrentsTime.init({publisher_id:1})</script>
        <div class="torrentsTime" data-setup='{"source": "${magnet}", "imdbid": "${imdbid}", "poster": "${poster}"}'></div>
    `)   
    
    /*
    //webtorrent way
    var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'
    //var torrentId = id
    console.log(torrentId)

    // Download the torrent
    var client = new WebTorrent()    

    client.add(torrentId, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
    var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
    })

    // Display the file by adding it to the DOM.
    // Supports video, audio, image files, and more!
    file.appendTo("#frame")
    })*/
}




