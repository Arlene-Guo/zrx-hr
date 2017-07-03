package com.zrx.hr.json.deserializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.zrx.hr.common.constants.OrderChannel;

/**
 * Description: 资源类型反序列化 <br/>
 *
 * @author wangxiaoming
 * @date 2016年11月5日 上午11:34:20
 *
 */
public class OrderChannelDeserializer extends JsonDeserializer<OrderChannel> {

    @Override
    public OrderChannel deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        int value = jp.getNumberValue().intValue();
        return OrderChannel.valueOf(value);
    }
}
