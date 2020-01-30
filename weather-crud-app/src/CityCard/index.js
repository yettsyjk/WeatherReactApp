import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import { openWeatherApiKey } from '../keys/keys'

class CityCard extends Component {

    state = {
        weather: false
    }

    getWeather = async (city) => {
        try {
            const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${openWeatherApiKey}&units=imperial`)
            const weatherJson = await weather.json();

            console.log(weatherJson)
            this.setState({
                weather: weatherJson
            })
        } catch (err) {
            return err
        }
    }

    handleShow = () => {
        const { name } = this.props.city
        this.props.history.push(`/cities/${name}`)
    }

    componentDidMount() {
        console.log(this.props)
        this.getWeather(this.props.city.name)
    }



    render() {
        const { weather } = this.state

        if (weather) {
            let shadowColor = ''
            let color = ''
            if (weather.main.temp >= 70) {
                color = 'hot';
                shadowColor = 'shadow-color-hot'
            } else if (weather.main.temp >= 50 && weather.main.temp < 70) {
                color = 'warm';
                shadowColor = 'shadow-color-warm'
            } else if (weather.main.temp >= 30 && weather.main.temp < 50) {
                color = 'cold';
                shadowColor = 'shadow-color-cold'
            } else {
                color = 'coldAf'
                shadowColor = 'shadow-color-coldAf'
            }

            return (

                <Card className={shadowColor} key={this.props.city.id} >
                    <Card.Content>
                        <Card.Header className={color} onClick={this.handleShow}>{weather.name}</Card.Header>
                    </Card.Content>
                    {weather.weather ?
                        <React.Fragment>
                            <Card.Content>
                                <Card.Description>{weather.weather[0].description}</Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>Current Temp: {weather.main.temp}</Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>Low Temp : {weather.main.temp_min} F </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description> High Temp: {weather.main.temp_max} F</Card.Description>
                            </Card.Content>


                        </React.Fragment>
                        :
                        <Card.Content>
                            <Card.Header>That is not a real city</Card.Header>
                        </Card.Content>}
                    <Card.Content extra>
                        <Button onClick={() => this.props.deleteCity(this.props.city.id)}>Delete City</Button>
                        <Button onClick={() => this.props.editCity(this.props.city.id)}>Edit City</Button>
                    </Card.Content>
                </Card>
            )
        } else {
            return (
                <Card className="card-box-shadow" key={this.props.city.id} >
                    <Card.Content>
                        Loading...
                    </Card.Content>
                </Card>
            )
        }

    }
}

export default CityCard