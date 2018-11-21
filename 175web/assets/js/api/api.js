import $ from '../func/request.js';

export function queryCustomer(url,param,success){
  $.getAjax(url, param, success)
};

export function insertCustomer(url, param, success) {
  $.postAjax(url, param, success)
};