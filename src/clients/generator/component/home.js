import React from 'react'
import {Breadcrumb, Layout, Menu, Icon, Row, Col, Select} from 'antd';
import {Link, Route} from 'react-router-dom'

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

import SelectProject from './selectproject'

import {route} from './menu'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            editable: false,
            addpath: {},
            collapsed: false,
            defaultSelectedKeys: [],
            defaultOpenKeys: [],
        }
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    }

    onSelect = (item) => {
        console.log("onSelect", item)
        var visiable = this.getAddBtnVisiable(item);
        this.setState({
            addpath: visiable.addpath,
            editable: visiable.editable,
        });
    }

    getAddBtnVisiable = (item) => {
        var visiable;
        for (var key in route) {
            var menuItem = route[key]
            menuItem.child.map((subMenuItem) => {
                if (item.key == subMenuItem.path.replace('/', '')) {
                    if (subMenuItem.editable == undefined || !subMenuItem.editable) {
                        visiable = {editable: false}
                    } else {
                        visiable = {
                            addpath: {add: menuItem.path + subMenuItem.path + "_add"},
                            editable: true,
                        }
                    }
                }
            })
        }
        return visiable;
    }

    setDefaultSelect() {
        console.log("match.path", this.props.match.path)
        if (this.props.location.pathname == this.props.match.path) {
            this.props.location.pathname = route.product.path + route.product.child[0].path
        }
        var selects = this.props.location.pathname.split("/")
        console.log("selects", selects)
        this.state.defaultOpenKeys = new Array(selects[selects.length - 2])
        this.state.defaultSelectedKeys = new Array(selects[selects.length - 1])
        var visiable = this.getAddBtnVisiable({key: selects[selects.length - 1]});
        if (visiable) {
            this.state.addpath = visiable.addpath;
            this.state.editable = visiable.editable;
        }
    }

    createMenu() {
        var breadcrumbNameMap = {}
        var submenus = []
        var routers = []
        for (var key in route) {
            var menuItem = route[key]
            breadcrumbNameMap[menuItem.path] = menuItem.title
            var subMenuItems = []
            menuItem.child.map((subMenuItem) => {

                var path = menuItem.path + subMenuItem.path

                breadcrumbNameMap[path] = subMenuItem.title
                routers.push(
                  <Route key={path} path={path} component={subMenuItem.component}/>)

                if (subMenuItem.isMenu == undefined || subMenuItem.isMenu) {
                    subMenuItems.push(
                      <Menu.Item key={subMenuItem.path.replace('/', '')}>
                          <Link to={path}>{subMenuItem.title}</Link>
                      </Menu.Item>)
                }
            })

            submenus.push(
              <SubMenu
                key={menuItem.path.replace('/', '')} title={
                  <span><Icon type={menuItem.icon}/><span>{menuItem.title}</span></span>}>
                  {subMenuItems}
              </SubMenu>)
        }
        return {submenus, breadcrumbNameMap, routers}
    }

    render() {
        this.setDefaultSelect()

        var {submenus, breadcrumbNameMap, routers} = this.createMenu()

        const {location} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            console.log(url)
            return (
              <Breadcrumb.Item key={url}>
                  <Link to={url}>
                      {breadcrumbNameMap[url]}
                  </Link>
              </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [].concat(extraBreadcrumbItems);
        return (
          <Layout style={{minHeight: '100vh'}}>
              <Sider
                breakpoint="lg"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                  <div className="logo"/>
                  <Menu onSelect={this.onSelect} theme="dark" defaultSelectedKeys={this.state.defaultSelectedKeys}
                        defaultOpenKeys={this.state.defaultOpenKeys} mode="inline">
                      {submenus}
                  </Menu>
              </Sider>
              <Layout>
                  <Header style={{background: '#fff', padding: 0}}>
                      <SelectProject/>
                  </Header>
                  <Content style={{margin: '0 16px'}}>
                      <Row>
                          <Col span={16}>
                              <Breadcrumb style={{margin: '16px 0'}}>
                                  {breadcrumbItems}
                              </Breadcrumb>
                          </Col>
                          <Col span={4} offset={3} style={{lineHeight: "50px", textAlign: "center"}}>
                              <Link to={this.state.addpath ? this.state.addpath.add : ""}
                                    style={{display: this.state.editable ? "block" : "none", fontSize: "18px"}}>
                                  <Icon type="plus-circle-o"/> 新增
                              </Link>
                          </Col>
                      </Row>

                      <div style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom: 20,
                          background: '#fff',
                          minHeight: 420,
                      }}>
                          <div className="home_content">
                              {routers}
                          </div>
                      </div>
                  </Content>
                  <Footer style={{textAlign: 'center'}}>
                      Ant Design ©2016 Created by Ant UED
                  </Footer>
              </Layout>
          </Layout>
        )
    }
}