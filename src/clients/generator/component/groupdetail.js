import React from 'react'
import PageForm from '../../../common/ui/component/pageform'

const Columns = [
    {
        title: '业务分组名称',
        dataIndex: 'dataIndex',
        key: 'dataIndex',
        type: String,
        required: true,
    },
    {
        title: '业务分组别名',
        dataIndex: 'title',
        key: 'title',
        type: String,
        required: true,
    },
]

const Uri = {
    query: '/api/generator/group/query',
    remove: '/api/generator/group/remove',
    edit: '/api/generator/group/edit',
    create: '/api/generator/group/create'
}

export default class GroupDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div style={{width: '95%', marginRight: 'auto', marginLeft: 'auto'}}>
              <PageForm columns={Columns} uri={Uri} defaultParams={{projectId: localStorage.getItem("project")}}/>
          </div>
        )
    }
}