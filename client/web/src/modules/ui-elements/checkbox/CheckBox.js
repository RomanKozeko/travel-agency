import React from 'react';
import './CheckBox.css'


const CheckBox = ({ label, name, block, onChange }) =>
	<label htmlFor={ name } className={block ? 'ta-checkbox ta-checkbox--block': 'ta-checkbox'}>
		<input type="checkbox"
		       className="ta-checkbox__input"
		       id={ name }
		       name={ name }
					 onChange={onChange}
		/>
		<span className="ta-checkbox__label">{ label }</span>
	</label>

export default CheckBox;
