import React, { useState, useEffect } from "react";
import {
   fetchMovieDetail,
   fetchMovieVideos,
   fetchCasts,
   fetchSimilarMovie,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export function MovieDetail({ match }) {
   let params = match.params;
   let genres = [];
   const [isOpen, setIsOpen] = useState(false);
   const [detail, setDetail] = useState([]);
   const [video, setVideo] = useState([]);
   const [casts, setCasts] = useState([]);
   const [similarMovie, setSimilarMovie] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         setDetail(await fetchMovieDetail(params.id));
         setVideo(await fetchMovieVideos(params.id));
         setCasts(await fetchCasts(params.id));
         setSimilarMovie(await fetchSimilarMovie(params.id));
      };

      fetchAPI();
   }, [params.id]);

   genres = detail.genres;

   const MoviePalyerModal = (props) => {
      const youtubeUrl = "https://www.youtube.com/watch?v=";
      return (
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton>
               <Modal.Title
                  id="contained-modal-title-vcenter"
                  style={{ color: "#000000", fontWeight: "bolder" }}
               >
                  {detail.title}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#000000" }}>
               <ReactPlayer
                  className="container-fluid"
                  url={youtubeUrl + video.key}
                  playing
                  width="100%"
               ></ReactPlayer>
            </Modal.Body>
         </Modal>
      );
   };

   let genresList;
   if (genres) {
      genresList = genres.map((g, i) => {
         return (
            <li className="list-inline-item" key={i}>
               <button type="button" className="btn btn-outline-info">
                  {g.name}
               </button>
            </li>
         );
      });
   }

   const castList = casts.slice(0, 4).map((c, i) => {
      return (
         <div className="col-md-3 text-center" key={i}>
            <img
               className="img-fluid rounded-circle mx-auto d-block"
               src={c.img}
               alt={c.name}
            ></img>
            <p className="font-weight-bold text-center">{c.name}</p>
            <p
               className="font-weight-light text-center"
               style={{ color: "#5a606b" }}
            >
               {c.character}
            </p>
         </div>
      );
   });

   const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
      return (
         <div className="col-md-3 col-sm-6" key={index}>
            <div className="card">
               <Link to={`/movie/${item.id}`} target="_blank">
                  <img className="img-fluid" src={item.poster} alt={item.title}></img>
               </Link>
            </div>
            <div className="mt-3">
               <p style={{ fontWeight: "bolder" }}>{item.title}</p>
               <p>Rated: {item.rating}</p>
               <ReactStars
                  count={item.rating}
                  size={20}
                  color={"#f4c10f"}
               ></ReactStars>
            </div>
         </div>
      );
   });

   return (
      <div className="container">
         <div className="row mt-2">
            <MoviePalyerModal
               show={isOpen}
               onHide={() => {
                  setIsOpen(false);
               }}
            ></MoviePalyerModal>
            <div className="col text-center" style={{ width: "100%" }}>
               <img
                  className="img-fluid"
                  src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                  alt={detail.title}
               ></img>
               <div className="carousel-center">
                  <i
                     onClick={() => setIsOpen(true)}
                     className="far fa-play-circle"
                     style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
                  ></i>
               </div>
               <div
                  className="carousel-caption"
                  style={{ textAlign: "center", fontSize: 35 }}
               >
                  {detail.title}
               </div>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Жанри</p>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col">
               <ul className="list-inline">{genresList}</ul>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col">
               <div className="text-center">
                  <ReactStars
                     count={detail.vote_average}
                     size={20}
                     color1={"#f4c10f"}
                  ></ReactStars>
               </div>
               <div className="mt-3">
                  <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Опис сюжету</p>
                  {detail.overview}
               </div>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col-md-3">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Дата виходу</p>
               <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
            </div>
            <div className="col-md-3">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Тривалість</p>
               <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
            </div>
            <div className="col-md-3">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Бюджет</p>
               <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
            </div>
            <div className="col-md-3">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Головна сторінка</p>
               <a href={detail.homepage} target='_blank' className="link"> <p style={{ color: "#f4c10f" }}>{detail.homepage}</p></a>
            </div>
         </div>

         <div className="row mt-3">
            <div className="col">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Каст головних акторів</p>
            </div>
         </div>
         <div className="row mt-3">{castList}</div>

         <div className="row mt-3">
            <div className="col">
               <p style={{ color: "#5a606b", fontWeight: "bolder", textTransform: "uppercase" }}>Схожі фільми</p>
            </div>
         </div>

         <div className="row mt-3">{similarMovieList}</div>

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
                        <i className="fas fa-phone"></i> <span className="contacts">Телефон:</span> {" +380 66 789 55 10"}
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
