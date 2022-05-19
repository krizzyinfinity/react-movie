import { SecurityUpdateGoodSharp } from '@mui/icons-material'
import { createTheme, Pagination, ThemeProvider } from '@mui/material'
import React from 'react'
import "./CustomPagination.css"

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
const CustomPagination = ({setPage, numOfPages = 10}) => {

    const handlePage = (page) => {
        setPage(page);
        window.scroll(0,0);
    };
  return (
    <div style={{
        width: "100%",
        paddingBottom: 70,
        paddingTop: 5,
        display: "flex",
        justifyContent: "center"
    }}>
        <ThemeProvider theme={darkTheme}>
        <Pagination onChange={(e)=>handlePage(e.target.textContent)}
        count={numOfPages} 
        color="primary"
        hidePrevButton
         hideNextButton/>
        </ThemeProvider>
    </div>
  )
}

export default CustomPagination