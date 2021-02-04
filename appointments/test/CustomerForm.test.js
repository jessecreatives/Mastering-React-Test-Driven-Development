import React from 'react';
import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('first name field', () => {
    let render, container;

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
            render(<CustomerForm firstName="value" />);
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

    const itSubmitsNewValue = (fieldName, value) => {
        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm
                    {...{[fieldName]: 'someValue'}}
                    onSubmit={props => expect(props[fieldName]).toEqual(value)}
                />
            );
            await ReactTestUtils.Simulate.change(genericField(fieldName), {
                target: { value }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    };

    const genericField = name => form('customer').elements[name];

    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

    itRendersAsTextBox('firstName');

    itIncludesTheExistingValue('firstName');

    itRendersALabel('firstName', 'First name');

    itAssignsAnIdThatMatchesTheLabelId('firstName', 'firstName');

    itSubmitsExistingValue('firstName', 'existingValue');

    itSubmitsNewValue('firstName', 'Jesse');
});