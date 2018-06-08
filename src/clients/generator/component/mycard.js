import React from 'react'
import {Card, Icon} from 'antd';

const {Meta} = Card;

export default class MyCard extends React.Component {

    handleTableEdit = () => {
        this.props.onTableEditClick(this.props.item);
    }

    handleTableDel = () => {
        this.props.onTableDelClick(this.props.item);
    }

    render() {
        return (<Card
          hoverable
          cover={<Icon type={this.props.coverIcon} style={{fontSize: 32, marginTop:15}}/>}
          style={{width: 180, marginTop: 20, marginLeft: 10}}
          actions={[<Icon onClick={this.handleTableDel} type="delete"/>,
              <Icon onClick={this.handleTableEdit} type="edit"/>]}
        >
            <Meta
              title={this.props.item.title}
              description={this.props.item.dataIndex}
            />
        </Card>);
    }
}
