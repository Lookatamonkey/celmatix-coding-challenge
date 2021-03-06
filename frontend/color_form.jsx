const defaultColors = new Set(["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]);

import React from 'react';
import { Form, FormControl, ControlLabel, FormGroup, Radio } from 'react-bootstrap';

const ColorForm = props => {
    
    return (
        <Form onSubmit={ (e) => props.handleVerification(e, "color", "color") }>
            <ControlLabel>Favorite Color</ ControlLabel>
            <FormGroup>
                <Radio value="Red" defaultChecked name="color" onChange={props.handleChange('color')}>Red</Radio>

                <Radio value="Orange" checked={props.color === "Orange"} name="color" onChange={props.handleChange('color')}>Orange</Radio>

                <Radio value="Yellow" checked={props.color === "Yellow"} name="color" onChange={props.handleChange('color')}>Yellow</Radio>

                <Radio value="Green" checked={props.color === "Green"} name="color" onChange={props.handleChange('color')}>Green</Radio>

                <Radio value="Blue" checked={props.color === "Blue"}name="color" onChange={props.handleChange('color')}>Blue</Radio>

                <Radio value="Purple" checked={props.color === "Purple"} name="color" onChange={props.handleChange('color')}>Purple</Radio>
                
                <Radio value="" name="color" checked={!(defaultColors.has(props.color) )} onChange={props.handleChange('color')}>Other</Radio>

                <FormControl readOnly={defaultColors.has(props.color)} type="text" value={props.color} onChange={props.handleChange('color')}/>
            </ FormGroup>
            { props.errors ? props.renderErrors() : null }
            { props.errors ? null : <br /> }
            
            {props.nextButton()}
            {props.prevButton()}
        </Form>
    );

};

export default ColorForm;