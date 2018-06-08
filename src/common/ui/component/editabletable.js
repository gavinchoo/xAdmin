import React from 'react'
import {Table, Input, Icon, Button, Popconfirm, Row, Col} from 'antd';
import '../styles/editable.less'

class EditableCell extends React.Component {

    state = {
        value: this.props.value,
        editable: this.props.value + "" ? false : true,
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    }
    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({editable: true});
    }

    componentDidUpdate(preProps, preState) {
        if (preProps.value != this.props.value) {
            this.setState({
                value: this.props.value,
                editable: this.props.value + "" ? false : true,
            })
        }
    }

    render() {
        const {value, editable} = this.state;
        return (
          <div className="editable-cell">
              {
                  editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                          value={value}
                          onChange={this.handleChange}
                          onPressEnter={this.check}
                        />
                        <Icon
                          type="check"
                          className="editable-cell-icon-check"
                          onClick={this.check}
                        />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        {(value + "") || ''}
                        <Icon
                          type="edit"
                          className="editable-cell-icon"
                          onClick={this.edit}
                        />
                    </div>
              }
          </div>
        );
    }
}

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.initColumns();
        this.initData();
    }

    initColumns = () => {
        this.columns = [...this.props.columns];
        this.columns.map((column, index) => {
            column.render = (text, record) => {
                var value = (text instanceof Object) ? text.title : text;
                return <EditableCell
                  value={value}
                  onChange={this.onCellChange(record.key, column.dataIndex)}
                />
            }
        })

        this.columns.push({
            title: '操作',
            dataIndex: 'action',
            width: 60,
            render: (text, record) => {
                return (
                  <Row gutter={24}>
                      <Col span={11} offset={1}>
                          <a href="javascript:;" onClick={() => this.onEdit(record.key)}>Edit</a>
                      </Col>
                      <Col span={12}>
                          <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                              <a href="javascript:;">Delete</a>
                          </Popconfirm>
                      </Col>
                  </Row>
                );
            },
        })
    }

    initData = () => {
        if (this.props.dataSource) {
            this.props.dataSource.map((item, index) => {
                item['key'] = index;
            })
            this.state = {
                dataSource: [...this.props.dataSource],
            };
        } else {
            this.state = {dataSource: []};
        }
    }

    refreshData = () => {
        if (this.props.dataSource) {
            this.props.dataSource.map((item, index) => {
                item['key'] = index;
            })
            this.setState({
                dataSource: [...this.props.dataSource],
            });
        } else {
            this.setState({
                dataSource: [],
            });
        }
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataSource});
                this.props.onEntityChange(this.props.dataIndex, dataSource);
            }
        };
    }

    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        const tempDataSource = dataSource.filter(item => item.key !== key);
        this.setState({dataSource: tempDataSource});
        this.props.onEntityChange(this.props.dataIndex, tempDataSource);
    }

    onEdit = (key) => {
        const dataSource = [...this.state.dataSource];
        const recordItem = dataSource.filter(item => item.key == key);
        this.props.onEntityEdit(this.props.dataIndex, recordItem[0]);
    }

    handleAdd = () => {
        const {dataSource} = this.state;
        const newData = {
            key: dataSource.length
        };
        var newDataSource = [...dataSource, newData];
        this.setState({
            dataSource: newDataSource,
        });
    }

    componentDidUpdate(preProp, preState) {
        if (preProp.dataSource != this.props.dataSource) {
            this.refreshData();
        }
    }

    render() {
        const {dataSource} = this.state;
        const columns = this.columns;
        console.log(this.props);
        return (
          <div>
              <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
              <Table bordered dataSource={dataSource} columns={columns}
                     scroll={this.props.scroll}
                     pagination={null}/>
          </div>
        );
    }
}