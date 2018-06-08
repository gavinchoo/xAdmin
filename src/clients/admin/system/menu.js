import FileList from './/file/filelist'
import FileAdd from './/file/fileadd'

import UserManage from './account/user.list'

const route = {
    file: {
        title: "文件管理",
        path: "/file",
        icon: "appstore-o",
        child: [
            {path: "/file", title: "文件管理", component: FileList},
            {path: "/file_add", title: "新增文件", component: FileAdd, isMenu: false},
        ]
    },
    account: {
        title: "系统管理",
        path: "/system",
        icon: "setting",
        child: [
            {path: "/user", title: "用户管理", component: UserManage},
        ]
    }
}

module.exports = {
    baseroute: route
}