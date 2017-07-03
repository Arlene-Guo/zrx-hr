package com.zrx.hr.response.domain;

import java.util.List;

import lombok.Data;

/**
 * 
 * Description:分页实体类 
 * @author wangxiaoming
 * @date 2016年7月29日 下午4:20:53
 */
@Data
public class Page <T>{
	/**
	 * 当前页
	 */
	private int currentPage;
	/**
	 * 每页记录数
	 */
	private int pageSize = 10;
	/**
	 * 总页数
	 */
	private int totalPage;
	/**
	 * 总记录数
	 */
	private int totalCount;
	/**
	 * 列表数据
	 */
	private List<T> itemList;
	
	public int getTotalPage() {
		if(totalCount % pageSize == 0) {
			totalPage = totalCount / pageSize;
		} else {
			totalPage = totalCount / pageSize + 1;
		}
		return totalPage;
	}
	
	public int getStartRecord() {
        return (currentPage - 1) * pageSize;
    }
	
	public int getCurrentPage() {
		if(currentPage <= 0) {
			currentPage = 1;
		}
		return currentPage;
	}
}
