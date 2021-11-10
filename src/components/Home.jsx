import React, { useEffect, useState } from 'react'
import {
   fetchMovies,
   fetchGenre,
   fetchMovieByGenre,
   fetchPersons,
   fetchTopratedMovie,
} from "../service";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReactStars from "react-rating-stars-component";

import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

export const Home = () => {

   const [nowPlaying, setNowPlaying] = useState([]);
   const [genres, setGenres] = useState([]);
   const [moviebyGenre, setMovieByGenre] = useState([]);
   const [persons, setPersons] = useState([]);
   const [topRated, setTopRated] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         setNowPlaying(await fetchMovies());
         setGenres(await fetchGenre());
         setMovieByGenre(await fetchMovieByGenre(28));
         setPersons(await fetchPersons());
         setTopRated(await fetchTopratedMovie());
      };

      fetchAPI();
   }, []);

   const handleGenreClick = async (genre_id) => {
      setMovieByGenre(await fetchMovieByGenre(genre_id));
   }
   const movies = nowPlaying.slice(0, 5).map((item, index) => {
      return (
         <div style={{ height: 450, width: "100%" }} key={index}>
            <div className="carousel-center" >
               <img style={{ height: 400, maxWidth: "100%", marginBottom: 25 }} src={item.backPoster} alt={item.title} />
            </div>

            <div className="carousel-caption"
               style={{ textAlign: 'center', fontSize: 28, maxWidth: 500, margin: "0 auto", paddingBottom: 30 }}>
               {item.title}
            </div>
         </div>
      );
   });

   const genreList = genres.map((item, index) => {
      return (
         <li className="list-inline-item" key={index}>
            <button type="button" className="btn btn-outline-info" onClick={() => {
               handleGenreClick(item.id)
            }}>
               {item.name}
            </button>
         </li>
      );
   })

   const movieList = moviebyGenre.slice(0, 16).map((item, index) => {

      return (
         <div className="col-md-3 col-sm-6" key={index}>
            <div className="card">
               <Link to={`movie/${item.id}`}>
                  <img src={item.poster} alt={item.title} className="img-fluid" />
               </Link>
            </div>
            <div className="mt-3">
               <div className="block" style={{ marginBottom: 20 }}>
                  <p style={{ fontWeight: 'bolder' }}>{item.title}</p>
                  <p style={{ color: '#747b88', marginTop: -5, marginBottom: -5 }}>Рейтинг: {item.rating}</p>
                  <ReactStars count={item.rating} size={20} color={'#f4c10f'}></ReactStars>
               </div>
            </div>
         </div>
      );
   });

   const trendingPersons = persons.slice(0, 4).map((p, i) => {
      return (
         <div className="col-md-3 text-center" key={i}>
            <img
               className="img-fluid rounded-circle mx-auto d-block"
               src={p.profileImg}
               alt={p.name}
            ></img>
            <p className="font-weight-bold text-center">{p.name}</p>
            <p
               className="font-weight-light text-center"
               style={{ color: "#5a606b" }}
            >
               Популярні для {p.known}
            </p>
         </div>
      );
   });

   const topRatedList = topRated.slice(0, 4).map((item, index) => {
      return (
         <div className="col-md-3" key={index}>
            <div className="card">
               <Link to={`/movie/${item.id}`}>
                  <img src={item.poster} alt={item.title} className="img-fluid" />
               </Link>
            </div>
            <div className="mt-3">
               <div className="block" style={{ marginBottom: 20 }}>
                  <p style={{ fontWeight: 'bolder' }}>{item.title}</p>
                  <p style={{ color: '#747b88', marginTop: -5, marginBottom: -5 }}>Рейтинг: {item.rating}</p>
                  <ReactStars count={item.rating} size={20} color={'#f4c10f'}></ReactStars>
               </div>
            </div>
         </div>
      );
   });
   return (
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 10px" }}>

         <div className="row mt-2">
            <div className="col">
               <Carousel
                  autoPlay={true}
                  pauseOnVisibility={true}
                  interval={3000}
                  version={4}
                  indicators={false}
               >
                  {movies}
               </Carousel>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col">
               <ul className="list-inline" style={{ marginTop: -60 }}>
                  {genreList}
               </ul>
            </div>
         </div>

         <div className="row mt-3">{movieList}</div>

         <div className="row mt-3">
            <div className="col">
               <p className="font-weight-bold" style={{ color: '#5a606b', textTransform: "uppercase", fontSize: 22 }}>
                  Популярні особи цього тижня
               </p>
            </div>
         </div>

         <div className="row mt-3">{trendingPersons}</div>

         <div className="row mt-3">
            <div className="col">
               <p className="font-weight-bold" style={{ color: "#5a606b", textTransform: "uppercase", fontSize: 22 }}>
                  Фільми з найвищим рейтингом
               </p>
            </div>
         </div>

         {/*<div className="row mt-3">
            <div className="col">
               <div className="float-right">
                  <i className="far fa-arrow-alt-circle-right"></i>
               </div>
            </div>
         </div>*/}

         <div className="row mt-3">{topRatedList}</div>

         <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

         <div className="row mt-3 mb-5">
            <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
               <h3 style={{ textTransform: "uppercase" }}>Про нас</h3>
               <p>
                  На <span style={{ fontWeight: 500, fontSize: 18, color: "#f4c10f" }}> Moviecraft </span> ви можете не тільки знайти собі підходящий фільм в любому жанрі,
                  а і подивитись список самих рейтингових фільмів, найцікавіші новинки у сфері кіно,
                  а також дізнатись які актори, режисери та інші персони популярні на цьому тижні.
                  На сторінці кожного фільма ви знайдете оцінку критиків і звичайник глядачів, короткий опис сюжету,
                  акторський склад, жанр, постер і схожі фільми на вами вибраний.
               </p>
               <p>
                  Єдине, що вам треба зробити - це відпочивати і насолоджуватись. Найкращі трейлери і фільми саме на цій сторінці.
                  Всі питання та пропозиції можете надсилати нам за контактами правіше.
               </p>

            </div>
            <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
               <h3 style={{ textTransform: "uppercase" }}>Підтримуй зв’язок</h3>
               <ul className="list-unstyled">
                  <li>
                     <p>
                        <i className="fas fa-map-marker-alt"></i> <span className="contacts">Адреса:</span> {"Україна, Чернівці | Київ "}
                     </p>
                  </li>
                  <li>
                     <p>
                        <i className="fas fa-phone"></i> <span className="contacts">Телефон:</span> {" +380 66 789 55 11"}
                     </p>
                  </li>
                  <li>
                     <p>
                        <i className="fas fa-envelope"></i> <span className="contacts">Email:</span> <a href="mailto:moviecraft@gmail.com" style={{ textDecoration: "none", color: "#f4c10f" }}>{"moviecraft@gmail.com "}</a>
                     </p>
                  </li>

                  <li className="social">
                     <a href="https://www.instagram.com/?hl=ru" target="_blank"><i className="fab fa-instagram icons"></i></a>
                     <a href=""><i className="fab fa-twitter icons" target="_blank"></i></a>
                     <a href=""><i className="fab fa-linkedin icons" target="_blank"></i></a>
                     <a href=""><i className="fab fa-facebook-square icons" target="_blank"></i></a>
                  </li>
               </ul>
            </div>
         </div>
      </div>

   );
}
