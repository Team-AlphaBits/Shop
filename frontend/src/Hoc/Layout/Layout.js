import React,{Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
class Layout extends Component{
    state = {
        showDrawer: false,
        fixed: false,
        width: window.innerWidth
    }
    drawerToggle = () =>{
        this.setState(prevState =>{
            return {showDrawer: !prevState.showDrawer}
        })
    }
    listenScrollEvent = e => {
        if (window.scrollY > 25) {
          this.setState({fixed: true})
        } else {
          this.setState({fixed: false})
        }
      }
      updateDimensions = () => {
        this.setState({ width: window.innerWidth});
      };
    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
        window.addEventListener('resize', this.updateDimensions);
      }

    render(){
          return <div className={classes.Layout}>
              <SideDrawer show={this.state.showDrawer} Toggle={this.drawerToggle}/>
              <Navbar 
              show={this.state.showDrawer}
              Toggle={this.drawerToggle} 
              fixed={this.state.fixed}
              width={this.state.width}/>
              {this.props.children}
          </div>
    }
}
export default Layout;