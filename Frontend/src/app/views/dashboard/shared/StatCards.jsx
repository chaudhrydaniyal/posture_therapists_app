import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const [patientCount,setPatientCount] = useState([])
  const [doctorCount,setDoctorCount] = useState([])
  const [scheduledAppointment,setScheduledAppointment] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/patients/',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res) => { setPatientCount(res.data.length)})
    console.log("patientCount",patientCount)
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/users/',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res) => setDoctorCount(res.data.length))
    axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/scheduledappointments/',{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      }
    }).then((res)=>{setScheduledAppointment(res.data.length)})
  
  }, [])
  const cardList = [
    { name: 'Total Patients', amount: patientCount, icon: 'airline_seat_flat', link:"/registeredPatient" },
    { name: 'Available Doctors', amount: doctorCount, icon: 'earbuds' , link:"/registeredDoctors" },
    { name: 'Total Appointments', amount: scheduledAppointment, icon: 'edit_calendar' , link:""},
    { name: 'Total Branches', amount: 1, icon: 'location_city' , link:""},
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <Link to={item.link}>
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
              </Link>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
