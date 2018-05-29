import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Button, Table } from 'reactstrap';
import { Control, Errors, Form } from 'react-redux-form';
import { connect } from 'react-redux';

import { UserActions }  from '../Actions/UserActions';
import AlertComponent from './AlertComponent';

class HomeComponent extends React.Component {

  handlerExit(){
    const { history, dispatch } = this.props;
    dispatch(UserActions.Logout(history))
  }

  handlerDel(id, userId){
    const { history, dispatch } = this.props;
    dispatch(UserActions.DelList(id, userId))
  }  

  componentDidMount() {
    this.props.dispatch(UserActions.GetAll())
  }
  render() {
    const { alertType, alertMessage, user, users, dispatch } = this.props;
  
    const usersList = users ?  users.map( (val, index) => {
      let id = val.id;
      let userId = user.id;
      return (
          <tr key={val.id}>
            <th scope="row">{val.id}</th>
            <td>{val.username}</td>
            <td onClick={this.handlerDel.bind(this, id, userId)}>DEL</td>
            <td>EDIT</td>           
          </tr>
      )
    }): []

    return (
      <div>
        <Container>

        <Row className='pos_rel'>

        <AlertComponent  alertMessage={alertMessage} alertType={alertType}/>

        <Col style={{ overflow:'hidden',padding:0}} >
          <img style={{width:'140%', height:'auto'}} src="/images/detail_block1@3x.png"  alt="img"/>
          <Row style={{padding:'10px', position: 'absolute', right:0, top:0}}>
            <Col xs="6" className="text-left">username:{user.username}</Col>
            <Col xs="6" className="text-right" onClick={this.handlerExit.bind(this)}>Exit</Col>
          </Row>   
            
        </Col>

        
        <Table dark className='user_list_table opacity'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th colSpan='2'>Edit</th>
          </tr>
        </thead>
        <tbody>
          { usersList }
        </tbody>
        </Table>

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
  console.log(state)
  return {
    history: ownProps.history,
    alertMessage:state.AlertReducer.message,
    alertType:state.AlertReducer.type,
    users: state.HomeReducer.users
  };
}

export default connect(mapStateToProps)(HomeComponent);



