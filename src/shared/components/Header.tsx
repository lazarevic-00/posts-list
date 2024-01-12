import React from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useLocation, useNavigate} from 'react-router-dom';
import {routes} from '../../utils/routes/routes';
import {SearchIcon} from './Icons';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const showSearchFilter = pathname === '/';

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img
                        alt="Bootstrap logo"
                        loading="lazy"
                        onClick={() => navigate('/')}
                        src="https://react-bootstrap.netlify.app/img/logo.svg"
                        className="header-logo "/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {routes
                            ?.filter(route => route?.isShownInHeader)
                            ?.map(({path, id, name}) => {
                                return (
                                    <Nav.Link key={id}
                                              className={pathname === path ? 'active' : ''}
                                              onClick={() => navigate(path)}>
                                        {name}
                                    </Nav.Link>
                                )
                            })}
                    </Nav>
                </Navbar.Collapse>

                {showSearchFilter && <InputGroup className="w-25">
                    <InputGroup.Text id="serach-icon">
                        <SearchIcon/>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search by name"
                        onChange={(event) => {
                            console.log('aaa')
                        }}
                    />
                </InputGroup>}
            </Container>
        </Navbar>
    );
};

export default Header;
