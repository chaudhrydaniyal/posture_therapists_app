import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'; import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import './index.css'
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));
export default class AppointmentSchedule extends React.Component {


  state = {

    weekendsVisible: true,
    currentEvents: [],
    INITIAL_EVENTS: [],
    show: false,
    doctors: [],
    selectedDoctor: null,
    appointmentTitle: '',
    appointmentStartTime: '',
    appointmentEndTime: '',
    appointmentDate: '',
    patients:[],
    selectedPatient: ''


  }


  async componentDidMount() {

    let events = await (await axios.get('/api/doctortimeslots/')).data

    let scheduledAppointments = await (await axios.get('/api/scheduledappointments/')).data



    console.log("time of app",events[0].start_time)


    let array1 = events.map((e) => ({ start: new Date(e.start_time), end: new Date(e.end_time), title: e.first_name, color: "green", id: e.id }))

    let array2 = scheduledAppointments.map((e) => ({ start: e.start_time, end: e.end_time, title: e.patient, color: "purple", id: e.id }))

    this.setState({ INITIAL_EVENTS:  array1.concat(array2)})



    let doctors = await (await axios.get('/api/users/')).data

    this.setState({ doctors: doctors })



    let patients = await (await axios.get('/api/patients')).data

    this.setState({ patients: patients })



  }



  handleOpen = () => {
    this.setState({ show: true });
  }


  handleClose = () => {
    this.setState({ show: false });
  }


  calendarRef = React.createRef()

  render() {



    return (

      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Appointment Scheduling' }]} />
        </Box>

        <div className='card'>
          <div className='card-body'>
            <div className='demo-app'>
              <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>

                <button style={{ borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} onClick={async () => {
                  console.log("iddddd", this.props)
                  await axios.post('api/scheduledappointments',
                    this.state.currentEvents.filter((f) => f._def.extendedProps.scheduledAppointment).map(ce => ({
                      start_time: ce._instance.range.start, end_time: ce._instance.range.end, doctor: ce._def.extendedProps.doctor,
                      patient: ce._def.extendedProps.patient, title: ce._def.title, date: "2023-03-01T00:00:00.000Z"
                    }))
                  )

                }}
                >Update</button>
              </div>
              {/* {this.renderSidebar()} */}
              <div className='demo-app-main'>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  timeZone= 'America/New_York'
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}

                  ref={this.calendarRef}

                  initialView='timeGridWeek'
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={this.state.weekendsVisible}
                  events={this.state.INITIAL_EVENTS}
                  // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                  select={this.handleDateSelect}
                  eventContent={renderEventContent} // custom render function
                  eventClick={this.handleEventClick}
                  eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                  /* you can update a remote database when these fire:
                  eventAdd={function(){}}
                  eventChange={function(){}}
                  eventRemove={function(){}}
                  */
                  eventColor="purple"
                />
              </div>
            </div>


          </div>
        </div>


        <Modal show={this.state.show} onHide={this.handleClose} style={{ marginTop: "30vh" }}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div style={{ padding: "30px" }}>
              <br /><br />


              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label>Select the patient:</label>

                &nbsp; &nbsp; &nbsp;



                <select name="patients" id="patients" onClick={(e) => {

                  this.setState({ selectedPatient: e.target.value })
              
                }}>





                  {this.state.patients.map((d) => <option value={d.id}>{d.first_name}</option>)}

                </select>

              </div>

              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <label>Title:</label>

                <input onChange={(e) => { this.setState({ appointmentTitle: e.target.value }) }}></input>

              </div>

              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>


                <b>Appointment start time: </b><div>{this.state.appointmentStartTime}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div><b>Appointment end time: </b></div><div>{this.state.appointmentEndTime}</div></div>

              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label>Select the doctor:</label>

                &nbsp; &nbsp; &nbsp;



                <select name="doctors" id="doctors" onClick={(e) => {

                  this.setState({ selectedDoctor: e.target.value })

                  console.log("value", e.target.value)

                }}>




                  {this.state.doctors.map((d) => <option value={d.id}>{d.first_name}</option>)}

                </select>

              </div>

              <br /><br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={async () => {



              let calendarApi = this.calendarRef.current.getApi()


              calendarApi.addEvent({
                id: createEventId(),
                title: this.state.appointmentTitle,
                start: this.state.appointmentStartTime,
                end: this.state.appointmentEndTime,
                // allDay: selectInfo.allDay,
                // doctor,
                // patient,
                scheduledAppointment: true,
                doctor: this.state.selectedDoctor,
                patient: this.state.selectedPatient

              
              })




              // console.log("calendarAPI", calendarApi.addEvent)



              // const doctorForm = await axios.post('/api/scheduledappointments/', [{

              //   date: this.state.appointmentDate,
              //   start_time: this.state.appointmentStartTime,
              //   end_time: this.state.appointmentEndTime,
              //   title: this.state.appointmentTitle,
              //   doctor: this.state.selectedDoctor,
              //   patient: 3
              // }
              // ])




              // doctorForm && NotificationManager.success("Successfully Registered");

              this.handleClose()
            }}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>

          {console.log("events", this.state.currentEvents)}

          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    // let doctor = prompt('Please enter the doctor id')
    // let patient = prompt('Please enter the patient id')

    this.setState({ appointmentStartTime: selectInfo.startStr, appointmentEndTime: selectInfo.endStr, appointmentDate: new Date(selectInfo.start) })

    this.handleOpen()

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    // console.log("date selected", new Date(selectInfo.start))

    // if (true) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     // title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //     // doctor,
    //     // patient,
    //     scheduledAppointment: true
    //   })
    // }

    console.log("events", this.state.currentEvents)

  }

  handleEventClick = (clickInfo) => {


    console.log("eventClickInfo", clickInfo)


    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {

    this.setState({
      currentEvents: events
    })

  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (

    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>

  )
}
