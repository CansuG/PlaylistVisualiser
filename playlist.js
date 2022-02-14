var actual_JSON;
var playlist_name;

function loadJSON(callback, sample) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.open("GET", sample, true);
    xobj.send(null);
}
try {
    function start(sample) {
        loadJSON(function (response) {
            actual_JSON = JSON.parse(response);
        }, sample);

        console.log(actual_JSON);

        var text = "";
        var count = Object.keys(actual_JSON.playlists).length;
        text += "<table class='table table-hover'>" + "<tr><th>Playlist ID</th><th>Playlist Name</th><th>Number of Tracks</th><th></th></tr>";
        for (let i = 0; i < count; i++) {
            playlist_name = actual_JSON.playlists[i].name;
            text += "<tr><td>" + actual_JSON.playlists[i].pid + "</td>" +
                "<td>" + playlist_name + "</td>" +
                "<td>" + actual_JSON.playlists[i].num_tracks + "</td>" +
                "<td>" + "<button class=\"btn btn-dark\" style=\"margin:5px\" onclick=\"javascript:tracks('" + playlist_name + "');\">Track Names</button>" +
                "<button class=\"btn btn-light\"  onclick=\"detailsTogether('" + playlist_name + "');\">Details Together</button></td></tr>";
        }
        text += "</table>"
        document.getElementById("showPlaylist").innerHTML = text;

    }
} catch (e) {

}

function tracks(playlist_name) {

    var text = "";
    var count = Object.keys(actual_JSON.playlists).length;
    var n;
    text += "<h4>Tracks of '" + playlist_name + "'</h4>";
    for (let i = 0; i < count; i++) {
        n = playlist_name.localeCompare(actual_JSON.playlists[i].name);
        if (n === 0) {
            var count_tracks = Object.keys(actual_JSON.playlists[i].tracks).length;
            for (let j = 0; j < count_tracks; j++) {
                track_name = actual_JSON.playlists[i].tracks[j].track_name;
                text += "<a class=\"btn btn-light\" style=\"margin:5px\" href=\" javascript:songDetail('" + j + "','" + playlist_name + "');\">" + track_name + "</a><br>";
            }
        }
    }
    document.getElementById("playlist_details").innerHTML = text;
}

function songDetail(track, playlist_name) {
    var text = "";
    text += "<table class='table table-hover'>" + "<tr><th>Track Position</th><th>Track Name</th><th>Artist Name</th><th>Album Name</th></tr>";
    var count = Object.keys(actual_JSON.playlists).length;
    var n;
    for (let i = 0; i < count; i++) {
        n = playlist_name.localeCompare(actual_JSON.playlists[i].name);
        if (n === 0) {
            text += "<tr><td>" + actual_JSON.playlists[i].tracks[track].pos + "</td>" +
                "<td>" + actual_JSON.playlists[i].tracks[track].track_name + "</td>" +
                "<td>" + actual_JSON.playlists[i].tracks[track].artist_name + "</td>" +
                "<td>" + actual_JSON.playlists[i].tracks[track].album_name + "</td>" + "</tr>";

        }
    }

    document.getElementById("showSong").innerHTML = text;
}

function detailsTogether(playlist_name) {
    var text = "";
    text += "<h5>" + playlist_name + "</h5>" + "<br>"
    text += "<table class='table table-hover'>" + "<tr><th>Track Position</th><th>Track Name</th><th>Artist Name</th><th>Album Name</th></tr>";
    var count = Object.keys(actual_JSON.playlists).length;
    var n;
    for (let i = 0; i < count; i++) {
        n = playlist_name.localeCompare(actual_JSON.playlists[i].name);
        if (n === 0) {
            var count_tracks = Object.keys(actual_JSON.playlists[i].tracks).length;
            for (let j = 0; j < count_tracks; j++) {
                text += "<tr><td>" + actual_JSON.playlists[i].tracks[j].pos + "</td>" +
                    "<td>" + actual_JSON.playlists[i].tracks[j].track_name + "</td>" +
                    "<td>" + actual_JSON.playlists[i].tracks[j].artist_name + "</td>" +
                    "<td>" + actual_JSON.playlists[i].tracks[j].album_name + "</td>" + "</tr>";
            }
        }
    }

    document.getElementById("playlist_details").innerHTML = text;
}

function btn1() {
    start("sample1.json");
}

function btn2() {
    start("sample2.json");
}

function btn3() {
    start("sample3.json");
}