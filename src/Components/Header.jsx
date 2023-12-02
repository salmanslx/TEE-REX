import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header({searchItem,setSearchItem}) {
  const wishlist = useSelector((state) => state.wishlistReducer)
  const cart = useSelector((state)=>state.cartReducer)
  return (
    <Navbar expand="lg" className="bg-black position-fixed top-0 w-100 mb-5 z-1">
      <Container>
        <Navbar.Brand><Link to={'/'} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}><i class="fa-brands fa-slack me-2 "></i>TeeRex</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto p-2">

          <form className='me-5 mt-2'>
          <input onChange={e=>setSearchItem(e.target.value)} type="text" className='form-control p-2 me-5'  placeholder='Search here' value={searchItem}/>
          </form>

            <Nav.Link className='border rounded'><Link to={'/wishlist'} className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold',fontSize:'15px' }}><i class="fa-regular fa-heart me-2"></i>Wishlist<Badge className='ms-2 rounded' bg="light">{wishlist?.length}</Badge>
            </Link>
            </Nav.Link>
            <Nav.Link className='border rounded ms-3'><Link to={'/cart'} className='d-flex align-items-center' style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold',fontSize:'15px' }}><i class="fa-solid fa-cart-shopping me-2"></i>Cart<Badge className='ms-2 rounded' bg="light">{cart?.length}</Badge>
            </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header