import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItemData from "./InvoiceItemData";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const withRouter = (WrappedComponent) => (props) => {
  const location = useLocation();
  {
    console.log("invoiceLocation", location);
  }
  return <WrappedComponent {...props} params={location} />;
};

class InvoiceData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: "Rs",
      currentDate: "",
      invoiceNumber: 1,
      dateOfIssue: "",
      billTo: "",
      billToEmail: "",
      billToAddress: "",
      billFrom: "",
      billFromEmail: "",
      billFromAddress: "",
      notes: "",
      total: "0.00",
      subTotal: "0.00",
      taxRate: "",
      taxAmmount: "0.00",
      discountRate: "",
      discountAmmount: "0.00",
      patientName: [],
      selectedPatient: [],
      doctorName: [],
      selectedDoctor: [],
      disabled: true,
    };
    this.state.items = [
      {
        id: 0,
        name: "",
        description: "",
        price: "1.00",
        quantity: 1,
      },
    ];
    this.editField = this.editField.bind(this);
  }

  componentDidMount(prevProps) {
    this.handleCalculateTotal();
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + "api/patients/",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        }
      })
      .then((res) => {
        this.setState({ patientName: res.data });
      });
    axios.get(process.env.REACT_APP_ORIGIN_URL + "api/users/",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res) => {
      this.setState({ doctorName: res.data }, () => {
        this.props.params.state &&
          this.setState({
            selectedPatient: this.state.patientName.filter(
              (g) => g.id == this.props.params.state.patient_id
            )[0],
          });
      });
    });
    console.log("propslocation", this.props);
  }

  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
    this.handleCalculateTotal();
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    this.state.items.push(items);
    this.setState(this.state.items);
  }

  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.map(function (items) {
      subTotal = parseFloat(
        parseFloat(
          subTotal +
            parseFloat(parseFloat(items.price).toFixed(2)) *
              parseInt(items.quantity)
        ).toFixed(2)
      );
    });

    this.setState(
      {
        subTotal: parseFloat(subTotal).toFixed(2),
      },
      () => {
        this.setState(
          {
            taxAmmount: parseFloat(
              parseFloat(subTotal) *
                (this.props.patient_invoice_data[0] &&
                  this.props.patient_invoice_data[0].tax_rate / 100)
            ).toFixed(2),
          },
          () => {
            this.setState(
              {
                discountAmmount: parseFloat(
                  parseFloat(subTotal) *
                    (this.props.patient_invoice_data[0] &&
                      this.props.patient_invoice_data[0].discount / 100)
                ).toFixed(2),
              },
              () => {
                this.setState({
                  total:
                    subTotal -
                    this.state.discountAmmount +
                    parseFloat(this.state.taxAmmount),
                });
              }
            );
          }
        );
      }
    );
  }

  onItemizedItemEdit(evt) {
    const InvoiceItemData = JSON.parse(evt.target.value);

    var item = {
      id: InvoiceItemData.key,
      serviceID: InvoiceItemData.id,
      name: InvoiceItemData.service_name,
      price: InvoiceItemData.charges,
      description: InvoiceItemData.description,
    };

    var items = this.state.items.slice();

    var newItems = items.map(function (items) {
      if (items.id == item.id) {
        items.name = item.name;
        items.serviceID = item.serviceID;
        items.price = item.price;
        items.description = item.description;
      }

      return items;
    });

    this.setState({ items: newItems });
    this.handleCalculateTotal();
  }

  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.handleCalculateTotal();
  };

  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };

  closeModal = (event) => this.setState({ isOpen: false });

  render() {
    return (
      <Form onSubmit={this.openModal}>
        {console.log("received props", this.props)}
        <Row style={{ marginLeft: "5px" }}>
             <Col md={1} >
          
          </Col><Col md={10} >
            <Card className="p-4 p-xl-16 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div class="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div class="mb-2">
                      <span className="fw-bold">Due&nbsp;Date:&nbsp;</span>
                      <span className="current-date">
                        {moment(
                          this.props.patient_invoice_data[0] &&
                            this.props.patient_invoice_data[0].date
                        )
                          .utc()
                          .format("DD-MM-YYYY ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">
                    Invoice&nbsp;Number:&nbsp;
                  </span>
                  <Form.Control
                    type="number"
                    value={this.state.invoiceNumber}
                    name={"invoiceNumber"}
                    onChange={(event) => this.editField(event)}
                    min="1"
                    style={{
                      maxWidth: "70px",
                    }}
                    required="required"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                  "@media screen (max-width: 600px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Row className="mb-5 col-xl-5">
                  <Col>
                    <Form.Label className="fw-bold">Bill to:</Form.Label>

          

                    <input
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        border: "0.5px solid grey",
                        marginTop: "1rem",
                        borderRadius: "6px",
                      }}
                      value={
                        this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].patient_first_name
                      }
                      placeholder="patient Name.."
                      disabled={this.state.disabled}
                    />
                    <br></br>

                    <input
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        border: "0.5px solid grey",
                        marginTop: "1.5rem",
                        borderRadius: "6px",
                      }}
                      value={
                        this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].email
                      }
                      placeholder="Email"
                      disabled={this.state.disabled}
                    />
                    <br></br>

                    <br></br>

                    <input
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        border: "0.5px solid grey",
                        borderRadius: "6px",
                      }}
                      placeholder="Address"
                      value={
                        this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].address
                      }
                      disabled={this.state.disabled}
                    />
                  </Col>
                </Row>

                <Row className="mb-5 col-xl-4">
                  <Col>
                    <Form.Label className="fw-bold">Doctor name:</Form.Label>

                    <br></br>

                    <input
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        border: "0.5px solid grey",
                        borderRadius: "6px",
                      }}
                      placeholder="Address"
                      value={
                        this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].doctor_first_name
                      }
                      disabled={this.state.disabled}
                    />
                  </Col>
                </Row>
              </div>

              {console.log("send props", this.props.patient_invoice_data)}

              <InvoiceItemData
                onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                invoice_item={
                  this.props.patient_invoice_data &&
                  this.props.patient_invoice_data.length > 0 &&
                  this.props.patient_invoice_data[0].invoice_items
                }
              />

              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {this.state.currency} &nbsp;
                      {this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].sub_total}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount: </span>
                    <span>
                      <span className="small ">
                        (
                        {(this.props.patient_invoice_data[0] &&
                          this.props.patient_invoice_data[0].discount) ||
                          0}
                        %) &nbsp;
                      </span>
                      RS{" "}
                      {(((this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].discount) || 0) / 100 ) * (this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].sub_total)}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small ">
                        (
                        {(this.props.patient_invoice_data[0] &&
                          this.props.patient_invoice_data[0].tax_rate) ||
                          0}
                        %) &nbsp;
                      </span>
                      RS{" "}
                      {(((this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].tax_rate) || 0) / 100 ) * (this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].sub_total)}
                    </span>
                  </div>

                  <hr />

                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{
                      fontSize: "1.125rem",
                    }}
                  >
                    <span className="fw-bold">Total:</span>

                    <span className="fw-bold">
                      {this.state.currency}
                      &nbsp;
                      {((this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].sub_total) ||
                        0)
                        
                        +

                        // Tax amount to add

                       ((((this.props.patient_invoice_data[0] &&
                          this.props.patient_invoice_data[0].tax_rate) || 0) / 100 ) * (this.props.patient_invoice_data[0] &&
                          this.props.patient_invoice_data[0].sub_total))

                        -
                        
                       // discount amount to subtract
                       
              
                       ((((this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].discount) || 0) / 100 ) * (this.props.patient_invoice_data[0] &&
                        this.props.patient_invoice_data[0].sub_total))
                        
                        }
                    </span>
                  </div>
                </Col>
              </Row>

              <hr className="my-4" />

              <Form.Label className="fw-bold">Notes:</Form.Label>

              <Form.Control
                placeholder="Thanks for your business!"
                name="notes"
                value={this.state.notes}
                onChange={(event) => this.editField(event)}
                as="textarea"
                className="my-2"
                rows={1}
              />
            </Card>
          </Col>
          <Col md={1} >
            {/* <div className="sticky-top pt-md-3 pt-xl-4">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={(event) =>
                    this.onCurrencyChange({ currency: event.target.value })
                  }
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="PKR" selected>
                    PKR (Pakistani Rupee)
                  </option>
                  <option value="$">USD (United States Dollar)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={
                      this.props.patient_invoice_data[0] &&
                      this.props.patient_invoice_data[0].tax_rate
                    }
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={
                      this.props.patient_invoice_data[0] &&
                      this.props.patient_invoice_data[0].discount
                    }
                    onChange={(event) => this.editField(event)}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div> */}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withRouter(InvoiceData);
