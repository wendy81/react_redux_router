import React from 'react';
import { Alert } from 'reactstrap';

class AlertComponent extends React.Component {

  render() {
    return(
    	<div style={{position:'absolute', left:0, top:0,zIndex:1000, width:'100%'}}>
        <Alert isOpen={ this.props.alertMessage ? true : false} color={this.props.alertType}>{this.props.alertMessage}</Alert>
        </div>
    );
  }
}

export default AlertComponent

