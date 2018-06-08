import Categorylist from './categorylist'
import Categorydetail from './categorydetail'

import Projectdetail from './projectdetail'
import Groupdetail from './groupdetail'

import Modeldetail from './modeldetail'
import Modellist from './modellist'

const route = {
    product: {
        title: "业务建模",
        path: "/model",
        icon: "appstore-o",
        child: [
            {path: "/project", title: "项目配置", component: Projectdetail},
            {path: "/group", title: "业务分组", component: Groupdetail},
            {path: "/category", title: "分类管理", component: Categorylist, editable: true},
            {path: "/category_add", title: "新增分类", component: Categorydetail, isMenu: false},
            {path: "/model", title: "业务建模", component: Modellist, editable: true},
            {path: "/model_add", title: "新增业务单元", component: Modeldetail, isMenu: false}
        ]
    },
}

module.exports = {
    route: route
}