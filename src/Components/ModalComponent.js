import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UserActions }  from '../Actions/UserActions';


class ModalComponent extends React.Component {

	constructor(props){
		super(props)
		this.toggle = this.toggle.bind(this)
		this.handlerDel = this.handlerDel.bind(this)
	}

	toggle() {
		const { dispatch } = this.props;
		dispatch({type:'MODAL_SUCCESS', modalTitle:''})
	}

	handlerDel(ids){
		const { dispatch } = this.props;
		dispatch(UserActions.DelList(ids.id, ids.userId))
		this.toggle();
	}

	render() {
		return(
			<div style={{position:'absolute', left:0, top:0,zIndex:1000, width:'100%'}}>
		        <Modal isOpen={this.props.hasOpen} toggle={this.toggle } className={this.props.className}>
		          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
		          <ModalBody>
		           {this.props.modalMessage}
		          </ModalBody>
		          <ModalFooter>
		            <Button color="primary" onClick={ this.handlerDel.bind(null, this.props.ids) }>Ok</Button>{' '}
		            <Button color="secondary" onClick={ this.toggle }>Cancel</Button>
		          </ModalFooter>
		        </Modal>
		    </div>
		);
	}
}

export default ModalComponent

