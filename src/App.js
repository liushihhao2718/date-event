import React, {useState} from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const App = () => {



    const [activeItem, setActive] = useState('book')
    return (

  <div>
      <Menu fixed='top' inverted>Hello</Menu>
    <Menu fixed='top' inverted>
        <Menu.Item
          name='editorials'
          active={activeItem === 'book'}
          onClick={()=>setActive('book')}
        >
          Books
        </Menu.Item>

        <Menu.Item
          name='reviews'
          active={activeItem === 'event'}
          onClick={()=>setActive('event')}
        >
          Events
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={()=>setActive('book')}
        >
          Upcoming Events
        </Menu.Item>
    </Menu>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for single column layouts.
      </p>

      <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
    </Container>

      
  </div>)
}

export default App;