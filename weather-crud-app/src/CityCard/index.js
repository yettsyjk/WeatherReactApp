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
        
        return (

            <Card key={this.props.city.id} >
                <Card.Content>
                    <Card.Header onClick={this.handleShow}>{weather.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Description>{weather && weather.weather[0].description}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Description>{weather && weather.main.temp}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => this.props.deleteCity(this.props.city.id)}>Delete City</Button>
                    <Button onClick={() => this.props.editCity(this.props.city.id)}>Edit City</Button>
                </Card.Content>
            </Card>
        )
    }
}

export default CityCard