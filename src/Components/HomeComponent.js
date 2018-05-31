import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';

import { UserActions }  from '../Actions/UserActions';
import AlertComponent from './AlertComponent';
import ModalComponent from './ModalComponent';

class HomeComponent extends React.Component {

  componentDidMount() {
    this.props.dispatch(UserActions.GetAll())
  }

  handlerExit(){
    const { history, dispatch } = this.props;
    dispatch(UserActions.Logout(history))
  }

  handlerIsDel(id, userId, refs){
    const { dispatch } = this.props;
    let textContent = this[refs].current.textContent
    dispatch(UserActions.IsDelList(id, userId, textContent))
  }

  handlerEditable(refs, editRefs, saveRefs){
    this[refs].current.setAttribute("contentEditable", true);
    this[refs].current.focus();
    // let t = this[refs].current;
    //  // console.log(Object.prototype.toString.call(t))
    //  for(let i in t) {
    //   console.log(i)
    //  }
    // console.log(editRefs)
     this[editRefs].current.style = 'display:none'
     this[saveRefs].current.style = 'display:block'
  } 

  handlerEdit(refs,editRefs, saveRefs, id, userId){
    const { dispatch } = this.props;
    this[editRefs].current.style = 'display:block'
    this[saveRefs].current.style = 'display:none'
    let textContent = this[refs].current.textContent
    dispatch(UserActions.EditList(id, userId, textContent))
  }      

  render() {
    const { alertType, alertMessage, user, users } = this.props;
    const { modalTitle, modalMessage, ids } = this.props;
    const username = user ? user.username : ''
    const usersList = users ?  users.map( (val, index) => {
      let id = val.id;
      let userId = user.id;
      let refs = 'ref' + index;
      let editRefs = 'edit' + index;
      let saveRefs = 'save' + index;
      this[refs] = React.createRef();
      this[editRefs] = React.createRef();
      this[saveRefs] = React.createRef();
      return (
          <tr key={val.id}>
            <th scope="row">{val.id}</th>
            <td ref={this[refs]}>{val.username}</td>
            <td onClick={this.handlerIsDel.bind( this, id, userId, refs )}>DEL</td>
            <td ref={this[editRefs]} onClick={this.handlerEditable.bind( this, refs, editRefs, saveRefs )}>EDIT</td>
            <td style={{display:'none'}} ref={this[saveRefs]} onClick={this.handlerEdit.bind( this, refs, editRefs, saveRefs, id, userId )}>SAVE</td>            
          </tr>
      )
    }): [] 



    return (
      <div>
        <Container>

        <Row className='pos_rel'>

        <AlertComponent  alertMessage={alertMessage} alertType={alertType} />

        <ModalComponent 
          hasOpen={ modalTitle ? true: false } 
          className="modalClassName" 
          modalTitle={modalTitle} 
          modalMessage={modalMessage}
          ids = {ids}  
          dispatch={this.props.dispatch}
        />

        <Col style={{ overflow:'hidden',padding:0}} >
          <img style={{width:'140%', height:'auto'}} src="/images/detail_block1@3x.png"  alt="img"/>
          <Row style={{padding:'10px', position: 'absolute', right:0, top:0}}>
            <Col xs="6" className="text-left">username:{username}</Col>
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
  return {
    history: ownProps.history,
    alertMessage:state.AlertReducer.message,
    alertType:state.AlertReducer.type,
    users: state.HomeReducer.users,
    user: state.HomeReducer.user,

    hasOpen:state.ModalReducer.hasOpen,
    modalTitle: state.ModalReducer.modalTitle,
    modalMessage: state.ModalReducer.modalMessage,
    ids:state.ModalReducer.ids
  };
}

export default connect(mapStateToProps)(HomeComponent);



