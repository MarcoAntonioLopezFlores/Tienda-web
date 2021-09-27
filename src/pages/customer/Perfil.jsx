import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core';
import ChangeInformation from '../../components/perfil/ChangeInformation';
import PhoneContent from '../../components/perfil/PhoneContent';
import AddressContent from '../../components/perfil/AddressContent';
import CardCreditContent from '../../components/perfil/CardCreditContent';
import ChangePasswordProfile from '../../components/perfil/ChangePasswordProfile';

const useStyles = makeStyles(() => ({
    paper: {
        padding: 10,
        margin: 'auto',
        marginTop: 20,
        maxWidth: '90%'
    },
    principal: {
        padding: 10
    },
    labels: {
        color: '#8A8686'
    }
}));
const Perfil = () => {
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container direction="row-reverse" justify="space-around">                    
                    <ChangePasswordProfile  />
                    <Grid style={{marginTop:20}} item xs={12} sm={12} md={7}>
                    <ChangeInformation />
                    <AddressContent/>
                    <PhoneContent />                    
                    <CardCreditContent />
                    </Grid>                    
                </Grid>
            </Paper>            
        </>
    )
}

export default Perfil

