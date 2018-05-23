import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  LazyLoad from 'react-lazy-load'
import GetDataAction from '../Actions/GetDataAction'
import ImagesLoadAction from '../Actions/ImagesLoadAction'



class HomeComponent extends React.Component {

  componentWillMount() {
      this.props.dispatch(GetDataAction(`${this.props.match.url}`));
      this.props.dispatch(ImagesLoadAction(this))
  } 

  // <li><Link to={`${match.url}/shoes`}>Shoes</Link></li>

  render() {
    const { loading, status, featured, error, imgLoading} = this.props;

    let featured_small_block1;
    let featured_small_block2;
    let featured_big_block;
    if(loading) {
        featured_small_block1 = featured.featured_small_block1.map( (val) => {
        return (
          <Col xs="6" key={val.src}>
            <LazyLoad>
            <img onLoad={this.onLoad} onError={this.onError} style={{width:'100%', height:'auto'}} src={val.src} alt={val.altText}/>
            </LazyLoad>
            {imgLoading ? "Loaded" : "Loading"}
          </Col>
        )
        })

        featured_small_block2  = featured.featured_small_block2.map( (val) => {
        return (
          <Col xs="6" key={val.src}>
          <LazyLoad>
          <img onLoad={this.onLoad} onError={this.onError} style={{width:'100%', height:'auto'}} src={val.src} alt={val.altText} />
          </LazyLoad>
          {imgLoading ? "Loaded" : "Loading"}
          </Col>
        )
        })        

        featured_big_block = featured.featured_big_block.big_blocks.slice(0,featured.featured_big_block.show_num).map( (val) => {
        return (
          <Link to="/detail" key={val.src}>
            <LazyLoad>
            <img onLoad={this.onLoad} onError={this.onError} style={{width:'100%', height:'auto'}} src={val.src} alt={val.altText}/>
            </LazyLoad>
            {imgLoading ? "Loaded" : "Loading"}
          </Link>
        )
        })
    }else {
      featured_small_block1 = featured_small_block2 = featured_big_block = <Col>{status}{error}</Col>
    }

    return (
      <div>
        <Container fluid>

        <Row className="header">
          <h2>Featured</h2>
        </Row>

        <Row noGutters>
          {featured_small_block1}
        </Row>

        </Container>  

        <Container>

        <Row>
          <Col>{featured_big_block}</Col>
        </Row>

        <Row noGutters>
          {featured_small_block2}
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
function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    loading:state.HomeReducer.loading,
    status:state.HomeReducer.status,
    error:state.HomeReducer.error,
    featured:state.HomeReducer.featured,
    imgLoading: state.ImageReducer.imgLoading
  };
}

export default connect(mapStateToProps)(HomeComponent);



