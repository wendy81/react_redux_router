import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { Control, Errors, Form } from 'react-redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserActions }  from '../Actions/UserActions';
import AlertComponent from './AlertComponent';
import PageBgImage from './PageBgImage';
import ReuseControl from './ReuseControl'



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
            <PageBgImage />
          </Col>

          <Col className='app_register_login_logo'>
              <div style={{width:'100px', height:'100px', margin:'0 auto'}}>
                <img className='rounded-circle' style={{width:'100%', height:'auto'}} src="https://uploads.codesandbox.io/uploads/user/cb43ebff-9aa5-4c6f-b63f-881bbdd80331/8ShD-block1@3x.png" alt="img"/>
              </div>

              <h4 className='text-center'>LOGIN</h4>
             <Form 
              model="login" 
              onSubmit={(values) => this.handleSubmit(values)}
              validators = {{
                username: { required, longEnough:longUsernameEnough },
                password: { required, length:password }
              }}
              className='vertical_block_spacing reg_login_form'
              >
              <ReuseControl />
               
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



