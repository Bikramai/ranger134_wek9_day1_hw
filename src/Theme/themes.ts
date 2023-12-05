import { createTheme } from'@mui/material'; 



export const theme = createTheme({ //in function taking as an dict key value pair
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#00794E'
        },
        secondary: {
            main: '#242625',
            light: '#1B2929'
        },
        info: {
            main: '#44469D'
        }
    }
})
