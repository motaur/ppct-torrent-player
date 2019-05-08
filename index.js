var client = new WebTorrent()
var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

//onInit
$.get( "https://tv-v2.api-fetch.website/movies/1", ( data )=>
{
    console.log(data)
    for(i = 0; i < data.length; i++) 
    {
        console.log(data)
        $( "#movies" ).append(`
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
            <img href="#" onclick="loadMovie(${i})" src="${data[i].images.poster}" class="bd-placeholder-img card-img-top">
            <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">${data[i].synopsis}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Like</button>
                    </div>
                    <small class="text-muted">9 likes</small>
                </div>
            </div>
            </div>
        </div>    
        `)
    }
  
});

function loadMovie(id)
{
   alert(id)
}

function play()
{
    client.add(torrentId, function (torrent) {
        // Torrents can contain many files. Let's use the .mp4 file
        var file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })
        file.appendTo('body') // append the file to the DOM
    })
}
