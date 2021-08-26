import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary,
    },
}));

export default function ControlledAccordions() {

    const history = useHistory();

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [permissions, setPermissions] = useState({})
    const [username, setUsername] = useState({})


    const displayUsers = () => {
        history.push('/users')
    }
    const displayMovies = () => {
        history.push('/movies')
    }
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        let permissions = window.sessionStorage.getItem("permissions");
        let username = window.sessionStorage.getItem("username");
        setPermissions(permissions);
        setUsername(username);
    }, [])
    return (
        <div className={classes.root} style={{ borderStyle: "solid", borderColor: "blue", borderWidth: "1px" }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ borderStyle: "solid", borderColor: "black", borderWidth: "1px" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        {/* {(permissions?.includes("View Movies") || username == "Admin") ?
                            <>
                                <Button variant="contained" color="primary" onClick={displayMovies} >
                                    Movies
                                </Button>
                            </> : null} */}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>all movies presented</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        this page will present all the movies presented in edition, present the option to edit or delete a movies
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ borderStyle: "solid", borderColor: "blue", borderWidth: "1px" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}><Button variant="contained" color="primary">
                        Subscriptions
                    </Button></Typography>
                    <Typography className={classes.secondaryHeading}>
                        manage all the members and their movies subscriptions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        This page presents all the members and their movies they watched (subscribed to) in edition, present the option to edit or delete a member and his relevant data
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{ borderStyle: "solid", borderColor: "blue", borderWidth: "1px" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>
                        {/* {(permissions?.includes("View Movies") || username == "Admin") ?
                      <>
                        <Button variant="contained" color="primary" onClick={displayUsers}>
                        Users management
                    </Button>
                    </> : null} */}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        manage all users existing in the system
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        This page presents all the users that existing in the system in edition, present the option to add or delete a user and his relevant data
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} style={{ borderStyle: "solid", borderColor: "blue", borderWidth: "1px" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}><Button variant="contained" color="primary">
                        Logout
                    </Button></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        press hear if you would like to logout from the web-site
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}