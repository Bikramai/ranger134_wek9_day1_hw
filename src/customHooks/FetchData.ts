import * as _React from 'react';
import { useState, useEffect } from 'react'; 


// internal imports
import { serverCalls } from '../api'; 


// WE are creating a custom hook to make API calls every time we go to the Shop page. 

// cerating our interface of our shop data & return of our hook

export interface ShopProps {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string, 
    prod_id: string,
    quantity: number, 
    order_id?: string
}

interface GetShopDataProps {
    shopData: ShopProps[]
    getData: () => void
}


// create our custom hook that get's called automatically when we go to our Shop page
export const useGetShop = (): GetShopDataProps => {
    // setup some hooks
    const [ shopData, setShopData ] = useState<ShopProps[]>([])


    const handleDataFetch = async () => {
        const result = await serverCalls.getShop() //making the api call from our serverCall dictionary/object

        setShopData(result)
    }

    // useEffect is essentially an event listener listening for changes to variables 
    // takes 2 arguments, 1 is the function to run, the 2nd is the variable we are watching in a []
    useEffect(()=> {
        handleDataFetch()
    }, []) //[] inside list is variable we are watching/listening to for changes 

    return { shopData, getData: handleDataFetch }
    
}