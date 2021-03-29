import React from "react"
import "./app.scss"
import Logo from '../images/logo.png'
import LogoSlogan from '../images/logo-slogan.png'
import Home from '../components/home/home'
import Driver from '../components/driverDetails/driver'
import Hamburger from '../images/hamburger.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link
} from 'react-router-dom'

const YEARS = ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']

class App extends React.Component {

    state = { isActive: false }

    showNav = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }


    render() {

        let style = { display: "" }
        if (this.state.isActive) {
            style.display = "block";
        }

        return (
            <Router>
                <div className='container'>
                    <div className='main-header' style={style ? style : null}>
                        <div className='logo'>
                            <div className='logo-image'>
                                <Link to="/"><img src={Logo}></img></Link>
                            </div>
                            <div className='logo-slogan'>
                                <img src={LogoSlogan} />
                            </div>
                        </div>
                        <h2 className='nav-list__name'>Years</h2>
                        <div className='nav'>
                            <ul>
                                {YEARS.map(year => (
                                    year === "2009" ?
                                        <NavLink activeClassName='is-active' onClick={this.showNav} to="/" exact={true}><li>{year}<span className="triangle" ></span></li></NavLink> :
                                        <NavLink activeClassName='is-active' onClick={this.showNav} to={`/${year}`}><li>{year}<span className="triangle" ></span></li></NavLink>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='home-wrapper'>
                        <div className='collapse-header'>
                            <Link to='/'><img src={Logo}></img></Link>
                            <button className='hamburger' onClick={this.showNav} ><img src={Hamburger} /></button>
                        </div>
                        <Switch>
                            {YEARS.map(year => (
                                year === "2009" ?
                                    <Route path="/" exact><Home year={year} /></Route> :
                                    <Route path={`/${year}`} exact><Home year={year} /></Route>
                            ))}
                            {YEARS.map(year => (<Route path={`/${year}/:driverName`} component={Driver} />))}
                        </Switch>
                    </div>
                </div></Router >
        )
    }
}
export default App