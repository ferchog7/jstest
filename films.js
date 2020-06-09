'use strict';

var method = 'films'

function runAPI(cb) {
    fetch(url + method)
    .then(Response => Response.json())
    .then(data => {
        var result = data.results;
        var structure = [];
        result.forEach(movie => {
            structure.push({
                "title": movie['title'],
                "planets": getPlanetInfo(movie['planets'], (err, res) => { if(res && !err){ return res; }}),
                "characters": getCharactersInfo(movie['characters'], (err, res) => { if(res && !err){ return res; }}),
            });
        });
        return cb(null, structure);
    })
    .catch(err => cb(err, null));
}

function getPlanetInfo(planets, cb){
    var result = [];
    planets.forEach(urlPlanet => {
        fetch(urlPlanet)
        .then(Response => Response.json())
        .then(data => {
            result.push({
                'name': data['name'],
                'terrain': data['terrain'],
                'gravity': data['gravity'],
                'diameter': data['diameter'],
                'population': data['population']
            });
        })
        .catch(err => cb(err, null));
    });
    return cb(null, result);
}

function getCharactersInfo(characters, cb){
    var result = [];
    characters.forEach(urlCharacter => {
        fetch(urlCharacter)
        .then(Response => Response.json())
        .then(data => {
            result.push({
                'name': data['name'],
                'gender': data['gender'],
                'hair_color': data['hair_color'],
                'skin_color': data['skin_color']
            });
        })
        .catch(err => cb(err, null));
    });
    return cb(null, result);
}