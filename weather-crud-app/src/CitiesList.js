import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function CitiesList(props){
    console.log(props)
    const { cities } = props
    
    const citiesList = cities && cities.map((city) => {
        return (
            <Card key={city.id}>
            <Card.Content>
                <Card.Header>{city.name}</Card.Header>
                <Card.Description>{city.weather}</Card.Description>
                <Card.Description>{city.forecast}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => props.deleteCity(city.id)}>Remove City</Button>
                <Button onClick={() => props.EditCity(city.id)}>Edit City</Button>
            </Card.Content>
            </Card>
        )
    })

    return (
        <Card.Group centered>
            { citiesList }
        </Card.Group>
    )
}

export default CitiesList