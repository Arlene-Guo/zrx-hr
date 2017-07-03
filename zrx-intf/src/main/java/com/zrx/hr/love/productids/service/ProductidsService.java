package com.zrx.hr.love.productids.service;

import java.util.List;

import com.zrx.hr.love.productids.domain.ProductidsVO;

public interface ProductidsService {
    
    int saveOrUpdateProductIds(List<ProductidsVO> records);

    List<ProductidsVO> getProductidsListAll();
}
