import { useState } from 'react';
import './Five4Five.css';
import { getSearchSongs } from '../fetcher.js'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



const columns = [
    { id: 'name', label: 'Track Name', minWidth: 170 },
    {
        id: 'artists_name',
        label: 'Artist',
        minWidth: 170,
        align: 'right',
    }

];

const Five4Five = (props) => {
    const [selectedSongs, setSelected] = useState([]);
    const [songsResults, setSongsResults] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingSongs, setLoadingSongs] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addSong = (song) => {
        if (!selectedSongs.includes(song)) {
            setSelected([...selectedSongs, song]);
        }
    }


    const updateSearchResults = () => {
        setLoadingSongs(true);
        getSearchSongs(search)

            .then(res => {
                setSongsResults(res.results);
                setLoadingSongs(false);
                console.log(songsResults);
            });
    };
    return (
        <div className='HomePage' >
            <h1>Five4Five</h1>

            <input type='text' placeholder="Song Name" onChange={(event) => setSearch(event.target.value)} />
            <button onClick={() => updateSearchResults()}>Search</button>


            <div className='Selected'>
                {selectedSongs.map(song => (
                    <div key={song.id}>
                        <div>{song.name}</div>
                        <button onClick={() => setSelected(selectedSongs.filter(s => s.id !== song.id))}>Remove</button>
                    </div>
                ))}
            </div>


            {/* <div className='Songs'>
                {songsResults.map(song => (
                    <div key={song.id}>
                        <div> {song.name} </div>
                        <button onClick={() => addSong(song)}>Add</button>
                    </div>
                ))}
            </div> */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
            </Paper>
        </div >
    );
}



export default Five4Five;