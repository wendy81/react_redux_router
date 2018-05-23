import React from 'react';
import PropTypes from 'prop-types';
import ListsComponent from './ListsComponent';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import  LazyLoad from 'react-lazy-load'
import GetDataAction from '../Actions/GetDataAction'
import ImagesLoadAction from '../Actions/ImagesLoadAction'


class ListComponent extends React.Component {
  componentWillMount() {
      this.props.dispatch(GetDataAction(`${this.props.match.url}`));
      this.props.dispatch(ImagesLoadAction(this))
  } 

  render() {

    const { loading, status, lists, error, imgLoading} = this.props;

    let lists_adv_block;
    let lists_items;
    let show_loading_error;
    if(loading) {
        lists_adv_block = lists.lists_adv_block.map( (val) => {
          return (
            <Link to="/home" key={val.src}>
              <LazyLoad>
              <img onLoad={this.onLoad} onError={this.onError} style={{width:'100%', height:'auto'}} src={val.src} alt={val.altText} />
              </LazyLoad>
              {imgLoading ? "Loaded" : "Loading"}
            </Link>
          )
        })      

        lists_items = lists.lists_items.map( (val) => {
        return (
          <ListsComponent key={val.title} title={val.title} items={val.lists} />
        )
        })
    }else {
      show_loading_error = <Row><Col>{status}{error}</Col></Row>
    }

    return (
      <div>
      <Container fluid>
      <Row className="header">
        <h2>Browser</h2>
      </Row>
      </Container>      
      <Container>
      {show_loading_error}
      <Row>
        <Col>
          {lists_adv_block}
        </Col>
      </Row>

      <Container>
        {lists_items}
      </Container>

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
function mapStateToProps(state) {
  console.log(state)

  return {
    loading:state.ListReducer.loading,
    status:state.ListReducer.status,
    error:state.ListReducer.error,
    lists:state.ListReducer.lists,
    imgLoading: state.ImageReducer.imgLoading  
  };
}

export default connect(mapStateToProps)(ListComponent);



