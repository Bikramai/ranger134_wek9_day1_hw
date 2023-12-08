import * as _React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useGetOrder } from '../../customHooks';
import { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Snackbar } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';


// Internal imports
import { serverCalls } from '../../api';
import { InputText } from '../sharedComponents'; 
import { theme } from '../../Theme/themes';
import { ShopProps } from '../../customHooks';
import { SubmitProps } from '../Shop';
import { MessageType } from '../Auth';

// we want our columns to match our data object (name, description, price, quantity,....)

const columns: GridColDef[] = [
    { field: 'image', //thats what needs to match the keys on our objects/dictionaries
    headerName: 'Image', //this is whats being displayed as the column header
    width: 150,
     renderCell: (param) => ( //we are rendering html thats why we have () not {}
          <img 
              src={param.row.image} //param is whole list, row is object in that list, image is key on that object
              alt={param.row.name}
              style = {{ maxHeight: '100%', aspectRatio: '1/1'}} //making this a square no matter what size our image is 
          ></img>
     ) 
  },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 110,
      editable: true,
    },
    {
      field: 'prod_id',
      headerName: 'Product Id',
      width: 110,
      editable: true,
    },
    {
      field: 'id',
      headerName: 'Order ID',
      width: 110,
      editable: true,
    },
    
  ];
  
  // fake data but what OUR order data should look like (a list of objects/dictionaries)
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  

interface UpdateProps {
    id: string,
    orderData: ShopProps[]
}


const UpdateQuantity = (props: UpdateProps) => {
    // setting up our hooks
    const [ openAlert, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const { register, handleSubmit } = useForm<SubmitProps>({})

    // using the useEffect so we don't go into an infinite loop with an undefined id, only checks once and gives us an error
    useEffect(() => {
        if (props.id === 'undefined'){
            setMessage('No Order Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()  => window.location.reload(), 2000)
        }
    }, [])

    const onSubmit: SubmitHandler<SubmitProps> = async (data: SubmitProps, event: any) => {
        if (event) event.preventDefault();

        let orderId = ""
        let prodId = ""

        for (let order of props.orderData) {
            if (order.id === props.id) {
                orderId = order.order_id as string
                prodId = order.prod_id as string 
            }
        }

        // props is coming from Order component
        // data is coming from our form inside THIS component 

        // what we will be passing to Flask 
        const updateData = {
            "prod_id" : prodId,
            "quantity" : parseInt(data.quantity) as number 
        }

        const response = await serverCalls.updateData(orderId, updateData)
        if (response.status === 200){
            setMessage('Successfully updated item in your Order')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>{window.location.reload()}, 2000)
        }
    }


    return(
        <Box sx={{padding: '20px'}}>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Box>
                    <label htmlFor="quantity">What is the updated quantity?</label>
                    <InputText {...register('quantity')} name='quantity' placeholder='Quantity Here' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open={openAlert}
                // autoHideDuration={3000}
                onClose={()=> setOpen(false)}
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )




}

export const Order = () => {
    const { orderData } = useGetOrder(); 
    const [ gridData, setGridData ] = useState<GridRowSelectionModel>([])
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ openDialog, setDialogOpen ] = useState(false); // this hook will open up our Update Quantity Dialog Box

    // function to delete item from order (we changed our mind)
    const deleteItem = async () => {

        const id = `${gridData[0]}`



       
        let order_id = ""
        let prod_id = ""

        // if we click delete without selecting anything we want to display error message to user
        if (id === 'undefined'){
            setMessage('No Order Selected')
            setMessageType('error')
            setOpen(true)
            setTimeout(()=> window.location.reload(), 2000)
        }


        // looping through list of order objects until we find the object with our id 
        
        for (let order of orderData){
            if (order.id === id){
                order_id = order.order_id as string
                prod_id = order.prod_id as string
            }
        }

        // make a little dictionary to pass to our api call needs to match format of what flask is expecting

        const deleteData = {
            'prod_id': prod_id
        }

        const response = await serverCalls.deleteOrder(order_id, deleteData)

        if (response.status === 200) {
            setMessage('Successfully deleted item from order')
            setMessageType('success')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        } else {
            setMessage(response.message)
            setMessageType('error')
            setOpen(true)
            setTimeout(()=>window.location.reload(), 2000)
        }


    }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orderData}
        columns={columns}
        sx={{ color: 'white', borderColor: theme.palette.primary.main, backGroundColor: theme.palette.secondary.light }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.id}
        onRowSelectionModelChange = {(newSelectionModel) => setGridData(newSelectionModel)}
      />
      <Button variant='contained' color='info' onClick={()=> setDialogOpen(true)}>Update</Button>
      <Button variant='contained' color='warning' onClick={deleteItem}>Delete</Button>
      <Dialog open={openDialog} onClose={()=> setDialogOpen(false)}>
        <DialogContent>
            <DialogContentText>Order id: {gridData[0]}</DialogContentText>
        </DialogContent>
        <UpdateQuantity id={`${gridData[0]}`} orderData = {orderData} />
        <DialogActions>
            <Button onClick = { ()=> setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={()=> setOpen(false)}
        >
            <Alert severity = {messageType}>
                {message}
            </Alert>
        </Snackbar>
    </Box>
  );
}