import http from './httpService'
import config from '../config/config.json'

const moviesEndPoint = config.apiEndPoint+'movies'
export function getMovies(){
    return http.get(moviesEndPoint)
}

export function getMovie(id){
    return http.get(moviesEndPoint+"/"+id)
}

export function addMovie(movie){
    return http.post(moviesEndPoint,movie)
}
export function updateMovie(id,movie){
    return http.put(moviesEndPoint+"/"+id,movie)
}

export function deleteMovie(id){
    return http.delete(moviesEndPoint+"/"+id)
}
