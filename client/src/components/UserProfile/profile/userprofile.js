import React, {useState, useEffect} from 'react';
import Profile from './profile'
import cover from './cover.jpg'
import self from './male.jpg'
import { Button, CardContent, Card, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { PersonAdd, PresentToAll } from '@material-ui/icons';
import Header from '../../Header';
import axios from "../../../service/axios"
import { useParams, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function Userprofile() {

    const classes = useStyles();
    const [userData, setUserData] = useState({})
    let { id } = useParams();


    useEffect(()=>{
        const getuserData = async () => {
            try{
                const res = await axios(`/api/user/${id}`);
                console.log(res.data)
                setUserData(res.data)
            }catch(error){
                console.log(`Error ${error}`)
            }
        }
        getuserData()
    },[])   
    return (
        <>
            < Header username="John Doe" />
            <Card>
                <CardContent>
                    <form>
                        <Grid container >
                            <Grid xs={12} sm={6} lg={8} md={7} item>
                            <div style={{
                                backgroundColor: "#E5E4E2",
                            }}>

                                <Profile name={userData.name} about={`${userData.name} is ${userData.designation} `} location={`${userData.city}, ${userData.state}`} cover={cover} self={self}></Profile>

                                <div style={{ paddingLeft: "60px" }}><Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<PersonAdd />}
                                >
                                    Add Friend
                                </Button>
                                <Link to={userData.userWebsite} >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.margin}
                                        startIcon={<PresentToAll />}
                                    >
                                        Website
                                    </Button>
                                    </Link>
                                </div>


                            </div>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </>
    )

}


