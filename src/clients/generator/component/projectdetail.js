import React from 'react'
import {Layout, Form, Button, Row, Col, Card, Icon, message} from 'antd';
import {Link, Route} from 'react-router-dom'

const {Header, Footer, Sider, Content} = Layout;
const {Meta} = Card;
import {requestPost} from '../../../common/utils/request';
import PageForm from '../../../common/ui/component/pageform'

const FormItem = Form.Item


const Columns = [
    {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        type: String,
        required: true,
    },
    {
        title: '数据库名称',
        dataIndex: 'dbName',
        key: 'dbName',
        type: String,
        required: true,
    },
    {
        title: 'Rest API版本',
        dataIndex: 'apiVersion',
        key: 'apiVersion',
        type: String,
        required: true,
    }
]

const Uri = {
    query: '/api/generator/project/query',
    remove: '/api/generator/project/remove',
    edit: '/api/generator/project/edit',
    create: '/api/generator/project/create'
}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div style={{width: '95%', marginRight: 'auto', marginLeft: 'auto'}}>
              <PageForm columns={Columns} uri={Uri}/>
          </div>
        )
    }
}