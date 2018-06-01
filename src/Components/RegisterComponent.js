import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { UserActions }  from '../Actions/UserActions';
import { Control, Errors, Form } from 'react-redux-form';

import AlertComponent from './AlertComponent';
import PageBgImage from './PageBgImage';
import ReuseControl from './ReuseControl'


class RegisterComponent extends React.Component {

  handleSubmit(values) {
    const { dispatch, history } = this.props;
    const user = {username:values.username, password:values.password}
    UserActions.Register(user,history)(dispatch);
    dispatch(UserActions.Register(user,history))
  }

  attach(node) {
    // console.log(node[0])
    // console.log(node[1])
    // console.log(node[2])
    // console.log(node[3])

    // console.log(Object.prototype.toString.call(node[0]))
    // console.log(node[0].validity)
    // // for( let i in node[0]) {
    // //   console.log(i)
    // // }
  }

  render() {
    const {alertMessage, alertType, reg} = this.props;
    const longUsernameEnough = (val) => val.length <=8;
    const password = (val) =>  val==='' ? true : val.length >= 6 && val.length <=16;
    const required = (val) => val && val.length;
    const passwordsMatch = ({
        password,
        confirmPassword
    }) => {
      let passwordValid = reg.password.valid;
      let confirmPasswordValid = reg.confirmPassword.valid;
      let result = true;
      if ( passwordValid && confirmPasswordValid ) {
        result = (password === confirmPassword) ? true : false
      } 
      return result;
    }

    return (
      <div>
        <Container>

        <Row className='pos_rel'>


          <AlertComponent  alertMessage={alertMessage} alertType={alertType} />


          <Col style={{ overflow:'hidden',padding:0}} >
            <PageBgImage />
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
                '': { passwordsMatch },
                username: { required, longEnough:longUsernameEnough },
                password: { required, length:password },
                confirmPassword: { required, length:password }              
              }}

              getRef={(node) => this.attach(node)}
              onSubmit={(values) => this.handleSubmit(values)}
              // onSubmitFailed={ (userForm) => this.handleSubmitFailed(userForm) }
              className='vertical_block_spacing reg_login_form'
              hideNativeErrors
              >
                <ReuseControl />              
                <Label htmlFor=".confirmPassword">CONFIRM PASSWORD</Label>
                <Control 
                type='password'
                model=".confirmPassword"  
                id="confirmPassword"
                placeholder="Input your password again"
                mapProps={{
                  className: ({fieldValue}) => !fieldValue.valid
                  ? 'focused'
                  : ''
                }}                
                />
                <Errors
                  className="errors"
                  model=".confirmPassword"
                  show={(field) => field.focus || field.submitFailed}
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
    alertType:state.AlertReducer.type,
    reg: state.forms.register
  };
}

export default connect(mapStateToProps)(RegisterComponent);


