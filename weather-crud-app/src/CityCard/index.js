import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import { openWeatherApiKey } from '../keys/keys'

class CityCard extends Component {

    state = {
        weather: {}
    }

    getWeather = async (city) => {
        try {
            // const weather = await fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${openWeatherApiKey}`)
            const weather = await fetch(`api.openweathermap.org/data/2.5/weather?q=Denver&APPID=4508de08d69248f8cb43784c358ac579`)
            const weatherJson = await weather.json();

            console.log(weatherJson)
            this.setState({
                weather: weatherJson
            })
        } catch (err) {
            return err
        }
    }

    componentDidMount() {
        this.getWeather()
        console.log('test')
    }

    render() {
        return (
            // <Card key={city.id}>
            //     <Card.Content>
            //         <Card.Header>{city.name}</Card.Header>
            //     </Card.Content>
            //     <Card.Content extra>
            //         <Button onClick={() => props.deleteCity(city.id)}>Delete City</Button>
            //         <Button onClick={() => props.editCity(city.id)}>Edit City</Button>
            //     </Card.Content>
            // </Card>
            <Card key={'1'}>
            <Card.Content>
                <Card.Header>name goes here</Card.Header>
            </Card.Content>
            <Card.Content extra>
                {/* <Button onClick={() => props.deleteCity(city.id)}>Delete City</Button>
                <Button onClick={() => props.editCity(city.id)}>Edit City</Button> */}
                buttons go here
            </Card.Content>
        </Card>
        )
    }
}

export default CityCard