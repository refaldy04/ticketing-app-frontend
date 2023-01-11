import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Formik, Field } from 'formik'
import { createTicketType, getTicketType } from '../redux/asyncAction/ticket'
import { useDispatch, useSelector } from 'react-redux'

function InsertNewTicketType(props) {
  const dispatch = useDispatch()

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Insert New Ticket Type</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{ typeName: '', selectType: 'one-day', date: null, dateStart: null, dateEnd: null, timeStart: null, timeEnd: null }}>
        {({ values, handleChange }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              if (values.dateStart) {
                let dayStart = new Date(values.dateStart)
                let dayEnd = new Date(values.dateEnd)
                let month1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][dayStart.getMonth()]
                let month2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][dayEnd.getMonth()]
                let str = dayStart.getDate() + ' ' + month1 + ' ' + dayStart.getFullYear() + ' - ' + dayEnd.getDate() + ' ' + month2 + ' ' + dayEnd.getFullYear()
                values.date = str
              } else {
                let mydate = new Date(values.date)
                let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()]
                let str = mydate.getDate() + ' ' + month + ' ' + mydate.getFullYear()
                values.date = str
              }

              let data = { name: values.typeName, dateTime: `${values.date} ${values.timeStart} - ${values.timeEnd}` }

              dispatch(createTicketType({ data, cb: () => dispatch(getTicketType()) }))
            }}
          >
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name Ticket Type</Form.Label>
                <Form.Control type="text" name="typeName" onChange={handleChange} />
              </Form.Group>
              <hr />
              <Form.Group>
                <Form.Check as={Field} type={'radio'} id={`default-radio`} label={`One Day`} name="selectType" value={'one-day'} inline />
                <Form.Check as={Field} type={'radio'} id={`multi-day-radio`} label={`Multi Day`} name="selectType" value={'multi-day'} inline />
              </Form.Group>
              <hr />
              {values.selectType === 'one-day' ? (
                <Form.Group className="my-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="date" onChange={handleChange} required />
                </Form.Group>
              ) : (
                <div className="d-flex justify-content-between align-items-end gap-4">
                  <Form.Group className="my-3">
                    <Form.Label>Day Start</Form.Label>
                    <Form.Control type="date" name="dateStart" onChange={handleChange} />
                  </Form.Group>
                  <p className="pb-3">---</p>
                  <Form.Group className="my-3">
                    <Form.Label>Day End</Form.Label>
                    <Form.Control type="date" name="dateEnd" onChange={handleChange} />
                  </Form.Group>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-end gap-4">
                <Form.Group className="my-3">
                  <Form.Label>Time Start</Form.Label>
                  <Form.Control type="time" name="timeStart" onChange={handleChange} />
                </Form.Group>
                <p className="pb-3">---</p>
                <Form.Group className="my-3">
                  <Form.Label>Time End</Form.Label>
                  <Form.Control type="time" name="timeEnd" onChange={handleChange} />
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide} variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default InsertNewTicketType
