import { createAsyncThunk } from '@reduxjs/toolkit'
import qs from 'qs'
import http from '../../helpers/http'
import axios from 'axios'

export const getTicketType = createAsyncThunk('ticket/getData', async () => {
  const result = {}
  try {
    const { data } = await axios.get('https://ticketing-app-two.vercel.app/getAllTicketType')
    result.data = data.result
    return result
  } catch (e) {
    result.errorMsg = e.response.data.message
    return result
  }
})

export const createTicketType = createAsyncThunk('ticket/createTicketType', async (request) => {
  const result = {}
  try {
    const send = qs.stringify(request.data)
    console.log(send)
    const { data } = await http().post('/ticketType', send)
    result.data = data.data
    request.cb()
    return result
  } catch (e) {
    result.errorMsg = e.response.data.message
    return result
  }
})

export const deleteTicket = createAsyncThunk('ticket/deleteTicket', async (request) => {
  const result = {}
  try {
    await http().delete('/deleteTicket/' + request.id)
    request.cb()
  } catch (e) {
    result.errorMsg = e.response.data.message
    return result
  }
})

// export const getProduct = createAsyncThunk('product/getDataById', async (request) => {
//   const result = {}
//   try {
//     const { data } = await http(request.token).get('/product/show?product_id=' + request.id)
//     request.cb()
//     result.data = data.data
//     return result
//   } catch (e) {
//     result.errorMsg = e.response.data.message
//     return result
//   }
// })

// export const editProduct = createAsyncThunk('product/createProduct', async (request) => {
//   const result = {}
//   try {
//     const send = qs.stringify(request.data)
//     const { data } = await http(request.token).post('/product/update', send)
//     request.cb()
//     result.data = data.data
//     return result
//   } catch (e) {
//     result.errorMsg = e.response.data.message
//     return result
//   }
// })
