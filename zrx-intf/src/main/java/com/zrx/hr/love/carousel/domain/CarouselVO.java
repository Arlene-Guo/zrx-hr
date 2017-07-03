package com.zrx.hr.love.carousel.domain;

import lombok.Getter;
import lombok.Setter;


public class CarouselVO {
    
    @Setter
    @Getter
    private int id;
    
    @Setter
    @Getter
    private int position;
    @Setter
    @Getter
    private String titile;
    @Setter
    @Getter
    private int type;
    @Setter
    @Getter
    private String productId;
    
    @Getter
    private String imgUrl;
    
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setJumpUrl(String jumpUrl) {
        this.jumpUrl = jumpUrl;
    }

    @Getter
    private String jumpUrl;
    
}
