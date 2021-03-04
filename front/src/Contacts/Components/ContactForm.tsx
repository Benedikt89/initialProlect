import React from 'react';
import * as yup from 'yup';
import {COUNTRIES} from '../reducer/exports';
import {I_contact, I_formContact} from "../contacts-types";
import {withFormik, InjectedFormikProps} from 'formik';
import {Button, Form, Input} from "antd";

const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    country: yup.string().required('Country is required').default('Afghanistan'),
    postalCode: yup
        .string()
        .when('country', {
            is: 'United States',
            then: yup.string().matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid postal code'),
        })
        .when('country', {
            is: 'Canada',
            then: yup.string().matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code'),
        })
        .required(),
    phone: yup
        .string()
        .when('country', {
            is: (country: string) => ["United States", "Canada"].includes(country),
            then: yup.string().matches(/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Invalid phone nunber')
        })
        .required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number()
        .required('Age is required')
        .min(0, 'Minimum age is 0')
        .max(200, 'Maximum age is 200'),
});

interface I_formOutherProps {
    edit: boolean,
    onCancel: () => void,
}

const InnerForm: React.SFC<InjectedFormikProps<I_formOutherProps, I_formContact>> = (props) => {
    const {
        edit,
        onCancel,
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
    } = props;
    return (
        <div className="form">
            <Form noValidate>
                <Form.Item label="First name" id="firstName">
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={values.firstName || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Last name" id="lastName">
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Address" id="address">
                    <Input
                        type="text"
                        placeholder="Address"
                        aria-describedby="inputGroupPrepend"
                        name="address"
                        value={values.address || ''}
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item label="City" id="city">
                    <Input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={values.city || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Region" id="region">
                    <Input
                        type="text"
                        placeholder="Region"
                        name="region"
                        value={values.region || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Country" id="country">
                    <Input
                        type="select"
                        placeholder="Country"
                        name="country"
                        onChange={handleChange}
                        value={values.country || ''}
                    >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </Input>
                </Form.Item>
                <Form.Item label="Postal Code" id="postalCode">
                    <Input
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={values.postalCode || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Phone" id="phone">
                    <Input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={values.phone || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Email" id="email">
                    <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item label="Age" id="age">
                    <Input
                        type="text"
                        placeholder="Age"
                        name="age"
                        value={`${values.age}` || ''}
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{'marginRight': '10px'}}>
                        Save
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

interface I_Props {
    onSave: () => void,
    addContact: (values: I_formContact) => void,
    contact?: I_contact | null,
}

type I_Allprops = I_Props & I_formOutherProps

// Wrap our form with the withFormik HoC
const ContactForm = withFormik<I_Allprops, I_formContact>({
    // Transform outer props into form values
    mapPropsToValues: ({contact}: I_Allprops) => {
        const initialValues = {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            region: '',
            country: '',
            postalCode: '',
            phone: '',
            email: '',
            age: +''
        };
        if (contact) {
            return {
                firstName: contact.firstName,
                lastName: contact.lastName,
                address: contact.address,
                city: contact.city,
                region: contact.region,
                country: contact.country,
                postalCode: contact.postalCode,
                phone: contact.phone,
                email: contact.email,
                age: contact.age
            }
        } else return initialValues
    },
    handleSubmit: async (
        values: I_formContact,
        {props, setSubmitting, setErrors}
    ) => {
        let {addContact, onSave, edit} = props;
        const isValid = await schema.validate(values);
        if (!isValid) {
            return;
        }
        if (!edit) {
            await addContact(values);
        } else {
            await addContact({...values});
        }
        onSave();
        console.log(values);
    }
})(InnerForm);

export default ContactForm;
