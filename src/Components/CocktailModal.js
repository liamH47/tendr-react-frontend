import React, { useState } from 'react'
import { Button, Header, Image, Modal, List, Card } from 'semantic-ui-react'


const CocktailModal = (props) => {


  

  const [open, setOpen] = React.useState(false)
//   <Image.Header>{props.name}</Image.Header>
//   {<Button>{props.name}</Button>}
  return (
      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Card>
            <Image src={props.cocktail.image_url} wrapped ui={false} size='small'/>
            <Card.Content>

            <Card.Header>{props.name}</Card.Header>
            </Card.Content>
        </Card>
    }
      >
      <Modal.Header>{props.name}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={props.image_url} alt={props.name} wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <List ordered verticalAlign='bottom'>
                        {props.cocktail.instructions.map(element => <List.Item>{element}</List.Item>)}
          </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
          />
      </Modal.Actions>
    </Modal>
//   console.log("modal return func", this.props)
)

}

export default CocktailModal