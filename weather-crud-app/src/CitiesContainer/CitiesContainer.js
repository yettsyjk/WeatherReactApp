import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';



import CreateCity from '';
import CityList from '';
import EditCityModal from '';


class CitiesContainer extends Component {
    state = {
        cities: [],
        createModalOpen: false,
        editModalOpen: false,
        cityToEdit: {
            name: '',
            weather: '',
            forecast: ''
        }
    }
//create a City 
    createCity = () => {
        this.setState({
            createModalOpen: true
        })
    }
//addCity fetch request requires an async function to reduce timeout
    addCity = async (e, cityFromTheForm) => {
        //prevent default prevents browser from refreshing every time
        e.preventDefault();
//try catch 
        try{
            const createdCityResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cities/`, {
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
        }, () => {
            this.createCityFormRef.current.clearForm();
        })
    }

    componentDidMount() {
        this.getCities();
    }

    getCities = async () => {
        try{
            const cities = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cities/`, { credentials: 'include' });
            const parsedCities = await cities.json();

            this.setState({
                cities: parsedCities.data
            })

        }catch (err){
            console.log(err);
        }
    }
    //editCity
    editCity = (idOfCityToEdit) => {
        const cityToEdit = this.state.cities.find(city => city.id === idOfCityToEdit)
        this.setState({
            editModalOpen: true,
            cityToEdit: {
                ...cityToEdit
            }
        })
    } 

    //handleEditChange
    handleEditChange = (event) => {
        this.setState({
            cityToEdit: {
                ...this.state.cityToEdit,
                [event.target.name]: event.target.value
            }
        })
    }
    //update City
    updateCity = async (e) => {
        e.preventDefault()

        try{
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cities/${this.state.cityToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.cityToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const updateResponseParsed = await updateResponse.json()

            const newCityArrayWithUpdate = this.state.cities.map((city) => {
                if(city.id === updateResponseParsed.data.id) {
                    city = updateResponseParsed.data
                }
                return city
            })

            this.setState({
                cities: newCityArrayWithUpdate
            })

            this.closeEditModal()

        }catch (err){
            console.log(err);
        }
    }

    closeEditModal = () => {
        this.setState({
            editModalOpen: false
        })
    }

    deleteCity = async (id) => {
        const deleteCityResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cities/${id}`, {
            method: 'DELETE',
            credentials: 'include'
    });

        const deleteCityParsed = await deleteCityResponse.json();

        this.setState({
            cities: this.state.city.filter((city) => city.id !== id)
        })
    }

//GRID requires styling 
    render() {
        const { loggedIn } = this.props 
        return (
            <div>
                { loggedIn ?
                    <Grid>
                        <Grid.Row>
                            <Button onClick={this.createCity}>Create New City</Button>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <CitiesList
                                    cities={this.state.cities}
                                    deleteCity={this.deleteCity}
                                    editCity={this.editCity}
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
                        <Grid>You must be logged in to see the Cities.</Grid>
                }
            </div>
        )
    }
}

export default CitiesContainer;