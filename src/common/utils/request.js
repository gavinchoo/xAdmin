import fetch from 'isomorphic-fetch'
import {message} from 'antd'
import {Config} from '../actions/constant/config'

import StringUtil from './stringutil'
import HttpState from '../actions/constant/httpstate'

export function requestPost(route, opt) {
    request(route, {}, opt.props, opt.success, opt.error,
      {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(opt.body)
      })
}

export function requestGet(route, opt) {
    request(route, {}, opt.props, opt.success, opt.error,
      {
          method: 'POST',
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: StringUtil.bodyUrlencoded(opt.body)
      })
}

export function request(route, params, props, success = null, error = null, {method = 'GET', headers = {}, body = null} = {}) {
    // dispatch({ type: TYPES.REQUEST_PEDDING, [pendingTasks]: begin })
    // if (method !== 'GET') dispatch({ type: TYPES.REQUEST_LOADING })
    // 处理query
    const p = params ? '?' + Object.entries(params).map((i) => `${i[0]}=${encodeURI(i[1])}`).join('&') : '';
    const uri = `${ Config.baseUrl }${ route }${ p }`;

    var token = sessionStorage.getItem('token')
    console.log('cache token === ' + token)
    if (token !== 'undefined' && token != null) {
        headers['Authorization'] = token
    }

    let data = {method: method, headers: headers}
    if (method !== 'GET') data.body = body
    fetch(uri, data)
      .then((response) => {
          if (response.status === 401) {
              message.warn('登录认证已过期，请从新登录');
              props.history.push(Config.loginPage);
          }
          return response.json();
      })
      .then((result) => {
          console.log("requst url ", `[${method}]:${uri}`)
          console.log("result ", result)
          if (route == Config.tokenUrl) {
              sessionStorage.setItem('token', result.data.token)
          }
          if (result.code == HttpState.REQ_SUCCESS) {
              success && success(result)
          } else {
              error && error(result)
          }
      })
      .catch((err) => {
          if (err) {
              console.warn(err)
          }
      })
}