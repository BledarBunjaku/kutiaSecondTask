import React, { useState, useEffect } from 'react'
import "./home.scss"
import { Link } from 'react-router-dom'
import axios from "axios"
import Footer from "./footer/footer"

const Home = (props) => {

    const [driverInfo, setDriver] = useState()

    useEffect(() => {
        axios.get(`https://ergast.com/api/f1/${props.year}/driverStandings.json`)
            .then(response => {
                console.log(response)
                const topFour = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 4)
                console.log(topFour)
                setDriver([...topFour])
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.year])


    let drivers
    if (driverInfo) {
        drivers = driverInfo.map(driver => {
            return <>
                <td>{driver.Driver.givenName + " "}{driver.Driver.familyName}</td>
                <td>{driver.Driver.nationality}</td>
                <td>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
            </>
        })
    }


    return (
        <div className='home-container'>
            <div className='champion-wrapper'>
                <section className='champion-section'>
                    <p className='champion-section__year'>{props.year}</p>
                    <p className='champion-section__name'>Champion</p>
                    <div className='champion-section__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='th-name'>Name</th>
                                    <th>Nationallity</th>
                                    <th>Team</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {driverInfo ? drivers[0] : null}
                                </tr>
                            </tbody>
                        </table>
                        <div className='champion-section__details'>
                            {driverInfo ? <Link to={`/${props.year}/${driverInfo[0].Driver.familyName}${driverInfo[0].position}`} >Details</Link> :
                                <Link >Details</Link>}
                        </div>
                    </div>
                </section>
                <section className='winner-section'>
                    <p className='winner-section__name'>Winner</p>
                    <div className='winner-section__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='th-name'>Name</th>
                                    <th>Nationallity</th>
                                    <th>Team</th>
                                    <th>Points</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {driverInfo ? drivers[1] : null}
                                    <td>
                                        <div className='winner-section__details'>
                                            {driverInfo ? <Link to={`/${props.year}/${driverInfo[1].Driver.familyName}${driverInfo[1].position}`} >Details</Link> :
                                                <Link >Details</Link>}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {driverInfo ? drivers[2] : null}
                                    <td>
                                        <div className='winner-section__details'>
                                            {driverInfo ? <Link to={`/${props.year}/${driverInfo[2].Driver.familyName}${driverInfo[2].position}`} >Details</Link> :
                                                <Link >Details</Link>}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    {driverInfo ? drivers[3] : null}
                                    <td>
                                        <div className='winner-section__details'>
                                            {driverInfo ? <Link to={`/${props.year}/${driverInfo[3].Driver.familyName}${driverInfo[3].position}`} >Details</Link> :
                                                <Link >Details</Link>}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <Footer />
        </div>

    )
}
export default Home