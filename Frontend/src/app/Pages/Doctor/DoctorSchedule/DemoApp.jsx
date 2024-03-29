import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Button } from '@mui/material';



export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    INITIAL_EVENTS: [],
    schedulingPeriod: null
  }

  async componentDidMount() {

    let events = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + `api/doctortimeslots/${this.props.data}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    })).data

    let scheduledAppointments = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + `api/scheduledappointments/${this.props.data}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    })).data

    let array1 = events.map((e) => ({ start: e.start_time, end: e.end_time, title: e.first_name, color: "green", id: e.id, title: "event", ignoreSlots: true }))

    let array2 = scheduledAppointments.map((e) => ({ start: e.start_time, end: e.end_time, title: e.patient, color: "purple", id: e.id, ignoreSlots: true  }))

    this.setState({ INITIAL_EVENTS: array1.concat(array2) })

  }

  render() {
    return (
      <div className='demo-app'>
        <NotificationContainer />
        {/* <h6>Name:{this.props.data.first_name}</h6> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
          <span style={{ marginRight: "auto", fontWeight:600}}>
              Mark the doctor's weekly schedule from the timeline below and select scheduling period for which to implement the current schedule:
          </span>
          <span className='me-3 ms-3'>
            <label for="schedulingPeriod">Scheduling Period:</label>
            &nbsp;
            <select name="schedulingPeriod" id="schedulingPeriod" onClick={(e) => { this.setState({ schedulingPeriod: e.target.value }) }}>
              <option value={1}>1 months</option>
              <option value={2}>2 months</option>
              <option value={3}>3 months</option>
            </select>
          </span>

          <Button color="primary" variant="contained" type="submit" style={{height:'35px'}} onClick={async () => {

            const postObject = {
              date_started: new Date(this.state.currentEvents[0]._instance.range.start),
              doctor: this.props.data,
              slots: this.state.currentEvents.filter((ce)=>ce._def.extendedProps.ignoreSlots != true).map(ce => ({ start_time: new Date(ce._instance.range.start), end_time: new Date(ce._instance.range.end) })),
              validity_months: this.state.schedulingPeriod
            }

            try {
              const res = await axios.post(process.env.REACT_APP_ORIGIN_URL + 'api/doctortimeslots/weeklyschedule',
                postObject,{
                  headers:{
                    Authorization: `Bearer ${localStorage.getItem('user')}`,
                  }
                }
              )
              res && NotificationManager.success("Successfully added time slots");
            }
            catch {
              NotificationManager.error("Something went wrong")
            }
            // console.log("current",this.state.currentEvents.map(ce=>({start_time:ce._instance.range.start, end_time:ce._instance.range.end})))
          }}
          >Save</Button>
        </div>
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // headerToolbar={{
            //   left: 'prev,next today',
            //   center: 'title',
            //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // }}

            headerToolbar={{
              left: '',
              center: '',
              right: ''
            }}
            allDaySlot={false}
            timeZone='Asia/Karachi'
            firstDay={new Date().getDay()}
            // start = {new Date()}
            // startStr = '2023-04-17T12:30:00-05:00'
            initialView='timeGridWeek'
            
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.INITIAL_EVENTS}
            // initialEvents={this.state.INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </div>
      </div>
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
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    if (true) {
      calendarApi.addEvent({
        id: createEventId(),
        // title,
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
      {/* <i>{eventInfo.event.title}</i> */}
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
