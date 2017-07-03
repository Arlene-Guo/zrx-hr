package com.zrx.hr.json.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 
 * Description: 布尔型转整型序列化 <br/>
 *
 * @author wangxiaoming
 * @date 2016年4月18日 下午4:20:26
 *
 */
public class BooleanToIntSerializer extends JsonSerializer<Boolean> {

    @Override
    public void serialize(Boolean value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        if (null == value) {
            return;
        }
        gen.writeNumber(value ? 1 : 0);
    }
}
