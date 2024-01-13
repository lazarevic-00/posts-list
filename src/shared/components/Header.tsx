import React from 'react';
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useLocation, useNavigate} from 'react-router-dom';
import {usePostPaginationContext} from '../../utils/context/PostPaginationContext';
import {users} from '../../utils/data/users';
import {routes} from '../../utils/routes/routes';
import ImageHandler from './ImageHandler';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {changeFilterHandler, pagination} = usePostPaginationContext();
    const showSearchFilter = pathname === '/';
    const handleSelectUser = (userId: number | null) => {
        changeFilterHandler('userId', userId)
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <ImageHandler
                        alt="Bootstrap logo"
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

                {showSearchFilter && (
                    <>
                        <select
                            onChange={(e) => handleSelectUser(Number(e.target.value))}
                            value={pagination?.userId || ''}
                            className="form-select w-25"
                        >
                            <option hidden>Filter by user name</option>
                            {users?.map(({id, name}) => (
                                <option value={id} key={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        {!!pagination?.userId && (
                            <Button
                                size="sm"
                                onClick={() => {
                                    handleSelectUser(null);
                                }}
                                className="ms-2"
                                variant="outline-primary text-uppercase"
                            >
                                Clear
                            </Button>
                        )}
                    </>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
