import React from 'react';
import { Card } from 'semantic-ui-react';

import CityCard from '../CityCard'

function CityList(props) {
    const { cities } = props

    const citiesList = cities && cities.map((city) => {
        return (
            <CityCard city={city} />
        )
    })

    return (
        <Card.Group centered>
            { citiesList }
        </Card.Group>
    )
}

export default CityList