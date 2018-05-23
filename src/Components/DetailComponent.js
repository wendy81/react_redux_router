import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import AlertAction from '../Actions/AlertAction'

import { Container, Row, Col, Jumbotron, Button  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DetailComponent extends React.Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
      // this.props.dispatch(AlertAction(this.props.isOnProps, this));
  } 

  render() {

    const { goBack } = this.props;
    console.log(goBack)

    return (
      <div>

      <Container fluid style={{marginLeft:'-15px', marginRight:'-15px'}}>
      <Row className="pos_rel">
        <Col><img style={{width:'100%', height:'auto'}} src="images/detail_block1@3x.png" /></Col>

        <Col className="horizontal_vertical_center" style={{width:'60%', height:'auto'}}>
            <img style={{width:'100%', height:'auto'}} src="images/detail_header@3x.png" />
        </Col>
        <Col className="detail_header_title">
            <h4>The Day We Left Earth</h4>
            <h6>⭐️⭐️⭐️⭐️⭐️（376）</h6>
        </Col>
        <Col className="detail_header_back">
            <h4 onClick={goBack}>← Back</h4>
        </Col>        
      </Row>
      </Container> 


      <Container>
        <Row>
          <Col>
            <Button color="secondary" size="lg" block>Watch Now</Button>
          </Col>
        </Row>
        <Row className="vertical_block_spacing">
          <Col>
            <h6>2018 94m</h6>
            <h6>When NASA discovers a duplicate Earth in our Solar System, an ambitious young scientist and an accomplished composer must team up to save, not one, but two worlds.</h6>
          </Col>
        </Row>
      </Container>

      <Container className="vertical_block_spacing">
        
        <Row>
            <Col><h5>TRAILER</h5></Col>
        </Row>
        <Row>
            <Col xs="6">
            <Link to="/actor">
            <img style={{width:'100%', height:'auto'}} src="images/block1@3x.png" />
            </Link>
            </Col>
        </Row>
        <Row>
          <Col><h6>2:46</h6></Col>
        </Row>
       
      </Container>

      <Container className="vertical_block_spacing">
        <Row>
            <Col><h5>CAST</h5></Col>
        </Row>
        <Row>
            <Col xs="3"><img style={{width:'100%', height:'auto'}} src="images/block1@3x.png" /></Col>
            <Col xs="3"><img style={{width:'100%', height:'auto'}} src="images/block2@3x.png" /></Col>
            <Col xs="3"><img style={{width:'100%', height:'auto'}} src="images/block4@3x.png" /></Col>
            <Col xs="3"><img style={{width:'100%', height:'auto'}} src="images/block5@3x.png" /></Col>
        </Row>
        <Row>
          <Col><h6>2:46</h6></Col>
        </Row>
      </Container>

      <Container className="vertical_block_spacing">
        <Row>
            <Col><h5>RATINGS & REVIEWS</h5></Col>
        </Row>
        <Jumbotron className="ratings_bg" style={{padding:20}}>
          <Row>
            <Col xs="6" className="text-left">
            <h5>My new favorite movie!</h5>
              <h6>@stephanie92</h6>
            </Col>
            <Col xs="6" className="text-right">
              <h5>⭐️⭐️⭐️⭐️⭐️</h5>
              <h6>Jan 16</h6>
            </Col>
          </Row>
  
          <h6  className="vertical_block_spacing">I didn’t catch this movie when it was in theaters but after seeing it for the first time I can’t believe I waited so long. The story grabbed me from the start and the special effects totally blew me away. I loved it so much that I haven’t seen a movie yet that lived up to this one — definitely a sign of a great film.</h6>
        </Jumbotron>
      </Container>

      <Container className="vertical_block_spacing">
        <Row>
            <Col><h5>INFORMATION</h5></Col>
        </Row>
        <Row>
            <Col xs="2" className="text-right">
              <h6>Studio</h6>
            </Col>
            <Col xs="10" className="text-left">
              <h6>Vixbona Studios</h6>
            </Col>
        </Row>

        <Row>
            <Col xs="2" className="text-right">
              <h6>Genre</h6>
            </Col>
            <Col xs="10" className="text-left">
              <h6>Science Fiction</h6>
            </Col>
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
}

// Add this function:
function mapStateToProps(state, ownProps) {
  console.log(ownProps)
  return {
    // visible: state.AlertReducer.visible,
    // isOnProps:state.AlertReducer.isOnProps
    goBack: () => ownProps.history.goBack()
  };
}

export default connect(mapStateToProps)(DetailComponent);



