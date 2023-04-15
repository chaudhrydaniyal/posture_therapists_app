import React,{useState,useEffect} from 'react'
import './Invoice.css'
import {
    styled, TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow, Table
  } from '@mui/material';
  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  
const Invoice = () => {

    
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [randomNumber, setRandomNumber] = useState(null);

  const min = 10000; // minimum value (inclusive)
  const max = 99999; // maximum value (inclusive)
 
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(()=>{
    const generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(generatedNumber);
  
  },[])

  return (
    <>
    	<div className="container">
		<div className="header">
			<h1>Posture Invoice</h1>
			<p>123 Main Street, Anytown, USA</p>
			<p>Phone: (555) 555-5555</p>
			<p>Email: posture@company.com</p>
		</div>
		<div className="bill-to">
        <strong>Invoice #: PSP - {randomNumber}</strong> <br></br>
		<strong>Dill to:</strong><br></br>
        <strong>Date:</strong><br></br>
        <strong>Time:</strong>
            
		 
		</div>
       
		{/* <table>
			<tr className='th'>
				<th>Description</th>
				
				<th>Amount</th>
			</tr>
			<tr>
				<td>Product 1</td>
				<td>2</td>
				<td>$50.00</td>
				<td>$100.00</td>
			</tr>
			<tr>
				<td>Product 2</td>
				<td>1</td>
				<td>$100.00</td>
				<td>$100.00</td>
			</tr>
			<tr>
				<td>Product 3</td>
				<td>3</td>
				<td>$25.00</td>
				<td>$75.00</td>
			</tr>
		</table> */}
          <StyledTable>
            <TableHead>
              <TableRow style={{backgroundColor:'#454545'}}>
                <TableCell align="left" style={{color:'white',paddingLeft:'0.5rem'}} >Description</TableCell>
                <TableCell align="right" style={{color:'white',paddingRight:'0.5rem'}} >Amount</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {/* {getService
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((items, id) => (
                  <TableRow key={id}>
                    <TableCell align="center" width={20}>{id}</TableCell>
                    <TableCell align="left" width={100}>{items.service_name}</TableCell>
                    <TableCell align="center" width={100}>{items.description}</TableCell>
                    <TableCell align="center" width={20}>{items.charges}</TableCell>
                    <TableCell align="center" width={20}><button onClick={async () => {
                      await axios.delete(`api/Services/${items.id}`); setUpdate(!update)
                    }} style={{ backgroundColor: "#365CAD", color: "white", padding: "2px", borderRadius: '4px', }}

                    >Delete</button></TableCell>
                    <TableCell align="center" width={20}><button style={{ padding: "2px", borderRadius: '4px' }} onClick={() => { setEditService({ id: items.id, service: items.service_name, price: items.charges, description: items.description }); handleOpenEdit() }}>Edit</button></TableCell>

                  </TableRow>
                ))} */}
            </TableBody>
          </StyledTable>
		<div className="total">
			<p>Total: $275.00</p>
		</div>
	</div>
    </>
  )
}

export default Invoice