import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { CircularProgress, Alert } from '@mui/material'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from "../../components/Typography/Typography";
import usePagination from "../../hooks/usePagination";
import MyPaginator from "../../components/Pagination/MyPaginator";
import SearchBar from "../../components/SearchBar/SearchBar";
import CatalogItem from "../../components/CatalogItem/CatalogItem";
import withRoot from "../../withRoot";

const ITEMS_PER_PAGE = 6;

const Catalog = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const getCars = () => {
        return fetch('https://localhost:7016/api/Car')
            .then(res => res.json())
            .catch(() => {
                toast.error("Something went wrong!")
                navigate('/error');
            });
    }

    const {
        data: cars,
        isError,
        isLoading,
        isFetching
    } = useQuery(['getCarsKey'], getCars, {
        retry: false,
        onError: () => toast.error('Something went wrong!', { autoClose: 1000 }),
        refetchOnWindowFocus: false,
    })

    const filterData = (query, cars) => {
        if (!query) {
            return cars;
        } else {
            return cars.map(c => c).filter((d) => d.make.toLowerCase().includes(query) || d.model.toLowerCase().includes(query)
                || d.categoryName.toLowerCase().includes(query));
        }
    };

    const dataFiltered = filterData(searchQuery, cars);


    const {
        currentPage, getCurrentData, changePage, pageCount,
    } = usePagination(dataFiltered, ITEMS_PER_PAGE);

    const onPageChange = (event, value) => changePage(value);

    const newCars = getCurrentData();

    return (
        <Box
            component="section"
            sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
        >
            <Container
                sx={{
                    mt: 5,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src="/static/themes/onepirate/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: -180,
                        opacity: 0.7,
                    }}
                />
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 6 }}>
                    Catalog
                </Typography>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                < div >
                    <Grid container spacing={5}>
                        {(isLoading || isFetching) && <CircularProgress />}
                        {isError && <Alert severity="error">This is an error alert — check it out!</Alert>}
                        {!isLoading && !isFetching && !isError && cars && cars.length > 0
                            ? newCars.map(x => <CatalogItem key={x.id} car={x} />)
                            : <h3 className="no-articles">No cars yet</h3>
                        }
                    </Grid>
                </div >
                <MyPaginator
                    itemCount={cars ? cars.length : 0}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={onPageChange}
                    currentPage={currentPage}
                    pageCount={pageCount}
                />
            </Container>
        </Box >
    );
};

export default withRoot(Catalog);

