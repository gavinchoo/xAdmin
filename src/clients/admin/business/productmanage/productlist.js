import React from 'react'
import PageList from '../../../../common/ui/component/pagelist'
import {Columns, Uri} from "./productmap"

export default class ListProduct extends React.Component {
    render() {
        return (
          <div>
              <PageList {...this.props} columns={Columns} uri={Uri} location={this.props.location}/>
          </div>
        )
    }
}