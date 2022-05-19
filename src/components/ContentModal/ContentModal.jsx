import React, { useEffect, useState } from 'react'
import "./ContentModal.css"
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "../Carousel/Carousel";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";



export default function ContentModal({children, media_type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movies, setMovies] = useState([]);
  const [video, setVideo] = useState();
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setMovies(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <div className='media' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {movies && (
            
              <div className="ContentModal">
                <img
                  src={
                    movies.poster_path
                      ? `${img_500}/${movies.poster_path}`
                      : unavailable
                  }
                  alt={movies.name || movies.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    movies.backdrop_path
                      ? `${img_500}/${movies.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={movies.name || movies.title}
                 className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {movies.name || movies.title} (
                    {(
                      movies.first_air_date ||
                      movies.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {movies.tagline && (
                    <i className="tagline">{movies.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {movies.overview}
                  </span>

                  <div className='carousel'>
                    <Carousel id={id} media_type={media_type} />
                  </div> 

                   <Button
                   
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    size='small'
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  
                </div>
              </div>
            
          )}
        </Fade>
      </Modal>
    </>
  );
} 



//  import React, { useEffect, useState } from 'react'
//  import Backdrop from '@mui/material/Backdrop';
//  import "./ContentModal.css"
//  import Box from '@mui/material/Box';
//  import Modal from '@mui/material/Modal';
//  import Fade from '@mui/material/Fade';
//  import Button from '@mui/material/Button';
//  import Typography from '@mui/material/Typography';
// import axios from 'axios';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import Carousel from "../Carousel/Carousel";
// import {
//   img_500,
//   unavailable,
//   unavailableLandscape,
// } from "../../config/config";

// const style = {
//     display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "90%",
//       height: "80%",
//       backgroundColor: "#39445a",
//       border: "1px solid #282c34",
//       borderRadius: 10,
//       color: "white",
      
//   };

// export default function ContentModal({children, media_type, id}) {
  
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [open, setOpen] = useState(false);

//   const [movies, setMovies] = useState([]);
//   const [video, setVideo] = useState();
//   const fetchData = async () => {
//     const { data } = await axios.get(
//       `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
//     );

//     setMovies(data);
//      console.log(data);
//   };
//   const fetchVideo = async () => {
//         const { data } = await axios.get(
//           `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
//         );
    
//         setVideo(data.results[0]?.key);
//       };
    
//       useEffect(() => {
//         fetchData();
//         fetchVideo();
//         // eslint-disable-next-line
//       }, []);

//   return (
//     <div>
      
// /      <div className='media' onClick={handleOpen}>{children}</div>
     
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
      
//         closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                   timeout: 500,
//                 }}
//       >
        
//          <Box sx={style} in={open}>
       
//         {movies && (
//             <div >
//               <div className="ContentModal">
//                 <img
//                   src={
//                     movies.poster_path
//                       ? `${img_500}/${movies.poster_path}`
//                       : unavailable
//                   }
//                   alt={movies.name || movies.title}
//                   className="ContentModal__portrait"
//                 />
//                 <img
//                   src={
//                     movies.backdrop_path
//                       ? `${img_500}/${movies.backdrop_path}`
//                       : unavailableLandscape
//                   }
//                   alt={movies.name || movies.title}
//                  className="ContentModal__landscape"
//                 />
//                 <div className="ContentModal__about">
//                   <span className="ContentModal__title">
//                     {movies.name || movies.title} (
//                     {(
//                       movies.first_air_date ||
//                       movies.release_date ||
//                       "-----"
//                     ).substring(0, 4)}
//                     )
//                   </span>
//                   {movies.tagline && (
//                     <i className="tagline">{movies.tagline}</i>
//                   )}

//                   <span className="ContentModal__description">
//                     {movies.overview}
//                   </span>

//                   <div>
//                     <Carousel id={id} media_type={media_type} />
//                   </div> 

//                    <Button
//                     variant="contained"
//                     startIcon={<YouTubeIcon />}
//                     color="secondary"
//                     target="__blank"
//                     href={`https://www.youtube.com/watch?v=${video}`}
//                   >
//                     Watch the Trailer
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
          
//         </Box>
       
//       </Modal>
//     </div>
//   );
// }






