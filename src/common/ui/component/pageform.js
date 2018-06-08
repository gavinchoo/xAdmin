import React from 'react'
import {
    Modal,
    Table,
    Upload,
    Icon,
    Form,
    Input,
    Button,
    Row,
    Col,
    message
} from 'antd'
import moment from 'moment'
import {requestPost} from '../../utils/request';
import EditableTable from './editabletable'
import FormUtil from './formutil'
import FormBuild from './formbuild'

const Search = Input.Search;
const FormItem = Form.Item
const formUtil = new FormUtil();
const formBuild = new FormBuild();

const containerSpan = {xs: 8, sm: 16, md: 24, lg: 32}

const source = [
    {value: "input", title: "手工输入"},
    {value: "other_busi", title: "其他业务单元"},
    {value: "category", title: "固定下拉列表"},
    {value: "attachment", title: "附件"},
]

class PageForm extends React.Component {

    constructor(props) {
        super(props)
        this.initState();
    }

    componentWillMount() {
        this.initData();
    }

    initState() {
        this.state = {
            visible: false,
            totalcount: 0,
            searchData: [],
            f7column: {},
            f7value: {},
            f7entity: {},
            f7select: {},
            fileList: [],  // 附件列表
            fileRemoved: [],
            fileFiled: ""  // 附件字段
        }
    }

    initData() {

        if (!this.props.dataSource) {
            this.initState();
            return;
        }
        this.props.columns.map((column, index) => {
            if (formUtil.isColumnAttachment(column)) {
                // 获取附件参数
                var values = this.props.dataSource[column.dataIndex];
                if (values) {
                    var fileList = values.map((item) => {
                        return this.fileToUploadedObj(item, column);
                    })
                    this.setState({fileList});
                }
            } else if (formUtil.isColumnSearch(column)) {
                this.state.f7value[column.dataIndex] = this.props.dataSource[column.dataIndex];
                this.state.f7column[column.dataIndex] = column.f7;
            } else if (formUtil.isColumnEntity(column)) {
                this.state.f7entity[column.dataIndex] = this.props.dataSource[column.dataIndex];
            } else if (formUtil.isColumnSelect(column) && column.f7.dataSource && column.type == Object) {
                this.state.f7select[column.dataIndex] = column.f7.dataSource;
            }
        })
    }

    refreshData() {

        if (!this.props.dataSource) {
            this.initState();
            this.setState({...this.state})
            return;
        }
        this.props.columns.map((column, index) => {
            if (formUtil.isColumnAttachment(column)) {
                // 获取附件参数
                var values = this.props.dataSource[column.dataIndex];
                if (values) {
                    var fileList = values.map((item) => {
                        return this.fileToUploadedObj(item, column);
                    })
                    this.setState({fileList});
                }
            } else if (formUtil.isColumnSearch(column)) {
                this.state.f7value[column.dataIndex] = this.props.dataSource[column.dataIndex];
                this.state.f7column[column.dataIndex] = column.f7;
                this.setState({
                    f7value: this.state.f7value,
                    f7column: this.state.f7column
                })
            } else if (formUtil.isColumnEntity(column)) {
                this.state.f7entity[column.dataIndex] = this.props.dataSource[column.dataIndex];
                this.setState({
                    f7entity: this.state.f7entity,
                })
            } else if (formUtil.isColumnSelect(column) && column.f7.dataSource && column.type == Object) {
                this.state.f7select[column.dataIndex] = column.f7.dataSource;
                this.setState({
                    f7select: this.state.f7select,
                })
            }
        })
    }

    fileToUploadedObj = (file, column) => {
        return {
            uid: file._id,
            name: file.originalname,
            status: 'done',
            url: column.f7.download + "?avatar_id=" + file._id,
            _id: file._id,
            remove: column.f7.remove,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let key in this.state.f7value) {
                    var column = this.state.f7column[key];
                    if (column.valueFiled) {
                        var object = this.state.f7value[key];
                        values[key] = object[column.valueFiled];
                    } else {
                        values[key] = this.state.f7value[key];
                    }
                }

                for (let key in this.state.f7entity) {
                    values[key] = this.state.f7entity[key];
                }

                for (let key in this.state.f7select) {
                    values[key] = this.state.f7select[key].find((item) => {
                        return item.value == values[key]
                    });
                }

                if (this.state.fileList && this.state.fileList.length > 0) {
                    var files = [];
                    if (this.props.dataSource) {
                        files = this.props.dataSource[this.state.fileFiled];
                    }
                    if (!files) {
                        files = [];
                    }
                    this.state.fileList.map((item) => {
                        if (item.response) {
                            // 防止重复提交数据
                            var has = false;
                            files.map((item1) => {
                                if (item1._id == item.response.data.file._id) {
                                    has = true;
                                }
                            })
                            if (!has) {
                                files.push(item.response.data.file);
                            }
                        }
                    })
                    values[this.state.fileFiled] = files;
                }else if (this.state.fileFiled) {
                    values[this.state.fileFiled] = [];
                }
                console.log('Received values of form: ', values);
                if (this.props.onSubmit) {
                    this.props.onSubmit(values);
                } else {
                    this.onSubmit(values)
                }
            }
        });
    }

    onSubmit = (values) => {

        if (this.state.fileRemoved) {
            this.onRemoveFile(this.state.fileRemoved.pop());
        }

        if (this.props.uri) {
            var uri = this.props.uri.create;
            if (this.props.dataSource && this.props.dataSource._id) {
                uri = this.props.uri.edit;
                values["_id"] = this.props.dataSource._id;
            } else {
                uri = this.props.uri.create;
            }

            if (this.props.defaultParams) {
                Object.assign(values, this.props.defaultParams)
            }

            requestPost(uri, {
                props: this.props,
                body: values,
                success: (result) => {
                    message.success('提交成功')
                    if (this.props.onSubmitSuccess) {
                        this.props.onSubmitSuccess(result.data);
                    }
                },
                error: (err) => {
                    message.error(err ? err.message : '提交失败')
                }
            })
        } else {
            if (this.props.onSubmitSuccess) {
                this.props.onSubmitSuccess(values);
            }
        }
    }

    onSearch = (dataIndex, f7, value) => {
        this.state.f7column[dataIndex] = f7;
        this.state.curSearch = dataIndex;

        var values = {page: 1, pagesize: 0};
        if (this.props.defaultParams) {
            Object.assign(values, this.props.defaultParams)
        }

        if (value) {
            Object.assign(values, {dataIndex: value})
        }

        requestPost(f7.query, {
            props: this.props,
            body: values,
            success: (result) => {
                if (result.data.result && result.data.result.length > 0) {
                    this.setState({
                        visible: true,
                        totalcount: result.data.total,
                        searchData: value ? result.data.result[0].subitems : result.data.result,
                    })
                } else {
                    this.setState({
                        visible: true,
                        totalcount: 0,
                        searchData: []
                    })
                }
            },
            error: (err) => {
                message.error(err ? err.message : '获取数据失败')
            }
        })
    }

    onRemoveFile = (file) => {
        if (file) {
            requestPost(file.remove, {
                props: this.props,
                body: {avatar_id: file.uid},
                success: (result) => {
                    this.onRemoveFile(this.state.fileRemoved.pop());
                },
                error: (error) => {
                    message.error(error.message)
                }
            })
        }
    }

    onEntityChange = (dataIndex, entityData) => {
        console.log("dataSource", entityData);
        this.state.f7entity[dataIndex] = [...entityData];
        let map = {};
        map[dataIndex] = this.state.f7entity[dataIndex];
        this.props.form.setFieldsValue(map);
        if (this.props.onEntityItemChange) {
            this.props.onEntityItemChange(dataIndex, entityData);
        }
    }

    onEntityEdit = (dataIndex, entityData) => {
        console.log("dataSource", entityData);
        if (this.props.onEntityItemEdit) {
            this.props.onEntityItemEdit(dataIndex, entityData);
        }
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            f7column: {},
            f7value: {},
            f7select: {},
            fileList: [],
            visible: false,
            totalcount: 0,
            searchData: [],
            f7entity: {},
            fileRemoved: [],
            fileFiled: ""  // 附件字段
        })
    }

    handleModalOk = () => {
        this.setState({
            visible: false,
        })
    }

    handleModalCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleSearchRowSelect = (item) => {
        this.state.visible = false;
        this.state.f7value[this.state.curSearch] = item;
        this.props.columns.map((column) => {
            if (this.state.curSearch == column.key) {
                let map = {};
                map[this.state.curSearch] = item[column.f7.showFiled];
                this.props.form.setFieldsValue(map);
            }
        })
    }

    handleAccachmentCancel = () => this.setState({previewVisible: false})

    handleAccachmentPreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleAccachmentChange = ({fileList}) => {
        this.setState({fileList});
    }

    removeUploadedFile = (file) => {
        var saved = this.props.dataSource[this.state.fileFiled];
        if (saved) {
            this.props.dataSource[this.state.fileFiled] = saved.filter((item) => {
                if (file._id == item._id) {
                    return false;
                }
                return true;
            })
        }
        var uploaded = this.state.fileList;
        if (uploaded) {
            this.state.fileList = uploaded.filter((item) => {
                if (item.response) {
                    if (file._id == item.response.data.file._id) {
                        return false;
                    }
                } else if (item._id) {
                    if (file._id == item._id) {
                        return false;
                    }
                }
                return true;
            })
        }
    }

    handleAccachmentRemove = (file) => {
        if (file.remove) {
            this.removeUploadedFile(file);
            this.state.fileRemoved.push(file);
        } else {
            this.props.columns.map((column, index) => {
                if (this.isColumnAttachment(column)) {
                    var file = file.response.data.file;
                    if (file) {
                        var item = this.fileToUploadedObj(file, column);
                        this.removeUploadedFile(item);
                        this.state.fileRemoved.push(item);
                    }
                }
            })
        }
    }

    formSearch = (props) => {
        const {getFieldDecorator} = this.props.form;

        var value = "";
        if (this.state.f7value[props.dataIndex]) {
            var item = this.state.f7value[props.dataIndex];
            value = item[props.f7.showFiled]
        }
        return (
          <Col span={containerSpan} key={props.key + "col"}>
              <FormItem key={props.key} label={props.title}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          initialValue: value,
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <Search
                          value={value}
                          placeholder={"请选择" + props.title}
                          onSearch={value => this.onSearch(props.dataIndex, props.f7, props.f7.value)}
                          enterButton
                        />
                      )
                  }
              </FormItem>
          </Col>)
    }

    formEntity = (props) => {
        const {getFieldDecorator} = this.props.form;
        const columns = props.f7.columns.filter((item) => {
            return item.listshow != false
        })
        return (
          <Col span={24} key={props.key + "col"}>
              <FormItem key={props.key} label={props.title}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <EditableTable scroll={{x: 800, y: 320}}
                                       dataSource={this.state.f7entity[props.dataIndex]}
                                       columns={columns}
                                       dataIndex={props.dataIndex}
                                       onEntityChange={this.onEntityChange}
                                       onEntityEdit={this.onEntityEdit}
                                       rowKey="_id"
                        />
                      )
                  }
              </FormItem>
          </Col>)
    }


    formAttachment = (props) => {
        const {getFieldDecorator} = this.props.form;
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
          <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">上传</div>
          </div>
        );
        this.state.fileFiled = props.dataIndex;
        return (
          <Col span={24}>
              <FormItem key={props.key} label={props.title} style={{display: "flex", marginTop: "20px"}}>
                  {
                      getFieldDecorator(props.dataIndex, {
                          initialValue: fileList,
                          rules: [
                              {required: props.required, message: "请选择" + props.title}
                          ]
                      })(
                        <div>
                            <Upload
                              action={props.f7.upload}
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={this.handleAccachmentPreview}
                              onChange={this.handleAccachmentChange}
                              onRemove={this.handleAccachmentRemove}
                            >
                                {uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleAccachmentCancel}>
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </div>
                      )
                  }
              </FormItem>
          </Col>)
    }

    componentDidUpdate(preProp, preState) {
        if (preProp.dataSource != this.props.dataSource) {
            this.refreshData();
        }
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        var formItems = this.props.columns.map((item, index) => {
            var forItem;
            if (formUtil.isColumnAttachment(item)) {
                forItem = this.formAttachment(item);
            } else if (formUtil.isColumnEntity(item)) {
                forItem = this.formEntity(item);
            } else if (formUtil.isColumnSearch(item)) {
                forItem = this.formSearch(item);
            } else if (formUtil.isColumnSelect(item)) {
                forItem = formBuild.formSelect(item, getFieldDecorator, getFieldValue(item.dataIndex));
            } else if (item.type == String) {
                forItem = formBuild.formInput(item, getFieldDecorator);
            } else if (item.type == Boolean) {
                forItem = formBuild.formSwitch(item, getFieldDecorator, getFieldValue(item.dataIndex));
            } else if (item.type == Date) {
                forItem = formBuild.formDatePicker(item, getFieldDecorator);
            }
            return forItem;
        })

        const f7columns = this.state.f7column[this.state.curSearch] ?
          this.state.f7column[this.state.curSearch].columns : [];
        return (

          <Form onSubmit={this.handleSubmit}>
              <Row gutter={24} type="flex">
                  {formItems}
              </Row>
              <Modal visible={this.state.visible}
                     onOk={this.handleModalOk}
                     onCancel={this.handleModalCancel}
                     width={800}
                     footer={null}
              >

                  <Table scroll={{x: 800, y: 320}}
                         onRow={(record) => {
                             return {
                                 onClick: () => {
                                     this.handleSearchRowSelect(record);
                                 }
                             }
                         }}
                         dataSource={this.state.searchData}
                         columns={f7columns}
                         rowKey="_id"
                         pagination={{
                             position: 'bottom', total: this.state.totalcount,
                         }}
                  />
              </Modal>
              <Row style={{marginTop: "30px"}}>
                  <Col sm={{span: 8, offset: 6}}
                       xs={{span: 8, offset: 1}}>
                      <FormItem>
                          <Button type="primary" htmlType='submit'>提交</Button>
                      </FormItem>
                  </Col>
                  <Col sm={{span: 8}}
                       xs={{span: 8}}>
                      <FormItem>
                          <Button type="primary" onClick={this.handleReset}>重置</Button>
                      </FormItem>
                  </Col>
              </Row>
          </Form>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        var dataSource = props.dataSource;
        var columns = props.columns;
        var columnsValue = {};
        for (var key in dataSource) {

            var value = props.dataSource[key];
            columns.map((item, index) => {
                if (key == item.key) {
                    if (item.type == Date) {
                        value = moment(value);
                    } else if (item.f7 && item.f7.table) {
                        if (value) {
                            value = value[item.f7.showFiled]
                        }
                    } else if (formUtil.isColumnSelect(item) && item.type == Object) {
                        if (value) {
                            value = value.value;
                        }
                    }
                }
            })
            columnsValue[key] = Form.createFormField({
                ...props[key],
                value: value,
            })
        }
        return columnsValue;
    }
})(PageForm);
