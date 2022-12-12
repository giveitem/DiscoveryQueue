import { useState } from 'react';
// import './Five4Five.css';
import { getSearchSongs, getSongResults } from '../fetcher.js'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';

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

const Five4Five = (props) => {
    const [selectedSongs, setSelected] = useState([]);
    const [songsResults, setSongsResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searchA, setSearchA] = useState('');
    const [loadingSongs, setLoadingSongs] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [counter, setCounter] = useState(0);

    const [songMatchedResults, setSongMatchedResults] = useState([]);

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



    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addSong = (song) => {
        if (counter < 5) {
            if (!selectedSongs.includes(song)) {
                setSelected([...selectedSongs, song]);
                setCounter(counter + 1);
            }
        }
    }
    const deleteSong = (song) => {
        setSelected(selectedSongs.filter(s => s.t_id !== song.t_id));
        setCounter(counter - 1);
    }


    const updateSearchResults = () => {
        setLoadingSongs(true);
        getSearchSongs(search, searchA)
            .then(res => {
                setSongsResults(res.results);
                setLoadingSongs(false);
                console.log(songsResults);
            });
    };




    const reset = () => {
        setSelected([]);
        setSongMatchedResults([]);
        setCounter(0);
    }

    const getResults = () => {

        let songIds = selectedSongs.map(song => song.t_id);
        let selected = [];
        for (let i = 0; i < 5; i++) {
            getSongResults(songIds[i]).then(res => {
                if (res.length > 0) {
                    selected.push(res[0]);
                }
            });
        }
        console.log(selected);
        timeout(400).then(res => {
            setSongMatchedResults(selected);
        }
        )

    }


    return (
        <div className='HomePage' >
            <h1>Five4Five</h1>

            <div className='five-search'>
                <label name="five-submit">Song Name</label>
                <input type='text' name="five-submit" placeholder="Song Name" onChange={(event) => setSearch(event.target.value)} />
                <label name="five-submit">Artist Name</label>
                <input type='text' name="five-submit" placeholder="Artist Name" onChange={(event) => setSearchA(event.target.value)} />
                <button name="five-submit" onClick={() => updateSearchResults()} >SEARCH</button>
            </div>

            <div className='five-selected'>
                <h2>Selected Songs</h2>
                <h3>{counter}/5 </h3>
                {selectedSongs.map(song => (
                    <div key={song.id}>
                        <div>{song.name} - {song.artists_name}
                            <Button onClick={() => deleteSong(song)}>
                                Remove
                            </Button>
                        </div>

                    </div>
                ))}
                {counter === 5 && <Button variant="contained" color="primary" onClick={() => getResults()}>Create Playlist</Button>}
            </div>

            {songMatchedResults.length !== 0 &&
                <div className='five-selected'>
                    <h2>Your Playlist</h2>
                    {songMatchedResults.map(song => (
                        <div key={song.id}>
                            <div>{song.name} - {song.artists_name}
                                <a href={`https://open.spotify.com/track/${song.id}`} class="btn  btn-link" target="_blank">Go Listen on Spotify</a>
                            </div>
                        </div>
                    ))}
                    <Button variant="contained" color="primary" onClick={() => reset()}>Reset</Button>
                </div>}



            {/* <div className='Songs'>
                {songsResults.map(song => (
                    <div key={song.id}>
                        <div> {song.name} </div>
                        <button onClick={() => addSong(song)}>Add</button>
                    </div>
                ))}
            </div> */}
            <Paper sx={{ overflow: 'hidden', margin: '20px' }}>
                <TableContainer sx={{ maxHeight: 800 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
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
                                <StyledTableCell>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
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
                                            <TableCell key={columns[3].id} align={columns[3].align}>
                                                <Button variant="contained" color="success" onClick={() => addSong(row)}>
                                                    Add Song
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={songsResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </div >
    );
}



export default Five4Five;