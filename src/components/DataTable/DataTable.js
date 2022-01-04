import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'picture', headerName: 'Profile', width: 80, renderCell: params => {
            return <img src={params.value.thumbnail} alt={"user_pp"} />
        }, sortable: false
    },
    {
        field: 'name', headerName: "Name", valueGetter: (params) => {
            const { first, last, title } = params.row.name
            return `${title.trim() ? `${title}.` : ""} ${first || ""} ${last || ""}`.trim()
        }, width: 200
    },
    {
        field: "email", headerName: "Email", width: 250
    },
    {
        field: "city", headerName: "City", width: 200, valueGetter: params => {
            return params.row.location.city
        }
    },
    {
        field: "state", headerName: "State", width: 200, valueGetter: params => {
            return params.row.location.state
        }
    }
];

export default function DataTable(props) {
    return (
        <div style={{ height: "calc(100vh - 100px)", width: '100%' }}>
            <DataGrid
                rows={props.rows}
                columns={columns}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                disableColumnSelector
                disableColumnFilter
                disableSelectionOnClick
                disableColumnMenu
            />
        </div>
    );
}