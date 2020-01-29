import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react';

function EditCityModal(props) {
    return(
        <Modal open={props.open} closeIcon onClose={props.closeModal}>
            <Header>Edit City</Header>
            <Modal.Content>
                <Form
                    size='large'
                    onSubmit={props.updateCity}
                >
                    <Form.Field>
                        <label>Name</label>
                        <Form.Input 
                            type="text"  
                            name="name" 
                            value={props.cityToEdit.name} 
                            onChange={props.handleEditChange}
                        />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditCityModal;