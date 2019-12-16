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
import { getCustomerData } from '../../../store/reducers/applicationReducer';
class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            listArray : [],
            
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
        const hotListArray = [];
        const canListArray = [];
        const soonListArray = [];

        listArray.map(value =>{
            if (value.hot_inweek_product === "1") {
                hotListArray.push(value);
              }else{
                console.log('Khong them')
              }
        });
        listArray.map(value =>{
            if(this.props.customerData){
                if(parseInt(value.point_needed_product) <= parseInt(this.props.customerData.point_customer)){
                    canListArray.push(value)
                }else{
                    console.log('aaa')
                }
           }else{
               console.log('Khong them')
           }
        });
        listArray.map(value =>{
            if(this.props.customerData){
                var point_soon_product = parseInt(this.props.customerData.point_customer) * 80/100; 
                if((parseInt(value.point_needed_product) > parseInt(this.props.customerData.point_customer))&&(point_soon_product <= parseInt(this.props.customerData.point_customer) )){
                    soonListArray.push(value)
                 }else{
                     console.log('aaa')
                 }
            }else{
                console.log('Khong them')
            }
        });
        
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
                                    <HotProduct listArray={hotListArray} />
                                    <CanProduct listArray={canListArray} />
                                    <SoonProduct listArray={soonListArray} />
                            </Route>
               
                           
                   </Switch>
                </div>
            </Layout>
           
        )
    }
}  
export default connect(
    state =>({
        customerData : getCustomerData(state),

    }),{
        getHotProduct
    }
)(HomePage);
