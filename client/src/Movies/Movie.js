import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, decreaseCount }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${match.params.id}`);
  }

  const deleteMovie = () => {
    const id = match.params.id;
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(() => {
      decreaseCount();
      history.push('/');
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div onClick={deleteMovie}>Delete</div>
      <div onClick={saveMovie}>Save</div>
      <div onClick={editMovie}>Edit</div>
    </div>
  );
}

export default Movie;
