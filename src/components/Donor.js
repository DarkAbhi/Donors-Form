import React, { useState } from "react";
import "../App.css";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@material-ui/core/Checkbox";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Donor = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [dateofrecovery, setDateOfRecovery] = useState(null);
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [vaccinateddate, setVaccinatedDate] = useState(null);

  const [loader, setLoader] = useState(false);

  const handleDateOfRecoveryChange = (dateofrecovery) => {
    setDateOfRecovery(dateofrecovery);
  };

  const handleVaccinatedDateChange = (vaccinateddate) => {
    setVaccinatedDate(vaccinateddate);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("NeravuPlasmaDonors")
      .add({
        name: name,
        place: place,
        bloodgroup: bloodgroup,
        dateofrecovery: dateofrecovery,
        number: number,
        age: age,
        vaccinated: vaccinated,
        vaccinateddate: vaccinateddate,
        timestamp: new Date(),
      })
      .then(() => {
        toast.success("We have received your submission.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setPlace("");
    setBloodGroup("");
    setDateOfRecovery(null);
    setNumber("");
    setAge("");
    setVaccinated(false);
    setVaccinatedDate(null);
  };
  const classes = useStyles();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Neravu Plasma Donors</h1>

      <label>Full Name</label>
      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Place</label>
      <input
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
      />

      <label>Blood Group</label>
      <FormControl className={classes.formControl}>
        <InputLabel id="bloodgroup-select-label">Blood Group</InputLabel>
        <Select
          labelId="bloodgroup-select-label"
          id="bloodgroup-select"
          value={bloodgroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <MenuItem value={"A+"}>A+</MenuItem>
          <MenuItem value={"A-"}>A-</MenuItem>
          <MenuItem value={"B+"}>B+</MenuItem>
          <MenuItem value={"B-"}>B-</MenuItem>
          <MenuItem value={"O+"}>O+</MenuItem>
          <MenuItem value={"O-"}>O-</MenuItem>
          <MenuItem value={"AB+"}>AB+</MenuItem>
          <MenuItem value={"AB-"}>AB-</MenuItem>
        </Select>
      </FormControl>

      <label>Date of recovery</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="recovery-date-picker-inline"
          value={dateofrecovery}
          onChange={handleDateOfRecoveryChange}
          autoOk={true}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          required
        />
      </MuiPickersUtilsProvider>

      <label>Contact Number</label>
      <input
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />

      <label>Age</label>
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <label>Vaccinated</label>
      <Checkbox
        checked={vaccinated}
        onChange={(e) =>
          setVaccinated(
            e.target.type === "checkbox" ? e.target.checked : e.target.value
          )
        }
        inputProps={{ "aria-label": "primary checkbox" }}
      />

      <label>Vaccination Date</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="recovery-date-picker-inline"
          value={vaccinateddate}
          onChange={handleVaccinatedDateChange}
          autoOk={true}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : "rgb(2,2,110)" }}
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default Donor;
