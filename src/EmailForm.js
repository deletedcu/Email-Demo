import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import './EmailForm.css';

const { TextArea } = Input
// const server_url = 'http://localhost:3001/';
const server_url = 'https://email-klopot-server.herokuapp.com:3001/';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class MainForm extends Component {

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err != null) {
        console.log('Received values of form: ', err);
      } else {
        fetch(server_url + "send/", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(values)
        }).then(res => {
          if (res.status === 200) {
            alert('Email was sent successfully.');
          } else {
            alert('Email sent was failure.')
          }
        })
        this._resetForm();
      }
    })
  }

  _resetForm = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    // Only show error after a field is touched.
    const recipientNameError = isFieldTouched('recipientName') && getFieldError('recipientName');
    const emailError = isFieldTouched('email') && getFieldError('email');
    const subjectError = isFieldTouched('emailSubject') && getFieldError('emailSubject');
    const bodyError = isFieldTouched('emailBody') && getFieldError('emailBody');

    return (
      <Form onSubmit={this.handleSubmit} className="email-form">
        <Form.Item
          validateStatus={recipientNameError ? 'error' : ''}
          help={recipientNameError || ''}
        >
          {getFieldDecorator('recipientName', {
            rules: [{ required: true, message: 'Please input recipient name!'}]
          })(
            <Input placeholder="Recipient Name"/>
          )}
        </Form.Item>
        <Form.Item
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: 'Please input recipient email!'}]
          })(
            <Input placeholder="Email"/>
          )}
        </Form.Item>
        <Form.Item
          validateStatus={subjectError ? 'error' : ''}
          help={subjectError || ''}
        >
          {getFieldDecorator('emailSubject', {
            rules: [{ require: true, message: 'Please input email subject!'}]
          })(
            <Input placeholder="Subject"/>
          )}
        </Form.Item>
        <Form.Item
          validateStatus={bodyError ? 'error' : ''}
          help={bodyError || ''}
        >
          {getFieldDecorator('emailBody', {
            rules: [{ required: true, message: 'Please input the email body!'}]
          })(
            <TextArea placeholder="Type your messages..." autosize={{minRows: 6, maxRows: 10}}/>
          )}
        </Form.Item>
        <Form.Item>
          <Button className="button" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Send</Button>
        </Form.Item>
      </Form>
    )
  }
}
const EmailForm = Form.create({ name: 'email_form' })(MainForm);
export default EmailForm