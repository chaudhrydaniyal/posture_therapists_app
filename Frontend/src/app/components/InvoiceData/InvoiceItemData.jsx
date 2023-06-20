import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableFields";
import axios from "axios";
import { Form } from "react-bootstrap";
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

class InvoiceItemData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: [],
      service: [],
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_ORIGIN_URL + "api/services/",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('user')}`,
        }
      })
      .then((res) => {
        this.setState({ service: res.data });
      });
  }

  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var service = this.state.service;

    return (
      <div>
        <StyledTable>
          <TableHead>
            <TableRow>
              {console.log("data props", this.props)}

              <TableCell align="left">ITEM</TableCell>

              <TableCell align="left">DESCRIPTION</TableCell>
              <TableCell align="right">PRICE/RATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.invoice_item &&
              this.props.invoice_item.map((g, id) => {
                return (
                  <TableRow key={id}>
                    <TableCell align="left">{g.item}</TableCell>
                    <TableCell align="left">{g.description}</TableCell>
                    <TableCell align="right">{g.price}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </StyledTable>
      </div>
    );
  }
}

class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: [],
      disabled: true,
    };
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }

  render() {
    return (
      <tr>
        <td style={{ width: "100%" }}></td>
        <td style={{ minWidth: "130px" }}></td>
        <td className="text-center" style={{ minWidth: "50px" }}>
          <BiTrash
            onClick={this.onDelEvent.bind(this)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          />
        </td>
      </tr>
    );
  }
}

export default InvoiceItemData;
