import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import AlertAction from '../Actions/AlertAction'

import { Container, Row, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';



class ActorComponent extends React.Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
      // this.props.dispatch(AlertAction(this.props.isOnProps, this));
  } 

  render() {
    console.log(this.props)
    const items = [];
    const slides = items.map((item=[], index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
        <img style={{width:'100%', height:'auto'}} src="images/actor_carousel1@3x.png" />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>

      <Container fluid style={{marginLeft:'-15px', marginRight:'-15px'}}>
      <Row  style={{padding:0,margin:0}}>
        <Col>
        <Link to="/list">
          <img style={{width:'100%', height:'auto'}} src="images/actor_carousel1@3x.png" />
        </Link>
        </Col>
      </Row>
      </Container> 


      <Container className="vertical_block_spacing">
        <Row>
          <Col>
            <h6>BIO</h6>
            <h6>Lynne Gaiser Walter was born August 7, 1982 in Chicago, Illinois. She graduated from Georgetown University in 2003, with a bachelor’s degree in economics. After completing College, Walter was offered a job with Goldman Sachs, which she turned down in order to pursue her career as an actor.</h6>
          </Col>
        </Row>
      </Container>

      <Container className="vertical_block_spacing">
        <Row>
            <Col><h6>KNOWN FOR</h6></Col>
        </Row>
        <Row>
            <Col xs="6"><img style={{width:'100%', height:'auto'}} src="images/block1@3x.png" /></Col>
            <Col xs="6"><img style={{width:'100%', height:'auto'}} src="images/block2@3x.png" /></Col>
        </Row>
      </Container>        


      </div>
    );
  }
}

Row.propTypes = {
  noGutters: PropTypes.bool
}
Container.propTypes = {
  fluid:  PropTypes.bool
  // applies .container-fluid class
}

// Add this function:
// function mapStateToProps(state) {
//   return {
//     // visible: state.AlertReducer.visible,
//     // isOnProps:state.AlertReducer.isOnProps
//   };
// }

// export default connect(mapStateToProps)(HomeComponent);

export default ActorComponent
