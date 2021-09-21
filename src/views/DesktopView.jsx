import React, { useEffect } from 'react';
import Summary from './Summary';
import Expenses from './Expenses';
import Settings from './Settings';
import TopNavController from '../controllers/TopNavController';
import { Container, Grid } from '@mui/material';
import CardContainer from '../components/CardContainer';
import { useSelector } from 'react-redux';
import { getCurrentTab } from '../store/interface';

function DesktopView() {

  const currentTab = useSelector(getCurrentTab);

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={5}>
          <CardContainer>
            <Summary />
          </CardContainer>
        </Grid>
        <Grid item xs={7} sx={{ position: 'relative' }}>
          <CardContainer>
            <TopNavController />
            {currentTab == 2 ? <Expenses /> : <Settings />}
          </CardContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DesktopView;