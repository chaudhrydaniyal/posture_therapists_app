import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableFields';
import axios from 'axios';
import { Form } from 'react-bootstrap';
class InvoiceItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedService: [],
      service: [],

    }
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/services/').then((res) => {
      this.setState({ service: res.data });

    })
  }
 
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var service = this.state.service
    var itemTable = this.props.items.map(function (item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} service={service} />
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              {/* <th>QTY</th> */}
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>

      </div>
    );

  }

}
class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: [],
      disabled: (true)

    }
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{ width: '100%' }}>
          {/* <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/> */}
          <div style={{ display: "flex" }}>
            <select style={{ height: "2.5rem", borderRadius: "6px", width: "50%" }} name="name" onChange={(e) => {
              this.props.onItemizedItemEdit(e)
              this.setState({ selectedService: this.props.service.filter((g) => g.id == JSON.parse(e.target.value).id)[0] })
            }}>

              <option value="none" selected disabled hidden>
                Select Service...
              </option>


              {console.log("props", this.props.item.id)}

              {this.props.service && this.props.service.map((items, i) => (

                <option
                  // id={this.props.item.id}
                  value = {JSON.stringify({key:this.props.item.id, ...items})}
                  price = {items.charges}
                  description = {items.description}
                  key = {items.id}
                >
                  {items.service_name}
                </option>

              ))}
            </select>





            <input style={{ height: '2.5rem', marginLeft: '1rem', width: '50%', borderRadius: "6px" }} placeholder='Discription' value={this.state.selectedService.description} disabled={this.state.disabled} />





            {/* <EditableField
          style={{height:'2rem',marginLeft:'1rem'}}
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: this.props.item.description,
            id: this.props.item.id
          }}/> */}
          </div>
        </td>
        {/* <td style={{minWidth: '70px'}}>git up */}
        {/* <EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: this.props.item.quantity,
            id: this.props.item.id,
          }}/> */}
        {/* <p style={{width:"70%",height:"2.5rem",border:"0.5px solid grey",borderRadius:"6px",display:"flex",justifyContent:"center",paddingTop:"5px"}}>1</p> */}
        {/* </td> */}
        <td style={{ minWidth: '130px' }}>





          <p style={{ width: "70%", height: "2.5rem", border: "0.5px solid grey", borderRadius: "6px", display: "flex", justifyContent: "center", paddingTop: "5px" }}>{this.state.selectedService.charges}</p>





          {/* <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            leading: this.props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.price,
            id: this.props.item.id,
          }}/> */}
          {/* <p>{this.state.serviceList.charges}</p> */}
        </td>
        <td className="text-center" style={{ minWidth: '50px' }}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{ height: '33px', width: '33px', padding: '7.5px', }} className="text-white mt-1 btn btn-danger" />
        </td>
      </tr>
    );


  }
}

export default InvoiceItem;
