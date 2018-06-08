/**
 * @apiDefine  PageQuery
 * @apiParam {Number} page 分页页码
 * @apiParam {Number} pagesize 每页数据条数
 */

/**
 * @apiDefine  Success
 * @apiSuccess {String} status 结果码
 * @apiSuccess {String} message 消息说明
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code:1,
 *    message:'success',
 *    data:{}
 *   }
 */

/**
 * @apiDefine  QuerySuccess
 * @apiSuccess {String} status 结果码
 * @apiSuccess {String} message 消息说明
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    code:1,
 *    message:'success',
 *    data:{total:100, result:[]}
 *   }
 */

/**
 * @apiDefine  Error
 *  @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 200
 *  {
  *     code:0,
  *     message:'user not found',
  *   }
 */