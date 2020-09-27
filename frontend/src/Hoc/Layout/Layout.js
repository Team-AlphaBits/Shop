import React,{Component} from 'react';
import Header from '../../components/Icons/headers';
import Navbar from '../../components/Navbar/Navbar';
import Sidedrawer from '../../components/Sidedrawer/Sidedrawer';
import classes from './Layout.module.css';
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
          return <div className={classes.Layout}>
              <Header />
              <Navbar Toggle={this.drawerToggle}/>
              <Sidedrawer Toggle={this.drawerToggle} show={this.state.showDrawer}/>
              {this.props.children}
          </div>
    }
}
export default Layout;