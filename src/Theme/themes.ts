import { createTheme } from'@mui/material'; 



export const theme = createTheme({ //in function taking as an dict key value pair
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#42a5f5'
        },
        secondary: {
            main: '#242625',
            light: '#388e3c'
        },
        info: {
            main: '#42a5f5'
        }
    }
})
