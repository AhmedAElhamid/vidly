import React from 'react';

const Like = ({movie,onLiked}) => {
    if (movie.isLiked) {
        return <i onClick={() => onLiked(movie)} className="clickable fa fa-heart"
                  aria-hidden="true"/>
    }
    return <i onClick={() => onLiked(movie)} className="clickable fa fa-heart-o"
              aria-hidden="true"/>
}

export default Like;