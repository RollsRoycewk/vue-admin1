import request from "@/utils/request";

const api_name = "/admin/product/baseTrademark";

export default {
  /* 获取所有商品列表 */
  getPageList(page, limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: "GET"
    });
  },
  /* 增加商品 */
  addPageList(data) {
    return request({
      url: `${api_name}/save`,
      method: "POST",
      data
    });
  },
  /* 删除商品 */
  delPageList(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "DELETE"
    });
  },
  /* 更新商品 */
  updataPageList() {
    return request({
      url: `${api_name}/update`,
      method: "PUT"
    });
  }
};
