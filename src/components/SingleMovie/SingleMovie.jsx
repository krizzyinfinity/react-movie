import { Badge } from '@mui/material'
import  Grid  from '@mui/material/Grid'
import React from 'react'
import { img_300, unavailable } from '../../config/config'
import ContentModal from '../ContentModal/ContentModal'
import "./SingleMovie.css"
const SingleMovie = ({id, poster, title, date, media_type, average}) => {
  return (
      
   
      <ContentModal media_type={media_type} id={id}>
        <Badge  badgeContent={average} color={average > 6 ? "primary" 
        : "secondary"}/>
        <img className='poster'  src={ poster ? `${img_300}/${poster}` : unavailable } alt={title}/>
        
  
   <p className='myP'>{title}</p>
   <div className='subTitle'>
       {
           media_type === "tv" ? "Series" : "Movie"
       
       }
       <div>
       {date}
       </div>
   </div>
   
    </ContentModal>
    
  )
}

export default SingleMovie