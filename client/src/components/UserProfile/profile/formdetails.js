import React, { useState } from 'react'
import './formdetails.css'
import { Grid, TextField, makeStyles, MenuItem, Select, InputLabel, FormControl, Button, CardContent, Card } from '@material-ui/core'
import axios  from '../../../service/axios'

const useStyle = makeStyles(theme => ({
    root: {

        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            width: '50%',

        }
    },

    /*  textField: {
         margin: 30
     }, 
    /* FormControl: {
         padding:30
     }, */
}))


const defaultValues = {
    fName: '',
    lName:'',
    userImage: "",
    designation: '',
    userWebsite: '',
    gender: '',
    birthDate:'',
    city: '',
    state: '',
    zip: ''
}


export default function Formdetails() {

    var user = JSON.parse(localStorage.getItem("user-data"));
    const [values, setValues] = useState(defaultValues)
    const classes = useStyle();

    const inputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const buttonChange = (e) => {
        setValues({ ...defaultValues })
    }

    const submitClick = async (e) => {
        e.preventDefault();
        try {
            console.log(values)
            const newUser =await axios.put(`/api/user/${user._id}`, values);
            console.log(newUser)
            console.log("updated post")
            setValues(defaultValues);
        }

        catch (error) {
            console.log(error)
        }

    }





return (
    <>
        <div >
            <Card >
                <CardContent>
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField label="First Name" placeholder='First Name' name="fName" onChange={inputChange} value={values.fName} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Last Name" placeholder='Last Name' name="lName" onChange={inputChange} value={values.lName} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="Designation" placeholder='Designation' name="designation" onChange={inputChange} value={values.designation} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="My Website" placeholder='My Website' name="userWebsite" onChange={inputChange} value={values.userWebsite} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="Gender"
                                        value={values.gender}
                                        onChange={inputChange}
                                        name="gender"

                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="1997-11-22"
                                    fullWidth
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField label="City" placeholder='City' name="city" onChange={inputChange} value={values.city} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={6} sm={3} item>
                                <TextField label="State" placeholder='State' name="state" onChange={inputChange} value={values.state} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={6} sm={3} item>
                                <TextField label="Zip" placeholder='Zip' name="zip" onChange={inputChange} value={values.zip} variant='outlined' fullWidth />
                            </Grid>
                            <Grid xs={6} sm={3} item>

                                <Button
                                    onClick={submitClick}
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid xs={6} sm={3} item>
                                <Button

                                    variant="contained"
                                    color="primary"
                                    onClick={buttonChange}
                                    className={classes.button}
                                >
                                    Reset All
                                </Button>
                            </Grid>


                        </Grid>
                    </form>

                </CardContent>
            </Card>
        </div>
    </>
)

}
