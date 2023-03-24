import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import './index.css'
export default class AppointmentSchedule extends React.Component {


  state = {
    weekendsVisible: true,
    currentEvents: [],
    INITIAL_EVENTS: [],
    show: false
  }


  async componentDidMount() {

    let events = await (await axios.get('http://localhost:8081/api/doctortimeslots/')).data

    this.setState({ INITIAL_EVENTS: events.map((e) => ({ start: e.start_time, end: e.end_time, title: e.first_name, color: "green" })) })

  }



  handleOpen = () => {
    this.setState({ show: true });
  }


  handleClose = () => {
    this.setState({ show: false });
  }




  render() {



    return (

      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="breadcrumb breadcrumb-style ">
                  <li className="breadcrumb-item">
                    <h4 className="page-title">Appointment Scheduling</h4>
                  </li>
                  <li className="breadcrumb-item bcrumb-1">
                    <a href="../../index.html">
                      <i className="fas fa-home"></i> Home
                    </a>
                  </li>
                  <li className="breadcrumb-item bcrumb-2">
                    <a href="#">Appointment Scheduling</a>
                  </li>
                  {/* <li className="breadcrumb-item active">Doctor Registration</li> */}
                </ul>
              </div>
            </div>
          </div>

        </div>
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
                  // console.log("current",this.state.currentEvents.map(ce=>({start_time:ce._instance.range.start, end_time:ce._instance.range.end})))

                }}
                >Update</button>
              </div>
              {/* {this.renderSidebar()} */}
              <div className='demo-app-main'>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}


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


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </section>

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
    let title = prompt('Please enter a new title for your event')
    let doctor = prompt('Please enter the doctor id')
    let patient = prompt('Please enter the patient id')


    this.handleOpen()

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        doctor,
        patient,
        scheduledAppointment: true
      })
    }


    console.log("events", this.state.currentEvents)

  }

  handleEventClick = (clickInfo) => {
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
