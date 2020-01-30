import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

import { openWeatherApiKey } from '../keys/keys'

class CityShow extends Component {

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

    componentDidMount() {
        const { cityName } = this.props.match.params
        this.getWeather(cityName)

    }

    render() {
        // console.log(this.props.match.params.cityName)
        const { weather } = this.state
        const { cityName } = this.props.match.params

        return (

            // <Card key={this.props.city.id}>
            //     <Card.Content>
            //         <Card.Header>{weather.name}</Card.Header>
            //     </Card.Content>
            //     <Card.Content>
            //         <Card.Description>{weather && weather.weather[0].description}</Card.Description>
            //     </Card.Content>
            //     <Card.Content>
            //         <Card.Description>{weather && weather.main.temp}</Card.Description>
            //     </Card.Content>
            //     <Card.Content extra>
            //         <Button onClick={() => this.props.deleteCity(this.props.city.id)}>Delete City</Button>
            //         <Button onClick={() => this.props.editCity(this.props.city.id)}>Edit City</Button>
            //     </Card.Content>
            // </Card>

            <Grid
                textAlign='center'
                style={{ marginTop: '7em', height: '100%' }}
                verticalAlign='top'
                stackable
            >
                <Grid.Row>
                    {cityName}
                </Grid.Row>
            </Grid>
        )
    }
}

export default CityShow