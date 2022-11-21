import * as React from 'react';
import { useState } from 'react';
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
import { getBarResults } from '../fetcher.js'

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
    const [tempoValue, setTempoValue] = React.useState([30, 50]);
    const [danceValue, setDanceValue] = React.useState([0, 100]);
    const [energyValue, setEnergyValue] = React.useState([0, 100]);
    const [valenceValue, setValenceValue] = React.useState([0, 100]);

    const [songsResults, setSongsResults] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
        getBarResults(tempoValue, danceValue, energyValue, valenceValue)
            .then(res => {
                console.log("fired");
                setSongsResults(res);
                console.log(res);
                console.log(songsResults);

            });
    };

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
        <div>
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

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {songsResults && <TableBody>
                            {songsResults
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={songsResults === undefined ? 0 : songsResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >

        </div>

    );
}