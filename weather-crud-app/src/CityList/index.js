import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function CityList(props){
    console.log(props)
    const { cities } = props

    const citiesList = cities && cities.map((city) => {
        return (
            <Card key={city.id}>
                <Card.Content>
                    <Card.Header>{city.name}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteCity(city.id)}>Delete City</Button>
                    <Button onClick={() => props.editCity(city.id)}>Edit City</Button>
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

export default CityList