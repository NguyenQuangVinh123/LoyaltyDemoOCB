import React, { Component } from 'react';
import Footer from '../../components/Client/Header_Footer/Footer/footer.component'
import Header from '../../components/Client/Header_Footer/Header/header.component'
import BeforeFooter from '../../components/Client/Header_Footer/BeforeFooter/BeforeFooter';

class Layout extends Component {
    render() {
        return (
            <div className="container" id='container'>
                <Header />
                <div>
                    {this.props.children}
                </div>
                <BeforeFooter />
                <Footer />
            </div>
        );
    }
}

export default Layout;