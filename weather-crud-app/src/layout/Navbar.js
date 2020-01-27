import React, { Commponent, Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Menu } from 'semaintic-ui-react';

class HeaderComponent extends Component {
    logoutHandler = () => {
        this.props.logout()
    }

    render() {
        return (
            <Header>
                <Menu fixed='top' ineverted>
                    <Container>
                        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
                        <Menu.Item><Link to= '/cities'>Show All Cities</Link></Menu.Item>
                        {
                            this.props.loggedIn
                            ?
                            <Menu.Item>
                                <Link to='/' onClick={this.logoutHandler}>Logout</Link>
                            </Menu.Item>
                            :
                            null
                    }
                    {
                        this.props.loggedIn
                        ?
                        <Menu.Item position='right'>

                            {this.props.loggedInUserEmail}
                        </Menu.Item>
                        :
                        null
                }
                    </Container>
                </Menu>
            </Header>
        )
    }
};

export default HeaderComponent;