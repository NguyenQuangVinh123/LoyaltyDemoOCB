import React,{Component} from 'react'
import Layout from '../layout';
import HotProduct from '../HotProduct/HotProduct';
import CanProduct from '../CanProduct/CanProduct';
import SoonProduct from '../SoonProduct/SoonProduct';
import {connect} from 'react-redux';
import { getHotProduct} from '../../../store/actions/appilcationActions';
import Contact from '../../../components/Client/Contact/Contact';
import {Switch , Route} from 'react-router-dom';
import TermCondition from '../../../components/Client/TermCondition/TermCondition';
class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            listArray : []
        }
    }
    componentDidMount(){
        
        this.props.getHotProduct && this.props.getHotProduct({
            onSuccess : (response) =>{
                this.setState({
                    listArray : response.data.data
                })
            }
            
        })
    }
    render(){
        const {listArray} = this.state;
        return(
           
           
    
            <Layout>
                 <div className='content' style={{position: "relative"}}>  
                    <Switch>
                            <Route exact path="/about">
                                <Contact />
                            </Route>
                            <Route exact path="/term">
                                <TermCondition />
                            </Route>
                            
                            <Route exact path='/'>
                                    <HotProduct listArray={listArray} />
                                    <CanProduct listArray={listArray} />
                                    <SoonProduct listArray={listArray} />
                            </Route>
               
                           
                   </Switch>
                </div>
            </Layout>
           
        )
    }
}  
export default connect(
    state =>({

    }),{
        getHotProduct
    }
)(HomePage);
