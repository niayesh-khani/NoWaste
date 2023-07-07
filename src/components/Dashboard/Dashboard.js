import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, createTheme, Divider, FormControl, Grid, Icon, IconButton, Tooltip , InputAdornment, MenuItem, TextField, ThemeProvider, Typography, withStyles } from "@material-ui/core";
import '../../pages/EditProfile.css';
import HeaderCustomer from '../HeaderCustomer';
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
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import CommentIcon from '@mui/icons-material/Comment';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

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
function createData(name, order, price, date, status, restaurant_id, order_id) {
    return {
        name,
        order,
        price,
        date,
        status,
        restaurant_id,
        order_id
    };
}  
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
    const [value, setValue] = React.useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const [rows, setRows] = useState([]);
    const rowsWithIndex = rows.map((row, index) => ({ ...row, index }));
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const ordersToShow = rowsWithIndex.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(rowsWithIndex.length / ordersPerPage);

    //sorting
    const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
    const handleSort = (field) => {
        const newSortConfig = { field, direction: 'asc' };
        // If the same column is clicked again, toggle the sort direction
        if (sortConfig.field === field && sortConfig.direction === 'asc') {
            newSortConfig.direction = 'desc';
        }
        setSortConfig(newSortConfig);
    };
    // Sort the data based on the sortConfig state
    const sortedData = useMemo(() => {
        if (sortConfig.field) {
            const compareFunction = (a, b) => {
                if (a[sortConfig.field] < b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.field] > b[sortConfig.field]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            };
            return ordersToShow.sort(compareFunction);
            }
            return ordersToShow;
        }, [sortConfig, ordersToShow]);

    function getRandomColor() {
        const colors = ['#FFA600', '#fff2bf', '#ffe480', '#a2332a' , '#E74C3C' , '#690000' , '#595959', '#3e3e3e' , '#C6C6C6', '#ABABAB', '#B9B9B9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    // console.log("$$$$$$$$$$$$$$$$$",favoriteRestaurant);

    // useEffect(() => {
    //     axios.get(
    //         `http://5.34.195.16/restaurant/customer/${id}/orderview/`,
    //         {headers :{
    //             'Content-Type' : 'application/json',
    //             "Access-Control-Allow-Origin" : "*",
    //             "Access-Control-Allow-Methods" : "GET,PATCH",
    //             'Authorization' : "Token " + token.slice(1,-1)
    //         }}
    //     )
    //     .then((response) => {
    //         // console.log(response.data);
    //         setOrderHistory(response.data);
    //         console.log("order got sus");
    //     })
    //     .catch((error) => console.log(error));
    // }, []);
    // useEffect(() => {
    //     // console.log("order history ios " + orderHistory.length);
    //     if(orderHistory){
    //         for (let i = 0; i < orderHistory.length; i++) {
    //             // const element = array[i];
    //             console.log(orderHistory[i]);


    //             let restaurant_name = orderHistory[i].restaurantDetails.name;
    //             // setOrderid(orderHistory[i].orderDetails.id);
    //             // setRestaurantOrderId(orderHistory[i].restaurantDetails.id);
    //             let order = "";
    //             for(let j=0; j < orderHistory[i].orderDetails.orderItems.length; j++){
    //                 order += orderHistory[i].orderDetails.orderItems[j].quantity + "×" + orderHistory[i].orderDetails.orderItems[j].name_and_price.name;
    //                 if(j!= orderHistory[i].orderDetails.orderItems.length-1){
    //                     order += ", ";
    //                 }
    //             }
    //             let price = orderHistory[i].orderDetails.Subtotal_Grandtotal_discount[1];
    //             const date = new Date(orderHistory[i].created_at);
    //             let formatted_date = date.toISOString().split('T')[0];
    //             let status = orderHistory[i].status;
    //             let restaurant_id = orderHistory[i].restaurantDetails.id;
    //             let order_id = orderHistory[i].orderDetails.id;
    //             const new_row = createData(restaurant_name, order, price, formatted_date, status, restaurant_id, order_id)
    //             rows = [...rows, new_row];                
    //         }
    //     }

    // }, [orderHistory]);
    //chaatGPT
    useEffect(() => {
        axios
        .get(`http://5.34.195.16/restaurant/customer/${id}/orderview/`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PATCH',
                Authorization: 'Token ' + token.slice(1, -1),
            },
        })
        .then((response) => {
        setOrderHistory(response.data);
        console.log('order got successfully');
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        // ...
        if (orderHistory) {
            if (orderHistory) {
                const newRows = orderHistory.map((order) => {
                const restaurant_name = order.restaurantDetails.name;
                let orderText = order.orderDetails.orderItems
                    .map((item) => `${item.quantity}×${item.name_and_price.name}`)
                    .join(', ');
                const price = order.orderDetails.Subtotal_Grandtotal_discount[1];
                const date = new Date(order.created_at).toISOString().split('T')[0];
                const status = order.status;
                const restaurant_id = order.restaurantDetails.id;
                const order_id = order.orderDetails.id;
                return createData(
                    restaurant_name,
                    orderText,
                    price,
                    date,
                    status,
                    restaurant_id,
                    order_id
                );
                });
                setRows(newRows);
            }
        }
    }, [orderHistory]);

    const getRowColor = (status) => {
        if(status === "Completed") {
            return "rgba(65, 156, 86, 0.5)";
        } else if(status === "InProgress") {
            return "rgba(242, 223, 51, 0.4)";
        } else if(status === "notOrdered") {
            return "rgba(245, 132, 12, 0.4)"
        } else if(status === "Cancled"){
            return "rgba(176, 173, 169, 0.5)";
        } 
    };

    const showCancelIcon = (status) => {
        return status === 'notOrdered';
    }

    const handleShowFavoriteRestaurant = (id) => {
        history.push("./restaurant-view/"+ id);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [restaurantId, setRestaurantId] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const handleRowClick = (row) => {
        if (row.status === 'Completed') {
            setRestaurantId(row.restaurant_id);
            setRestaurantName(row.name);
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
    const handleAddtext = (e) => {
        setText(e.target.value);
        console.log(text);
    }
    // const handleAdd = (e) => {
    //     e.preventDefault();
    //     const userData = {
    //         text:text
    //     }
    //     axios.post(`http://5.34.195.16/restaurant/comment/user_id/${id}/restaurant_id/${restaurantId}`, userData, {headers:{"Content-Type" : "application/json" , 'Authorization' : "Token " + token.slice(1,-1)}})
    //     .then((response) => {
    //         console.log(response);
    //         window.location.reload(false);
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //             console.log(error.response);
    //         } 
    //     });    
    // }
    
    const handleAdd = (e) => {
        e.preventDefault();
        const userDataComment = {
            text: text
        };
        const userDataRate={
            rate: value,
            name: restaurantName
        };
        const commentPromise = axios.post(
            `http://5.34.195.16/restaurant/comment/user_id/${id}/restaurant_id/${restaurantId}/`,
            userDataComment,
            {
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token.slice(1, -1)}`
                }
            }
        );

        const ratingPromise = axios.post(
            `http://5.34.195.16/user/rate-restaurant/`,
            userDataRate,
            {
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token.slice(1, -1)}`
                }
            }
        );

        Promise.all([commentPromise, ratingPromise])
            .then((responses) => {
                const commentResponse = responses[0];
                const ratingResponse = responses[1];
                console.log("comment",commentResponse);
                console.log("rating",ratingResponse);
                window.location.reload(false);
                })
                .catch((error) => {
                    if (error.response) {
                    console.log(error.response);
                    }
                });
    };

    const handleStatus = (status) => {
        if(status === "InProgress")
            return "In progress";
        else if(status === "notOrdered")
            return "Not ordered";
        return status;
    }

    const handleCancleOrdering = (Oid, Rid) => {
        const userData = {
            status:"Cancled"
        }
        axios.put(`http://5.34.195.16/restaurant/restaurant_view/${Rid}/${id}/order/${Oid}/`, userData,
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
                <HeaderCustomer />
                <Grid container spacing={2} className="dashboard-grid">
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Box className="dashboard-box" id="favorite-restaurants-box">
                            <Typography
                                variant="h5" 
                                color="textPrimary"
                                gutterBottom
                                className="dashboard-title-manager"
                            >
                                Favorite Restaurants
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
                                Order History
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell onClick={() => handleSort('name')}>
                                            Restaurant name
                                            {sortConfig.field === 'name' && (
                                                <>
                                                {sortConfig.direction === 'asc' ? (
                                                    <KeyboardArrowUp style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                                ) : (
                                                    <KeyboardArrowDown style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                                )}
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell align="left" >
                                            Order
                                        </TableCell>
                                        <TableCell align="left" onClick={() => handleSort('price')}>
                                            Price
                                            {sortConfig.field === 'price' && (
                                            <>
                                            {sortConfig.direction === 'asc' ? (
                                                <KeyboardArrowUp style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                            ) : (
                                                <KeyboardArrowDown style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                            )}
                                            </>
                                        )}
                                        </TableCell>
                                        <TableCell align="left">
                                            Date
                                        </TableCell>
                                        <TableCell align="left" onClick={() => handleSort('status')}>
                                            Status
                                            {sortConfig.field === 'status' && (
                                            <>
                                            {sortConfig.direction === 'asc' ? (
                                                <KeyboardArrowUp style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                            ) : (
                                                <KeyboardArrowDown style={{ fontSize: '16px', verticalAlign: 'middle' }} />
                                            )}
                                            </>
                                        )}
                                        </TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {sortedData.map((row) => (
                                        <TableRow key={row.order_id}
                                            // sx={{ cursor: row.status === 'Completed' ? 'pointer' : 'default',}}
                                            tabIndex={-1}
                                            style={{backgroundColor: getRowColor(row.status)}}
                                            // onClick={() => handleRowClick(row)}
                                        >
                                            <TableCell component="th" scope="row">
                                            {row.name}
                                            </TableCell>
                                            <TableCell align="left">{row.order}</TableCell>
                                            <TableCell align="left">{row.price}</TableCell>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="left">
                                                {handleStatus(row.status)}
                                                {showCancelIcon(row.status) && 
                                                    <IconButton onClick={() => handleCancleOrdering(row.order_id, row.restaurant_id)} title="Cancel order">
                                                        <ClearIcon style={{color:'red'}}/>
                                                    </IconButton>
                                                }
                                                {row.status === 'Completed' && (
                                                <Tooltip title="Add Comment">
                                                <IconButton onClick={(e) => {
                                                    // e.stopPropagation(); // Prevent the row click event from triggering
                                                    handleRowClick(row);
                                                }}>
                                                    <CommentIcon />
                                                </IconButton>
                                                </Tooltip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {/* Pagination controls */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Pagination count={totalPages} page={currentPage} onChange={(event, page) => setCurrentPage(page)} shape="rounded"/>
                                </div>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
                <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    
                    <Box sx={style} className="dashboard-comment-box">
                    <h2 className='dashboard-title-show-comments'>Add Comment And Rate</h2>
                    <Rating
                        name="simple-controlled"
                        precision={0.5}
                        value={value}
                        className='dashboard-rate'
                        size="large"
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    />
                    {/* <Rating name="read-only" value={2.5} precision={0.5} readOnly /> */}
                    <textarea className='dashboard-textarea' onChange={handleAddtext}></textarea>
                    <Stack direction="row" >
                        <Button onClick={() => setIsModalOpen(false)} variant="contained" className='dashboard-btn-close'>
                            Close
                        </Button>
                        <Button variant="contained" className='dashboard-btn-submit' onClick={handleAdd}>
                            Submit
                        </Button>
                    </Stack>
                    </Box>
                </Modal>
                <Footer />
            </div>
        </ThemeProvider>
    )
}