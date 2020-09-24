import React,{Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Header from '../../components/Icons/headers';
import Navbar from '../../components/Navbar/Navbar';
class Layout extends Component{

    render(){
          return <Aux>
              <Header />
              <Navbar />
              {this.props.children}
          </Aux>
    }
}
export default Layout;