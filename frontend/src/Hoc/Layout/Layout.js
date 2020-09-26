import React,{Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Header from '../../components/Icons/headers';
import Navbar from '../../components/Navbar/Navbar';
import Sidedrawer from '../../components/Sidedrawer/Sidedrawer';
class Layout extends Component{
    state = {
        showDrawer: false
    }
    drawerToggle = () =>{
        this.setState(prevState =>{
            return {showDrawer: !prevState.showDrawer}
        })
    }
    render(){
          return <Aux>
              <Header />
              <Navbar Toggle={this.drawerToggle}/>
              <Sidedrawer Toggle={this.drawerToggle} show={this.state.showDrawer}/>
              {this.props.children}
          </Aux>
    }
}
export default Layout;