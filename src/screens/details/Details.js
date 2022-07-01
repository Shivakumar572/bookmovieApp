import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import { makeStyles } from "@material-ui/styles";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-ui/core";
import YouTube from "react-youtube";

import Rating from "@material-ui/lab/Rating";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Details.css";
import { Fragment } from "react";
import  movieData from './../Data/movieData.json';

const  Details= ()=> {
  let { id } = useParams();
   let [movieidData, setMovieidData] = useState({});
  let [genres, setGenres] = useState([]);
  let [youtubeUrl, setYouttubeUrl] = useState("");
  let [actors, setActors] = useState([]);
  let [rating, setRating] = useState(false);

  function findId(movieData, id) {
    var categoryArray = movieData.movies;
    for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].id == id) {
            return(categoryArray[i]);
        }
    }
}

  useEffect(() => {
    // axios
    //   .get(`http://localhost:8085/api/v1/movies/${id}`)
    //   .then((response) => {
    //     setMovieData(response.data);
    //     setGenres(response.data.genres);
    //     setYouttubeUrl(response.data.trailer_url);
    //     setActors(response.data.artists);
    //   })
    //   .catch((error) => {
    //     if (error.response && error.response.status === 404) {
    //       console.clear();
    //     }
    //   });
    setMovieidData(findId(movieData,id));
    console.log("movieData is " +movieidData);
    setGenres(movieidData.genres);
    setYouttubeUrl(movieidData.youtubeUrl);
    setActors(movieidData.actors);
  }, []);

  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
      width: 300,
      height: 350,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  });

  //var releaseDate = new Date(movieData.release_date).toDateString();
  var releaseDate = movieidData.year;

 // let youtubeId = youtubeUrl.split("=")[1];

  let opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      origin: "http://localhost:3000",
    },
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Header bookShow={true}  />
      <div className="details-content">
        <Typography style={{ margin: "10px" }}>
          <Link to="/" className="back-link">
            <span className="back-to-home">&#60; Back to Home</span>
          </Link>
        </Typography>
        <div className="main-content">
          {/* First Section */}
          <div className="first-container">
            <img src={movieidData.posterUrl} alt={movieidData.title} />
          </div>
          {/* Second Section */}
          <div className="mid-container">
            <Typography variant="h2" component="h2">
              {movieidData.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <b>Genre: </b>
              {/* {genres.map((genre) => `${genre}, `)} */}
              {movieidData.genres}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <b>Duration: </b>
              {movieidData.runtime}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <b>Release Date: </b>
              {releaseDate}
            </Typography>
            {/* <Typography variant="subtitle1" gutterBottom>
              <b>Rating: </b>
              {movieData.rating}
            </Typography> */}
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginTop: "16px" }}
            >
              <b>
                Plot:{" "}
                <a href={movieidData.plot} target="_blank">
                  (Wiki Link)
                </a>
              </b>
              {" " + movieidData.plot}
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginTop: "16px" }}
            >
              <b>Trailer:</b>
              <YouTube
                videoId={youtubeUrl}
                opts={opts}
                onReady={(event) => {
                  event.target.pauseVideo();
                }}
              />
            </Typography>
          </div>
          {/* Third section */}
          <div className="last-container">
          <Typography variant="h6" component="h6">
               Rate this movie:<br/>
                {
                <Rating className="mt-1" name="read-only" value={rating}  onChange={(e)=>setRating(e.target.value)}/>
                } 
          </Typography>
          <Typography>
              <div className="artist-heading">
                <b>Artists: </b>
              </div>
              <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                  {actors ? (
                    actors.map((actor) => (
                      <GridListTile key={actor.id}>
                        <img src={actor.profile_url} alt={actor.first_name} />
                        <GridListTileBar
                          title={actor.first_name + " " + actor.last_name}
                        />
                      </GridListTile>
                    ))
                  ) : (
                    <h6>No actor data available</h6>
                  )}
                </GridList>
              </div>
            </Typography>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Details;

