import * as React from 'react';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getBarResults, getBarArtist } from '../fetcher.js';
import { Audio } from 'react-loader-spinner';

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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#c034eb',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function Explore() {
    const [tempoValue, setTempoValue] = React.useState([63, 175]);
    const [danceValue, setDanceValue] = React.useState([0, 100]);
    const [energyValue, setEnergyValue] = React.useState([0, 100]);
    const [valenceValue, setValenceValue] = React.useState([0, 100]);
    const [loadingSongs, setLoadingSongs] = useState(false);
    const [songsResults, setSongsResults] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [artistResults, setArtistResults] = useState([]);

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
        setLoadingSongs(true);
        getBarResults(tempoValue, danceValue, energyValue, valenceValue)
            .then(res => {
                setSongsResults(res);
                //console.log(res);
                //console.log(songsResults);
                setLoadingSongs(false);
            });
        getBarArtist(tempoValue, danceValue, energyValue, valenceValue)
            .then(res => {
                setArtistResults(res);
            });
    };


    const columns = [
        { id: 'track_name', label: 'Track Name', minWidth: 170 },
        {
            id: 'artists_name',
            label: 'Artist',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'album_name',
            label: 'Album',
            minWidth: 170,
            align: 'right',
        },

        {
            id: 'preview',
            label: 'Preview',
            minWidth: 170,
            align: 'right'


        },
        {
            id: 'release_date',
            label: 'Release Date',
            minWidth: 170,
            align: 'right',
        }
    ];

    return (
        <div>
            <h1>Explore</h1>
            {(loadingSongs === true) && <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100',
                    width: '100',
                    color: 'white'
                }}> <Audio
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                    justifyContent="center"

                />Loading...</div>}
            <div className="explore-sliders">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5} columns={18}>
                        <Grid xs={4}>
                            <label>Tempo</label>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={tempoValue}
                                onChange={handleTempoChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                min={50}
                                step={1}
                                max={175}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <label>Danceability</label>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={danceValue}
                                onChange={handleDanceChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <label>Energy</label>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={energyValue}
                                onChange={handleEnergyChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <label>Valence</label>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={valenceValue}
                                onChange={handleValenceChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <div className="explore-submit">
                                <Button variant="contained" onClick={() => handleSearch()}>Search</Button>
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </div>
            {artistResults.length !== 0 && <div className='explore-artists'>
                <h2 style={{ color: 'white' }}>Artists You May Like:</h2>
                <div className="explore-artists-container">
                    {artistResults.map((artist) => (
                        <Item>
                            <span>{artist.name}</span>
                            <a href={`https://open.spotify.com/artist/${artist.artists_id}`} class="btn  btn-link" target="_blank">Check out on Spotify</a>
                        </Item>
                    ))}
                </div>
            </div>}
            <div className="explore-results">
                <Paper sx={{ overflow: 'hidden', margin: '20px' }}>
                    <TableContainer sx={{ maxHeight: 800 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
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
                                                            {column.id === 'preview'
                                                                ? <audio controls src={value}></audio> : value
                                                            }
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

        </div>

    );
}