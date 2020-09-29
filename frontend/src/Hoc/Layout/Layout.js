import React,{Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
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
              <Navbar Toggle={this.drawerToggle}/>
              {this.props.children}
          </div>
    }
}
export default Layout;