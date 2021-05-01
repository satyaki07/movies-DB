import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.Response === "False") {
      setError({ show: true, msg: data.Error });
      setIsLoading(false);
    } else {
      setMovie(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Year: year,
    Genre: genre,
    Director: director,
    Writer: writer,
    Actors: actors,
    Runtime: runtime
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title} <span>({year})</span></h2>
        <p>{runtime}</p>
        <p>{genre}</p>
        <p>{plot}</p>
        <div className="single-movie-crew">
          <p><span>Director</span>: {director}</p>
          <p><span>Writer</span>: {writer}</p>
          <p><span>Stars</span>: {actors}</p>
        </div>
        
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
