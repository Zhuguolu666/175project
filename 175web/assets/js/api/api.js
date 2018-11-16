import $ from '../func/request.js';

export function getApi(url,param,success){
  $.getAjax(url, param, success)
};

export function postApi(url, param, success) {
  $.postAjax(url, param, success)
};