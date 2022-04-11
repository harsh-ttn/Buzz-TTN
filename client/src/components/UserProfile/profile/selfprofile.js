import Profile from './profile'
import Formdetails from './formdetails'
import self from './male.jpg'
import cover from './cover.jpg'
import { CardContent, Card, Grid, Button } from '@material-ui/core'
import Header from '../../Header';



const Selfprofile = () => {
    return (
        <>
            < Header username="John Doe" />
            <Card>
                <CardContent>
                    <form>
                        <Grid container >
                            <Grid xs={12} sm={6} lg={8} md={7} item>
                                <Profile name="John Doe" cover={cover} self={self} />
                                <Button

                                    variant="contained"
                                    color="primary"
                                    
                                    
                                >
                                    Change profile picture
                                </Button>
                                <Formdetails />
                            </Grid>
                            
                           {/* <Grid xs={4} sm={4} item>
                                <Suggestions />
                            </Grid> */}
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            
        </>
    )


}

export default Selfprofile;