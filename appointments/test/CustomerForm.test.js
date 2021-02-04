import React from 'react';
import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

let render, container;
const genericField = name => form('customer').elements[name];

const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

beforeEach(() => {
    ({render, container} = createContainer());
});

const form = id => container.querySelector(`form[id="${id}"]`);

const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
};

const itRendersAsTextBox = fieldName => {
    it('renders as a text box', () => {
        render(<CustomerForm />);
        expectToBeInputFieldOfTypeText(genericField(fieldName));
    });
};

const itIncludesTheExistingValue = fieldName => {
    it('include the existing value', () => {
        render(<CustomerForm {...{[fieldName]: 'value'}} />);
        expect(genericField(fieldName).value).toEqual('value');
    });
};

const itRendersALabel = (fieldName, labelText) => {
    it('renders a label', () => {
        render(<CustomerForm />);
        expect(labelFor(fieldName)).not.toBeNull();
        expect(labelFor(fieldName).textContent).toEqual(labelText);
    });
};

const itAssignsAnIdThatMatchesTheLabelId = (fieldName, fieldId) => {
    it('assigns an id that matches the label id', () => {
        render(<CustomerForm />);
        expect(genericField(fieldName).id).toEqual(fieldId);
    });
};

const itSubmitsExistingValue = (fieldName, value) => {
    it('saves existing value when submitted', async () => {
        expect.hasAssertions();
        render(
            <CustomerForm
                {...{[fieldName]: value}}
                onSubmit={props => expect(props[fieldName]).toEqual(value)}
            />
        );
        await ReactTestUtils.Simulate.submit(form('customer'));
    });
};

const itSubmitsNewValue = fieldName => {
    it('saves new value when submitted', async () => {
        expect.hasAssertions();
        render(
            <CustomerForm
                {...{[fieldName]: 'someValue'}}
                onSubmit={props => expect(props[fieldName]).toEqual('newValue')}
            />
        );
        await ReactTestUtils.Simulate.change(genericField(fieldName), {
            target: { name: fieldName, value: 'newValue' }
        });
        await ReactTestUtils.Simulate.submit(form('customer'));
    });
};


describe.skip('first name field', () => {
    itRendersAsTextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabel('firstName', 'First name');

    itAssignsAnIdThatMatchesTheLabelId('firstName', 'firstName');

    itSubmitsExistingValue('firstName', 'existingValue');

    itSubmitsNewValue('firstName', 'Jesse');
});

describe.skip('last name field', () => {
    itRendersAsTextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName', 'lastName');
    itSubmitsExistingValue('lastName', 'existingValue');
    itSubmitsNewValue('lastName', 'Wei');
});

describe.skip('phone number field', () => {
    itRendersAsTextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone Number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber', 'phoneNumber');
    itSubmitsExistingValue('phoneNumber', 'existingValue');
    itSubmitsNewValue('phoneNumber', '000-0000-0000');
});

describe('submit button', () => {
    it('has a submit button', () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector('input[type="submit"]');
        expect(submitButton).not.toBeNull();
    });
});