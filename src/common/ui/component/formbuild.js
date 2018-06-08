import React from 'react'

import {
    Switch,
    Form,
    Input,
    DatePicker,
    Select,
    TimePicker,
    Col,
} from 'antd'

const Search = Input.Search;
const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};

const containerSpan = {xs: 8, sm: 16, md: 24, lg: 32}

function FormBuild() {

}

FormBuild.prototype.formInput = (props, getFieldDecorator) => {
    return (
      <Col span={containerSpan} key={props.key + "col"}>
          <FormItem key={props.key} label={props.title}>
              {
                  getFieldDecorator(props.dataIndex, {
                      rules: [
                          {required: props.required, message: "请输入" + props.title}
                      ]
                  })(
                    <Input placeholder={"请输入" + props.title}/>
                  )
              }
          </FormItem>
      </Col>
    )
}

FormBuild.prototype.formSwitch = (props, getFieldDecorator, initialValue) => {
    console.log("formSwitch", initialValue)
    return (
      <Col span={containerSpan} key={props.key + "col"}>
          <FormItem key={props.key} label={props.title}>
              {
                  getFieldDecorator(props.dataIndex, {
                      rules: [
                          {required: props.required}
                      ]
                  })(
                    initialValue == true ? <Switch defaultChecked/> : <Switch/>
                  )
              }
          </FormItem>
      </Col>
    )
}

FormBuild.prototype.formDatePicker = (props, getFieldDecorator) => {

    return (
      <Col span={containerSpan}>
          <FormItem key={props.key} label={props.title}>
              {
                  getFieldDecorator(props.dataIndex, {
                      rules: [
                          {required: props.required, message: "请选择" + props.title}
                      ]
                  })(
                    <DatePicker placeholder={"请选择" + props.title}/>
                  )
              }
          </FormItem>
      </Col>)
}

FormBuild.prototype.formTimePicker = (props, getFieldDecorator) => {
    return (
      <FormItem key={props.key} label={props.title} {...formItemLayout}>
          {
              getFieldDecorator(props.dataIndex, {
                  rules: [
                      {required: props.required, message: "请选择" + props.title}
                  ]
              })(
                <TimePicker placeholder={"请选择" + props.title}/>
              )
          }
      </FormItem>)
}

FormBuild.prototype.formSelect = (props, getFieldDecorator, initialValue) => {
    const options = props.f7.dataSource.map((item, index) => {
        console.log("options", (item instanceof Object));
        if (item instanceof Object) {
            return <Option key={item.value} value={item.value}>{item.title}</Option>
        } else {
            return <Option key={item} value={item}>{item}</Option>
        }
    })
    console.log("options", options);
    var value = "";
    if (initialValue) {
        value = props.type == Object ? initialValue.value : initialValue;
    }
    console.log("options", value);
    return (
      <Col span={containerSpan}>
          <FormItem key={props.key} label={props.title}>
              {
                  getFieldDecorator(props.dataIndex, {
                      rules: [
                          {required: props.required, message: "请选择" + props.title}
                      ]
                  })(
                    <Select style={{width: 200}}>
                        {[...options]}
                    </Select>
                  )
              }
          </FormItem>
      </Col>
    )
}

module.exports = FormBuild