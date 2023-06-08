import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, createTheme, Divider, FormControl, Grid, Icon, IconButton, InputAdornment, MenuItem, TextField, ThemeProvider, Typography, withStyles } from "@material-ui/core";
import '../../pages/EditProfile.css';
import Header from '../Header';
// import './Login-Signup.css';
// import './Restaurant-View.css';
// import PhoneInput from 'react-phone-input-2';
import '../../pages/EditRestaurant.css';
import PhoneInput from 'material-ui-phone-number';
import 'react-phone-input-2/lib/style.css';
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import AdapterDayjs from '@date-io/dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import { useHistory } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Footer from "../Footer";
import { Alert, AlertTitle, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import './Dashboard.css';
// import { id } from "date-fns/locale";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { useMemo } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { parse } from "date-fns";
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

// const styles = theme => ({
//     field: {
//       margin: '10px 0',
//       width : "100px",
//     },
//     countryList: {
//       ...theme.typography.body1,
//       width : "100px",
//     },
// });
const theme = createTheme({
    palette: {
        primary: {
            main: '#dd9d46',
        },
        secondary: {
            main: '#a44704',
        }
    },
});
const headCells = [
    {
        id: 'no',
        numeric: true,
        disablePadding: true,
        label: 'No.'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Restaurant name'
    },
    {
        id: 'order',
        numeric: false,
        disablePadding: false,
        label: 'Order'
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date'
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: 'Status'
    },
];
function createData(name, order, price, date, status, restaurant_id) {
    return {
        name,
        order,
        price,
        date,
        status,
        restaurant_id
    };
}  
let rows = [
    // createData("Bella", 'Pizaa, Drink, watge, fdjksl, fjsilios, jflkdfjuiff, kfjdfodifdf, fkljdsofjifd', "10$", "2023-10-1", "Completed"),
    // createData("China", 'Steak', "30$", "2023-10-1", "In progress"),
    // createData("Aba", 'Ghormeh', "150$", "2023-10-1", "Open"),
    // createData("mina", 'Polp', "200$", "2022-9-10", "Canceled"),
    // createData("Ans", 'Morgh', "420$", "2023-10-5", "Ordered"),
    // createData("lora", 'water', "300$", "2023-11-10", "Completed"),
    // createData("Den", 'Coca', "300$", "2023-10-1", "Open"),
    // createData("jim", 'rice', "300$", "2023-10-1", "Completed"),
    // createData("kimi", 'spaghetti', "300$", "2023-10-1", "Completed"),
    // createData("pria", 'Pizaa', "300$", "2023-10-1", "Completed"),
    // createData("orange", 'Pizaa', "300$", "2023-10-1", "Completed"),
    // createData("kej", 'Pizaa', "300$", "2023-10-1", "Completed")
];

function descendingComparator(a, b, orderBy){
    if (b[orderBy] < a[orderBy]){
        return -1;
    }
    if (b[orderBy] > a[orderBy]){
        return 1;
    }
    return 0;
};

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if(order !== 0){
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

function DashboardTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel 
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null }
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
DashboardTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function Dashboard(){
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Price');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] =  useState(0);
    const history = useHistory();
    const favoriteRestaurant = JSON.parse(localStorage.getItem('list_of_favorites_res'));
    const [color, setColor] = useState(localStorage.getItem('avatarColor') || getRandomColor());
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const [orderHistory, setOrderHistory] = useState();
    const [orderid, setOrderid] = useState();
    function getRandomColor() {
        const colors = ['#FFA600', '#fff2bf', '#ffe480', '#a2332a' , '#E74C3C' , '#690000' , '#595959', '#3e3e3e' , '#C6C6C6', '#ABABAB', '#B9B9B9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    // console.log("$$$$$$$$$$$$$$$$$",favoriteRestaurant);

    useEffect(() => {
        axios.get(
            `http://5.34.195.16/restaurant/customer/${id}/orderview/`,
            {headers :{
                'Content-Type' : 'application/json',
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET,PATCH",
                'Authorization' : "Token " + token.slice(1,-1)
            }}
        )
        .then((response) => {
            console.log(response);
            setOrderHistory(response.data);
            // console.log("length" + orderHistory.length);
        })
        .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        // console.log("order history ios " + orderHistory.length);
        if(orderHistory){
            for (let i = 0; i < orderHistory.length; i++) {
                // const element = array[i];
                console.log(orderHistory[i]);


                let restaurant_name = orderHistory[i].restaurantDetails.name;
                setOrderid(orderHistory[i].restaurantDetails.id);
                setRestaurantId(orderHistory[i].restaurantDetails.restaurant_id);
                let order = "";
                for(let j=0; j < orderHistory[i].orderDetails.orderItems.length; j++){
                    order += orderHistory[i].orderDetails.orderItems[j].quantity + "×" + orderHistory[i].orderDetails.orderItems[j].name_and_price.name;
                    if(j!= orderHistory[i].orderDetails.orderItems.length-1){
                        order += ", ";
                    }
                }
                let price = orderHistory[i].orderDetails.Subtotal_Grandtotal_discount[1];
                const date = new Date(orderHistory[i].created_at);
                let formatted_date = date.toISOString().split('T')[0];
                let status = orderHistory[i].status;
                let restaurant_id = orderHistory[i].restaurantDetails.id;
                const new_row = createData(restaurant_name, order, price, formatted_date, status, restaurant_id)
                rows = [...rows, new_row];                
            }
        }

    }, [orderHistory]);

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () => 
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage , page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage]
    );
    
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const getRowColor = (status) => {
        if(status === "Completed") {
            return "rgba(65, 156, 86, 0.5)";
        } else if(status === "In progress") {
            return "rgba(242, 223, 51, 0.4)";
        } else if(status === "Ordered") {
            return "rgba(245, 132, 12, 0.4)"
        } else if(status === "Canceled"){
            return "rgba(240, 44, 26, 0.5)";
        } else {
            return "rgba(176, 173, 169, 0.5)";
        }
    };

    const showCancelIcon = (status) => {
        return status === 'Completed';
    }

    // const options = {
    //     rowStyle
    // }

    const handleShowFavoriteRestaurant = (id) => {
        history.push("./restaurant-view/"+ id);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [restaurantId, setRestaurantId] = useState('');
    const handleRowClick = (row) => {
        if (row.status === 'Completed') {
            setRestaurantId(row.restaurant_id);
            console.log(row.restaurant_id);
            setIsModalOpen(true);
        }
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [text, setText] = useState('');
    // const userId = localStorage.getItem("id");
    const handleAddtext = (e) => {
        setText(e.target.value);
        console.log(text);
    }
    const handleAdd = (e) => {
        e.preventDefault();
        const userData = {
            text:text
        }
        axios.post(`http://5.34.195.16/restaurant/comment/user_id/${id}/restaurant_id/${restaurantId}`, userData, {headers:{"Content-Type" : "application/json" , 'Authorization' : "Token " + token.slice(1,-1)}})
        .then((response) => {
            console.log(response);
            window.location.reload(false);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
            } 
        });    
    }

    const handleCancleOrdering = (e) => {
        e.preventDefault();
        const userData = {
            status:"Cancle"
        }
        axios.post(`http://5.34.195.16/restaurant/restaurant_view/${restaurantId}/${id}/order/${orderid}`, userData,
        {headers :{
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Methods" : "GET,PATCH",
            'Authorization' : "Token " + token.slice(1,-1)
        }})
        .then((response) => {
            console.log(response);
            window.location.reload(false);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
            } 
        }); 
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="dashboard-back">
                <Header />
                <Grid container spacing={2} className="dashboard-grid">
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Box className="dashboard-box" id="favorite-restaurants-box">
                            <Typography
                                variant="h5" 
                                color="textPrimary"
                                gutterBottom
                                className="dashboard-title-manager"
                            >
                                Favorite restaurants
                            </Typography>
                            {favoriteRestaurant && favoriteRestaurant.map((res, index) => (
                                <Box className="dashboard-restaurant-box" onClick={() => handleShowFavoriteRestaurant(res.id)}>
                                    <Grid container spacing={2}>
                                        <Grid item lg={5} md={3} sm={4} xs={4} className="food">
                                            <img src={res.restaurant_image} className="food-image"/>
                                        </Grid>
                                        <Grid item lg={7} md={7} sm={8} xs={8}>
                                            <Typography className="dashboard-restaurant-name">
                                                {res.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                        <Box className="dashboard-box" id="order-history-box">
                            <Typography
                                variant="h5" 
                                color="textPrimary"
                                gutterBottom
                                className="dashboard-title-manager"
                            >
                                Order history
                            </Typography>
                            <TableContainer>
                                <Table
                                    aria-labelledby="OrderTable"
                                >
                                    <DashboardTableHead 
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {visibleRows.map((row, index) => {
                                            return(
                                                <TableRow
                                                    hover
                                                    key={row.name}
                                                    // sx={{ cursor: 'pointer'}}
                                                    sx={{ cursor: row.status === 'Completed' ? 'pointer' : 'default',}}
                                                    tabIndex={-1}
                                                    style={{backgroundColor: getRowColor(row.status)}}
                                                    onClick={() => handleRowClick(row)}
                                                    
                                                >
                                                    <TableCell
                                                        component="th"
                                                        // id={labelId}
                                                        scope="row"
                                                        align="right"
                                                        // padding="none"
                                                    >
                                                        
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.order}</TableCell>
                                                    <TableCell>{row.price}</TableCell>
                                                    <TableCell>{row.date}</TableCell>
                                                    <TableCell>
                                                        {row.status}
                                                        {showCancelIcon(row.status) && 
                                                            <IconButton onClick={handleCancleOrdering} title="Cancel order">
                                                                <ClearIcon style={{color:'red'}}/>
                                                            </IconButton>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination 
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}    
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    
                    <Box sx={style} className="dashboard-comment-box">
                    <h2 className='dashboard-title-show-comments'>Add Comment And Rate</h2>
                    <textarea className='dashboard-textarea' onChange={handleAddtext}></textarea>
                    <Stack direction="row" >
                        <Button onClick={() => setIsModalOpen(false)} variant="contained" className='dashboard-btn-close'>
                            Close
                        </Button>
                        <Button variant="contained" className='dashboard-btn-submit' onClick={handleAdd}>
                            Sublmit
                        </Button>
                    </Stack>
                    </Box>
                </Modal>
                <Footer />
            </div>
        </ThemeProvider>
    )
}