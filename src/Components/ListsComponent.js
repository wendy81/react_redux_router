import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class ListsComponent extends React.Component {

  render() {
    const items = this.props.items.map( (val) => {
      return (
        <Link to="/home" key={val}>
        <Row key={val}>
          <Col xs="10"><h6 className="text-left list_items">{val}</h6></Col>
          <Col xs="2"><h6 className="text-right list_items">></h6></Col>
        </Row>
        </Link>
        )
    })
    return (
      <Container className="vertical_block_spacing">
          <h4 className="list_title_bot">{this.props.title}</h4>
          {items}
      </Container>
    );
  }
}

export default ListsComponent

