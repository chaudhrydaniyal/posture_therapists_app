import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import Timeline, { TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import './style.css'
import itemRender from './itemRender'
import SundaysMarker from './SundaysMarker'
import groups from './groups'
import items from './items'
import keys from './keys'
import AddItemsForm from './AddItemsForm'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";


export default class Calender extends Component {
  state = {
    keys,
    groups,
    items,
    y19: new Date('2023/04/12'),
    patients: []
  }

  // addItemHandler = newItems => {
  //   console.log(newItems)
  //   this.setState(state => ({
  //     items: {...state.items, newItems}
  //   }))
  // }



  async componentDidMount() {

    console.log("component mounted")

    let events = await (await axios.get('http://192.168.5.21:8081/api/doctortimeslots/')).data

    let scheduledAppointments = await (await axios.get('http://192.168.5.21:8081/api/scheduledappointments/')).data

    console.log("time of app", events)

    let array1 = events.map((e, i) => ({
      id: i,
      className: "htmlCss",
      start: new Date(e.start_time).getTime(),
      end: new Date(e.end_time).getTime(),
      title: e.first_name,
      group: e.doctor,
      canMove: false,
      canResize: false,
      canChangeGroup: false,
    }))

    let array2 = scheduledAppointments.map((e, i) => ({
      id: array1.length + i,
      className: "confirm",
      start: new Date(e.start_time).getTime(), end: new Date(e.end_time),
      title: e.patient,
      group: e.doctor,
      scheduledAppointment: true,
      canMove: false,
      canResize: false,
      canChangeGroup: false
    }))

    this.setState({ items: array1.concat(array2) })

    console.log("array 1", array1)

    let doctors = await (await axios.get('http://192.168.5.21:8081/api/users/')).data

    let doctorsArray = doctors.map((e, i) => ({
      id: e.id,
      title: e.first_name
    }))

    console.log("items of state", this.state.items)

    this.setState({ groups: doctorsArray })

  }



  toTimestamp = strDate => {
    const d = new Date(strDate)
    return (Date.parse(d)) / 1000
  }

  addItemHandler = item => {





    if (item.doctor == '' || item.patient == '') {
      NotificationManager.error("Please input the required fields");
    }


    let doctorAvailable = false

    this.state.items.filter((i) => i.group == item.doctor).forEach((it) => {

      if (new Date(item.start) >= new Date(it.start) && new Date(item.end) <= new Date(it.end)) {

        let alreadyScheduledAppointment = false

        this.state.items.filter((i) => i.group == item.doctor && i.scheduledAppointment).forEach((ff) => {

          if (new Date(item.start) >= new Date(ff.start) && new Date(item.start) <= new Date(ff.end) ||

            new Date(item.end) <= new Date(ff.end) && new Date(item.end) >= new Date(ff.start)) {

            alreadyScheduledAppointment = true
            console.log("scheduled alredy")
          } else { console.log("inside else") }
        })


        if (!alreadyScheduledAppointment) {

          const newItem = {
            id: 1 + this.state.items.reduce((max, value) => value.id > max ? value.id : max, 0),
            group: item.doctor,
            title: item.patientName,
            patient: item.patient,
            className: "confirm",
            start: new Date(item.start).getTime(),
            end: new Date(item.end).getTime(),
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            scheduledAppointment: true
          }

          this.setState(state => ({
            items: [...state.items, newItem]
          }))

          NotificationManager.success("Successfully scheduled an appointment");

          return;
        }

        if (alreadyScheduledAppointment){

          NotificationManager.error("Doctor has already an appointment");


        }

        doctorAvailable = true

      }
      else {
        // console.log("it is outside the doctor slots")
      }

    })

    if (!doctorAvailable){
        NotificationManager.error("No Doctor available at this time slot");

    }


  }
  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    // const {items, groups} = this.state

    // const group = groups[newGroupOrder]

    // this.setState({
    //   items: items.map(item =>
    //     item.id === itemId
    //       ? Object.assign({}, item, {
    //         start: dragTime,
    //         end: dragTime + (item.end - item.start),
    //         group: group.id
    //       })
    //       : item
    //   )
    // })

    // console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: edge === 'left' ? time : item.start,
            end: edge === 'left' ? item.end : time
          })
          : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  render() {
    const { keys, groups, items, y19 } = this.state
    return (

      <>

        <div style={{ display: "flex", justifyContent: "end" }}>

          <button style={{ borderRadius: "5px", fontWeight: "bold", background: "#365CAD", color: "white" }} onClick={async () => {

            try {
              console.log("iddddd", this.props)
              await axios.post('http://192.168.5.21:8081/api/scheduledappointments',
                this.state.items.filter((f) => f.scheduledAppointment).map(se => ({
                  start_time: new Date(se.start), end_time: new Date(se.end), doctor: se.group,
                  patient: se.patient, title: '', date: "2023-03-01T00:00:00.000Z"
                }))
              )
              NotificationManager.success("Successfully updated appointment scheduling");
            }
            catch {
              NotificationManager.error("Nothing to update");
            }
          }}
          >Update</button></div>

        <br />

        <Timeline
          style={{ width: "90vw" }}
          keys={keys}
          groups={groups}
          // onItemClick={() => alert(1)}
          items={items}
          // rightSidebarWidth={50}
          // rightSidebarContent="Skills"
          sidebarContent="Doctors"
          lineHeight={75}
          itemRenderer={itemRender}
          defaultTimeStart={moment(y19).add(0, 'day')}
          defaultTimeEnd={moment(y19).add(1, 'day')}
          maxZoom={1.5 * 365.24 * 86400 * 1000}
          minZoom={1.24 * 86400 * 1000 * 7 * 3}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          canMove={false}
          canResize={'both'}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
        >
          {/* <TimelineMarkers>
              <TodayMarker>
                {({ styles, date }) => <div style={{ ...styles, width: '0.5rem', backgroundColor: 'rgba(255,0,0,0.5)' }} />}
              </TodayMarker>
              <SundaysMarker />
            </TimelineMarkers> */}
        </Timeline>
        <AddItemsForm onAddItem={this.addItemHandler} />
        <NotificationContainer />
      </>
    )
  }
}
