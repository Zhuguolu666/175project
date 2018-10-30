import $ from '../func/request.js';

export function testGetApi(url,param,success){
  $.getAjax(url, param, success)
};

export function testPostApi(url, param, success) {
  $.postAjax(url, param, success)
};