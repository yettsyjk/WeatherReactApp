import React, { Component } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';

class CreateCity extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    clearForm = () => {
        this.setState({
            name: ''
        })
    }

    render() {
        return(
            <Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
                <Header>Create City</Header>
                <Modal.Content>
                    <Form size='large' onSubmit={(e) => this.props.addCity(e, this.state)}>
                        <Form.Field>
                            <label>City Name</label>
                            <Form.Input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default CreateCity;