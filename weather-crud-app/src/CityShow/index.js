import React, { Component } from 'react';

import { openWeatherApiKey } from '../keys/keys'

class CityShow extends Component {

    state = {
        weather: false
    }

    // getWeather = async (city) => {
    //     try {
    //         const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${openWeatherApiKey}&units=imperial`)
    //         const weatherJson = await weather.json();

    //         console.log(weatherJson)
    //         this.setState({
    //             weather: weatherJson
    //         })
    //     } catch (err) {
    //         return err
    //     }
    // }

    // componentDidMount() {
    //     console.log(this.props)
    //     this.getWeather(this.props.city.name)
      
    // }

    render() {
        console.log(this.props)
        const { weather } = this.state
        
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

            <div>
                <h1> TEsTS </h1>
            </div>
        )
    }
}

export default CityShow