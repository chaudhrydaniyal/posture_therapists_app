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
import Tabs from 'react-bootstrap/Tabs';
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
    INITIAL_EVENTS: []
  }


  async componentDidMount() {

    let events = await (await axios.get('/api/doctortimeslots/')).data

    this.setState({ INITIAL_EVENTS: events.map((e) => ({ start: e.start_time, end: e.end_time, title: e.first_name, color: "green" })) })

  }




  render() {



    return (
      <Container>
      <Box className="breadcrumb">
      <Breadcrumb routeSegments={[ { name: 'Appointment Scheduling' }]} />
    </Box>
  
   
          <div className='card'>
            <div className='card-body'>
              <div className='demo-app'>
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>

                  <button style={{ borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} onClick={async () => {
                    console.log("iddddd", this.props)
                    await axios.post('api/doctortimeslots',
                      this.state.currentEvents.map(ce => ({ start_time: ce._instance.range.start, end_time: ce._instance.range.end, doctor: this.props.data }))
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
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
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
