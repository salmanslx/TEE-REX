import React, { useEffect, useState } from 'react'
import {Col,Row,Card,Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToWishlist } from '../redux/slice/wishlistSlice'
import { addToCart } from '../redux/slice/cartSlice'
import axios from 'axios'

function Home({searchItem}) {
  const [data,setData] = useState([])

  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data)
      }catch(err){
        console.log(err);
      }
    }
    fetchData()
  },[])

  const [filteredData, setFilteredData] = useState([]);
  
  function filterProducts(searchItem) {

    const filtered = data.filter(product =>
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredData(filtered);
    
  }
  
  useEffect(() => {
    filterProducts(searchItem);
  }, [searchItem]);

  return (
    
   <>
      {
        searchItem ? <Row className="ms-5 pe-5 " style={{marginTop:'100px'}}>
        {
          filteredData?.length>0?filteredData?.map((product,index)=>(
          <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
        <Card className='shadow text-dark p-3 bg-light ' style={{ width: '18rem', height:'29rem' }}>
        <Card.Img height={'200px'} variant="top" src={product?.image} />
        <Card.Body className='overflow-y-hidden'>
          <Card.Title>{product?.title.slice(0,20)}..</Card.Title>
          <Card.Text>
            <p>{product?.description.slice(0,40)}...</p>
            <h5>$ {product?.price}</h5>
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button onClick={()=>dispatch(addToWishlist(product))} className='btn btn-light'><i class="fa-regular fa-heart"></i>
            </Button>
            <Button onClick={()=>dispatch(addToCart(product))} className='btn btn-light'><i class="fa-solid fa-cart-shopping"></i>
            </Button>
            </div>
        </Card.Body>
      </Card>
        </Col>
          )):<p className='text-danger fw-bolder fs-4'>Nothing to Display!!!</p>
        }
        </Row> :
        <Row className="ms-5 pe-5 " style={{marginTop:'100px'}}>
      {
        data?.length>0?data?.map((product,index)=>(
        <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
      <Card className='shadow text-dark p-3 bg-light ' style={{ width: '18rem', height:'29rem' }}>
      <Card.Img height={'200px'} variant="top" src={product?.image} />
      <Card.Body className='overflow-y-hidden'>
        <Card.Title>{product?.title.slice(0,20)}..</Card.Title>
        <Card.Text>
          <p>{product?.description.slice(0,40)}...</p>
          <h5>$ {product?.price}</h5>
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button onClick={()=>dispatch(addToWishlist(product))} className='btn btn-light'><i class="fa-regular fa-heart"></i>
          </Button>
          <Button onClick={()=>dispatch(addToCart(product))} className='btn btn-light'><i class="fa-solid fa-cart-shopping"></i>
          </Button>
          </div>
      </Card.Body>
    </Card>
      </Col>
        )):<p className='text-danger fw-bolder fs-4'>Nothing to Display!!!</p>
      }
      </Row>
      }
   </>
   
  )
}

export default Home