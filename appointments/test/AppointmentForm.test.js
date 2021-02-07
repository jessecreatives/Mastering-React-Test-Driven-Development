import React from 'react';
import {createContainer} from './domManipulators'
import {AppointmentForm} from '../src/AppointmentForm'

describe('AppointmentForm', () => {
    let render, container;

    beforeEach(() => {
        ({render, container} = createContainer()); // the outer parenthese is necessary
    });

    const form = id => container.querySelector(`form[id="${id}"]`);

    const genericField = name => form('appointment').elements[name];

    it('renders a form', () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });
    it('renders as a select box', () => {
        render(<AppointmentForm />);
        expect(genericField('service')).not.toBeNull();
        expect(genericField('service').tagName).toEqual('SELECT');
    });
});