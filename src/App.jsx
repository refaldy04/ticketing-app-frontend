import { useState, useEffect } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InsertNewTicketType from './components/ModalNewTicketType'
import { getTicketType, deleteTicket } from './redux/asyncAction/ticket'
import { useDispatch, useSelector } from 'react-redux'
import CustomerTicketDataModal from './components/ModalNewCustomerData'

function App() {
  const [modalTicketShow, setModalTicketShow] = useState(false)
  const [modalCustomerShow, setModalCustomerShow] = useState(false)

  const dispatch = useDispatch()

  const ticketType = useSelector((state) => state.ticket.data)

  useEffect(() => {
    dispatch(getTicketType())
  }, [])

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">Ticketing App</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-between align-items-center px-3 w-75 mx-auto">
        <p className="fs-4 fw-bold">Available Tickets</p>
        <Button variant="success" onClick={() => setModalTicketShow(true)}>
          Insert New Ticket Type
        </Button>{' '}
      </div>
      <InsertNewTicketType show={modalTicketShow} onHide={() => setModalTicketShow(false)} />
      <Table striped bordered hover variant="dark" className="w-75 mx-auto mb-5">
        <tbody>
          {ticketType ? (
            ticketType?.map((val) => (
              <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.date_time}</td>
                <td className="text-center">
                  <Button variant="danger" onClick={(e) => dispatch(deleteTicket({ id: val.id, cb: () => dispatch(getTicketType()) }))}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>data not found</tr>
          )}
        </tbody>
      </Table>

      {/* <div className="d-flex justify-content-between align-items-center px-3 ">
        <p className="fs-4 fw-bold">Customer Ticket Data</p>
        <Button variant="success" onClick={() => setModalCustomerShow(true)}>
          Insert Customer Data
        </Button>
      </div>
      <CustomerTicketDataModal show={modalCustomerShow} onHide={() => setModalCustomerShow(false)} />
      <Table striped="columns" className="">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Package Event</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  )
}

export default App
