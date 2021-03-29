import React, { useState, useEffect } from 'react'
import "./driver.scss"
import Helmet from '../../images/Helmet.png'
import Avatar from '../../images/avatar.png'
import Flag from '../../images/flag.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from "../home/footer/footer"


const Driver = ({ match }) => {

    const [driver, setDriver] = useState({
        name: "-",
        lName: "-",
        nationality: "-",
        DOB: "-",
        permanentNumber: "-",
        team: "-",
        points: "-",
        position: "-",
        wins: "-"
    })

    let year = match.url.substr(1, 4)
    let position = match.url.slice(-1);
    let name = match.params.driverName.slice(0, -1)

    useEffect(() => {
        axios.get(`http://ergast.com/api/f1/${year}/drivers/${name}/driverStandings.json`)
            .then(response => {
                console.log("response:", response)

                //Getting driver information details from api
                const driver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
                const constructor = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0]
                const points = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points
                const position = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position
                const wins = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins
                const year = driver.dateOfBirth.substr(0, 4)
                const month = driver.dateOfBirth.substr(5, 2)
                const day = driver.dateOfBirth.substr(8, 2)

                const driverDetails = {
                    name: driver.givenName,
                    lName: driver.familyName,
                    nationality: driver.nationality,
                    DOB: `${day}/${month}/${year}`,
                    permanentNumber: driver.permanentNumber,
                    team: constructor.name,
                    points: points,
                    position: position,
                    wins: wins
                }
                // Update state with driver's information
                setDriver(driverDetails)
            })
            .catch(error => {
                console.log('error:', error)
            })
    }, [year])



    return (
        <div className='driver-container'>
            <div className='home-button'>
                <div className='home-button__content'>
                    <Link to={`/${year === "2009" ? "" : year}`}>Back</Link>
                </div>
            </div>
            <div className='driver-details'>
                <div className='driver-details__avatar'>
                    <p className='driver-season'>{year}</p>
                    <p className='driver-stand'>{position === "1" ? 'Champion' : 'Winner'}</p>
                    <div className='driver-avatar'>
                        <img src={Avatar}></img>
                    </div>
                    <div className='driver-info'>
                        <p className='permanent-number'>{driver.permanentNumber}</p><p className='name'>{driver.name + " "}{driver.lName}</p><img src={Flag}></img>
                    </div>
                    <div className='driver-helmet'>
                        <img src={Helmet}></img>
                    </div>
                </div>
                <div className='driver-details__stats'>
                    <div className="stats-name">
                        <ul>
                            <li>Team</li>
                            <li>Country</li>
                            <li>Podiums</li>
                            <li>Points</li>
                            <li>Grand Prix entered</li>
                            <li>World Championships</li>
                            <li>Highest grid finish</li>
                            <li>Highest grid position</li>
                            <li>Date of birth</li>
                            <li>Place of birth</li>
                        </ul>
                    </div>
                    <div className="stats-detail">
                        <ul>
                            <li>{driver.team}</li>
                            <li>{driver.nationality}</li>
                            <li>{driver.wins}</li>
                            <li>{driver.points}</li>
                            <li>-</li>
                            <li>-</li>
                            <li>{driver.position}</li>
                            <li>-</li>
                            <li>{driver.DOB}</li>
                            <li>{driver.nationality}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Driver