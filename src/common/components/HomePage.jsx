import React from 'react'
import { Container, Button, Header, Segment, Menu } from 'semantic-ui-react'

const HomePage = () => (
  <div>
    <Segment inverted vertical textAlign='center' className="masthead">
      <Container>
        <Menu size='large' secondary inverted pointing>
          
        </Menu>
      </Container>
      <Container text>
        <Header as='h1' inverted>INFOR-Pad</Header>
        <Header as='h2' inverted>A Conveniece Online Coding and Sharing Tool</Header>
        <Button primary size='huge'>Start coding</Button>
      </Container>
    </Segment>
  </div>
)

export default HomePage
