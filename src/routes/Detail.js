import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h2>{movies.data.movie.title}</h2>
          <img src={movies.data.movie.large_cover_image}></img>
          <p>{movies.data.movie.description_full}</p>
          <ul>
            {movies.data.movie.genres &&
              movies.data.movie.genres.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
