import React, { Component } from 'react';
import CreateCity from '../CreateCityForm';
import CityList from '../CityList';
import EditCityModal from '../EditCityModal';
import { Grid, Button } from 'semantic-ui-react';


class CityContainer extends Component {
    state = {
        cities: [],
        createModalOpen: false,
        editModalOpen: false,
        cityToEdit: {
            name: '',
            id: '',
        },
        weather: []
    }

    createCity = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addCity = async (e, cityFromTheForm) => {
        e.preventDefault();

        try {
            const createdCityResponse = await fetch(`http://localhost:8000/api/v1/cities/`, {
                method: 'POST',
                body: JSON.stringify(cityFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdCityResponse.json();

            this.setState({
                cities: [...this.state.cities, parsedResponse.data]
            })

            this.closeCreateModal()

        } catch (err) {
            console.log('error: ', err)
        }
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    componentDidMount() {
        this.getCities();
        // this.getWeather();
    }

    handleShow = () => {
        this.props.history.push(`/cities/${this.state.cities.name}`)
        console.log(this.state.cities)

    }



    getCities = async () => {
        try {
            const cities = await fetch(`http://localhost:8000/api/v1/cities/`, { credentials: 'include' });
            const parsedCities = await cities.json();

            this.setState({
                cities: parsedCities.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    editCity = (idOfCityToEdit) => {
        const cityToEdit = this.state.cities.find(city => city.id === idOfCityToEdit)
        this.setState({
            editModalOpen: true,
            cityToEdit: {
                ...cityToEdit
            }
        })
    }

    handleEditChange = (e) => {
        this.setState({
            cityToEdit: {
                ...this.state.cityToEdit,
                [e.target.name]: e.target.value
            }
        })
    }



    updateCity = async (e) => {
        e.preventDefault()

        try {
            const updateResponse = await fetch(`http://localhost:8000/api/v1/cities/${this.state.cityToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.cityToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const updateResponseParsed = await updateResponse.json()

            const newCityArrayWithUpdate = this.state.cities.map((city) => {
                if (city.id === updateResponseParsed.data.id) {
                    city = updateResponseParsed.data
                }
                return city
            })
            this.setState({
                cities: newCityArrayWithUpdate
            })
            this.closeEditModal()
            // this.props.history.push('/')
            // this.props.history.push('/cities')
        } catch (err) {
            console.log(err)
        }
    }

    closeEditModal = () => {
        this.setState({
            editModalOpen: false
        })
    }

    deleteCity = async (id) => {
        console.log(id)
        const deleteCityResponse = await fetch(`http://localhost:8000/api/v1/cities/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => {
            this.props.history.push('/')
            this.props.history.push('/cities')
            // const newCityArray = this.state.cities.filter((city) => {
            //     if (city.id !== id) {
            //         return city
            //     }
            // })
            // this.setState({
            //     cities: newCityArray
            // })
        })
    }


    render() {
        const { loggedIn } = this.props
        return (
            <div>
                {loggedIn
                    ?
                    <Grid
                        textAlign='center'
                        style={{ marginTop: '7em', height: '100%' }}
                        verticalAlign='top'
                        stackable
                    >
                        <Grid.Row>
                            <Button onClick={this.createCity}>Create New City</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <CityList
                                    history={this.props.history}
                                    location={this.props.location}
                                    match={this.props.match}
                                    cities={this.state.cities}
                                    deleteCity={this.deleteCity}
                                    editCity={this.editCity}
                                    handleShow={this.handleShow}
                                />
                            </Grid.Column>
                            <CreateCity
                                open={this.state.createModalOpen}
                                closeModal={this.closeCreateModal}
                                addCity={this.addCity}
                                ref={this.createCityFormRef}
                            />
                            <EditCityModal
                                open={this.state.editModalOpen}
                                updateCity={this.updateCity}
                                cityToEdit={this.state.cityToEdit}
                                closeModal={this.closeEditModal}
                                handleEditChange={this.handleEditChange}
                            />
                        </Grid.Row>
                    </Grid>
                    :
                    <Grid
                        textAlign='center'
                        style={{ marginTop: '7em', height: '100%' }}
                        verticalAlign='top'
                        stackable
                    >
                        You must be logged in.
                </Grid>
                }
            </div>
        )
    }
}

export default CityContainer