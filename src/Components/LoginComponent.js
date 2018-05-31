import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { Control, Errors, Form } from 'react-redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserActions }  from '../Actions/UserActions';
import AlertComponent from './AlertComponent';



class LoginComponent extends React.Component {

  handleSubmit(values) {
    const { dispatch, history } = this.props;
    if( values.username && values.password ) {
      dispatch(UserActions.Login( values.username, values.password, history ))
    }
  }

  render() {
    const { alertType, alertMessage } = this.props;
    const longUsernameEnough = (val) => val.length <=8;
    const password = (val) =>  val==='' ? true : val.length >= 6 && val.length <=16;
    const required = (val) => val && val.length;
    return (
      <div>
        <Container>

        <Row className='pos_rel'>

          <AlertComponent  alertMessage={alertMessage} alertType={alertType} />

          <Col style={{ overflow:'hidden',padding:0}} >
            <img style={{width:'140%', height:'auto'}} src="https://uploads.codesandbox.io/uploads/user/cb43ebff-9aa5-4c6f-b63f-881bbdd80331/OVwp-detail_block1@3x.png"  alt="img"/>
          </Col>

          <Col className='app_register_login_logo'>
              <div style={{width:'100px', height:'100px', margin:'0 auto'}}>
                <img className='rounded-circle' style={{width:'100%', height:'auto'}} src="https://uploads.codesandbox.io/uploads/user/cb43ebff-9aa5-4c6f-b63f-881bbdd80331/8ShD-block1@3x.png" alt="img"/>
              </div>

              <h4 className='text-center'>LOGIN</h4>
             <Form 
              model="login" 
              onSubmit={(values) => this.handleSubmit(values)}
              className='vertical_block_spacing reg_login_form'
              >
                <Label htmlFor=".username">USERNAME</Label>
                <Control.text 
                  model=".username"  
                  id="username"
                  validators={{
                    required : required,
                    length: longUsernameEnough
                  }}
                  placeholder="Input your username"
                />
                <Errors
                  className="errors"
                  model=".username"
                  show="touched"
                  messages={{
                    required: 'Required',
                    longEnough:'8 character or less'
                  }}
                />
                <Label htmlFor=".password">PASSWORD</Label>
                <Control.text 
                type='password'
                model=".password"  
                id="password"
                validators={{
                  required : required,
                  length: password
                }}
                placeholder="Input your username"
                /> 
                <Errors
                  className="errors"
                  model=".password"
                  show="touched"
                  messages={{
                    required: 'Required',
                    length:'6-16 characters'
                  }}
                /> 
                <Button type='submit' size="lg" block className='reg_login_btn'>Login</Button>  
                </Form>               

              <div className='reg_login_form'>
               <h6 className='text-center reg_login_btn'>If you have’t any account.</h6>
               <Link to='/register'>
               <Button size="lg" block>REGISTER</Button>
               </Link>
              </div>
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
  // applies .container-fluid class
}

// Add this function:
function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
    alertMessage:state.AlertReducer.message,
    alertType:state.AlertReducer.type
  };
}

export default connect(mapStateToProps)(LoginComponent);



