import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { UserActions }  from '../Actions/UserActions';
import { Control, Errors, Form } from 'react-redux-form';

import AlertComponent from './AlertComponent';


class RegisterComponent extends React.Component {

  handleSubmit(values) {
    const { dispatch, history } = this.props;
    const user = {username:values.username, password:values.password}
    UserActions.Register(user,history)(dispatch);
    dispatch(UserActions.Register(user,history))
  }

  render() {
    const {alertMessage, alertType} = this.props;
    const longUsernameEnough = (val) => val.length <=8;
    const password = (val) =>  val==='' ? true : val.length >= 6 && val.length <=16;
    const required = (val) => val && val.length;
    const passwordsMatch = ({
        password,
        confirmPassword
    }) => {
        return password === confirmPassword;
    }

    return (
      <div>
        <Container>

        <Row className='pos_rel'>


          <AlertComponent  alertMessage={alertMessage} alertType={alertType} />


          <Col style={{ overflow:'hidden',padding:0}} >
            <img style={{width:'140%', height:'auto'}} src="https://uploads.codesandbox.io/uploads/user/cb43ebff-9aa5-4c6f-b63f-881bbdd80331/OVwp-detail_block1@3x.png" alt="img"/>
          </Col>

          <Col className='app_register_login_logo'>
              <div style={{width:'100px', height:'100px', margin:'0 auto'}}>
                <img className='rounded-circle' style={{width:'100%', height:'auto'}} src="https://uploads.codesandbox.io/uploads/user/cb43ebff-9aa5-4c6f-b63f-881bbdd80331/8ShD-block1@3x.png" alt="img"/>
              </div>
              <h4 className='text-center'>REGISTER</h4>

              <Form 
              model="register" 
              // initialState={{ username: '', password:'', confirmPassword:'' }}
              validators = {{
                '': { passwordsMatch }
              }}
              onSubmit={(values) => this.handleSubmit(values)}
              // onSubmitFailed={ (userForm) => this.handleSubmitFailed(userForm) }
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
                <Label htmlFor=".confirmPassword">CONFIRM PASSWORD</Label>
                <Control.text 
                type='password'
                model=".confirmPassword"  
                id="confirmPassword"
                validators={{
                  required : required,
                  length: password,
                }}
                placeholder="Input your username"
                />
                <Errors
                  className="errors"
                  model=".confirmPassword"
                  show="touched"
                  messages={{
                    required: 'Required',
                    length:'6-16 characters',
                  }}
                />
                <Errors
                  model="register"
                  messages={{
                    passwordsMatch: 'Passwords do not match.',
                  }}
                />
                <Button type='submit' size="lg" block className='reg_login_btn'>REGISTER</Button>  
              </Form>

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
  // console.log(state)
  return {
    history:ownProps.history,
    alertMessage:state.AlertReducer.message,
    alertType:state.AlertReducer.type
  };
}

export default connect(mapStateToProps)(RegisterComponent);


