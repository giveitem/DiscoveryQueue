import * as React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function valuetext(value) {
    return `${value}°C`;
}
export default function Explore() {
    const [tempoValue, setTempoValue] = React.useState([20, 37]);
    const [danceValue, setDanceValue] = React.useState([20, 37]);
    const [energyValue, setEnergyValue] = React.useState([20, 37]);
    const [valenceValue, setValenceValue] = React.useState([20, 37]);

    const handleTempoChange = (event, newValue) => {
        setTempoValue(newValue);
    };

    const handleDanceChange = (event, newValue) => {
        setDanceValue(newValue);
    };


    const handleEnergyChange = (event, newValue) => {
        setEnergyValue(newValue);
    };


    const handleValenceChange = (event, newValue) => {
        setValenceValue(newValue);
    };

    const handleSearch = () => {

    }
    const columns = [
        { id: 'name', label: 'Track Name', minWidth: 170 },
        {
            id: 'artists_name',
            label: 'Artist',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'album',
            label: 'Album',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'date',
            label: 'Release Date',
            minWidth: 170,
            align: 'right',
        }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                <Grid xs={8}>
                    <label>Tempo</label>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={tempoValue}
                        onChange={handleTempoChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Grid>
                <Grid xs={8}>
                    <label>Danceability</label>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={danceValue}
                        onChange={handleDanceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Grid>
                <Grid xs={8}>
                    <label>Energy</label>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={energyValue}
                        onChange={handleEnergyChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Grid>
                <Grid xs={8}>
                    <label>Valence</label>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={valenceValue}
                        onChange={handleValenceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Grid>

            </Grid>
            <Button variant="contained" onClick={() => handleSearch()}>Search</Button>
        </Box>




    );
}