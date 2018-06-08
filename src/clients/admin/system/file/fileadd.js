import React from 'react'
import PageForm from '../../../../common/ui/component/pageform'
import {Columns, Uri} from "./filemap"

export default class AddFile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
          <div style={{width: '95%', marginRight: 'auto', marginLeft: 'auto'}}>
              <PageForm {...this.props} columns={Columns} uri={Uri} dataSource={this.props.location.params}/>
          </div>
        )
    }
}