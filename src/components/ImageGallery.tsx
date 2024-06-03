import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CircularProgress, TextField, CardContent, Typography, Box, IconButton, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Pagination, Button, Tabs, Tab } from '@mui/material';
import { fetchImages } from '@/utility/api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';
import FilterIcon from '@mui/icons-material/Filter';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Image = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

type CartItem = {
  id: number;
  count: number;
};

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [searchType, setSearchType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(1);
  const imagesPerPage = 15;
  const [goToPage, setGoToPage] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(searchTerm, imagesPerPage, currentPage);
        setImages(data.photos);
        setFilteredImages(data.photos);
        setTotalPages(Math.ceil(data.total_results / imagesPerPage));
        setTotalImages(data.total_results);
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [searchTerm, currentPage, imagesPerPage]);

  useEffect(() => {
    setFilteredImages(
      images.filter((image) =>
        image.alt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, images]);


  const handleSearchTypeChange = (event: SelectChangeEvent<string>) => {
    setSearchType(event.target.value as string);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleGoToPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoToPage(event.target.value);
  };

  const handleGoButtonClick = () => {
    const page = parseInt(goToPage, 10);
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const handleAddToCart = (id: number) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[itemIndex].count += 1;
        return newCart;
      } else {
        return [...prevCart, { id, count: 1 }];
      }
    });

    console.log('CART', cart);    
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
        <ImageIcon sx={{ mr: 2 }} />
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={searchType}
            onChange={handleSearchTypeChange}
            label="Type"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="photographer">Photographer</MenuItem>
            <MenuItem value="color">Color</MenuItem>
            <MenuItem value="orientation">Orientation</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search Images"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <IconButton sx={{ ml: 2 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="secondary" >
        <Tab label="All" />
        <Tab label="Creative" />
        <Tab label="Editorial" />
      </Tabs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{searchTerm} Stock Photos and Images ({totalImages})</Typography>
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <TextField
              label="Go to"
              variant="outlined"
              size="small"
              value={goToPage}
              onChange={handleGoToPageChange}
              sx={{ width: 100, mr: 1 }}
            />
            <IconButton onClick={handleGoButtonClick} >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {filteredImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height='220px'
                width={image.width}
                image={image.url}
                alt={image.alt}
                sx={{ objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': {
                    opacity: 0.7,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="body2">
                    ID: {image.id}
                  </Typography>
                  <Typography variant="body2">
                    Photographer: {image.photographer}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <IconButton href={image.src.original} target="_blank" download>
                      <DownloadIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton onClick={() => handleAddToCart(image.id)}>
                      <ShoppingCartIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton>
                      <AddCircleOutlineIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton>
                      <FilterIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Search results for {searchTerm} in stock photos and images ({totalImages})</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <TextField
            label="Go to"
            variant="outlined"
            size="small"
            value={goToPage}
            onChange={handleGoToPageChange}
            sx={{ width: 100, mr: 1 }}
          />
          <Button variant="outlined" color='inherit' onClick={handleGoButtonClick}>
            Go
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImageGallery;
