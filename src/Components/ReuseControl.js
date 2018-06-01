import React from 'react';
import { Control, Errors, Form } from 'react-redux-form';
import { Label } from 'reactstrap';


class ReuseControl extends React.Component {

  render() {
    return(
         <div>
			<Label htmlFor=".username">USERNAME</Label>
				<Control.text 
				model=".username"  
				id="username"
				placeholder="Input your username"
				mapProps={{
					className: ({fieldValue}) => !fieldValue.valid
					? 'focused'
					: ''
				}}
			/>
			<Errors
				className="errors"
				model=".username"
				show={(field) => field.focus || field.submitFailed}
				messages={{
				required: 'Required',
				longEnough:'8 character or less'
				}}

			/>
			<Label htmlFor=".password">PASSWORD</Label>
				<Control 
				type='password'
				model=".password"  
				id="password"
				placeholder="Input your password"
				mapProps={{
					className: ({fieldValue}) => !fieldValue.valid
					? 'focused'
					: ''
				}}
			/> 
			<Errors
				className="errors"
				model=".password"
				show={(field) => field.focus || field.submitFailed}
				messages={{
				required: 'Required',
				length:'6-16 characters'
			}}
			/>          
         </div>
    );
  }
}

export default ReuseControl

