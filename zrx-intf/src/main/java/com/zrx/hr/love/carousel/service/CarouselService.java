package com.zrx.hr.love.carousel.service;


import java.util.List;

import com.zrx.hr.love.carousel.domain.CarouselVO;
import com.zrx.hr.love.carousel.domain.ResponseCarouselVo;

public interface CarouselService {

    ResponseCarouselVo saveOrUpdateCarousel(List<CarouselVO> records);
    
    List<CarouselVO> getCarouselListAll();
}
