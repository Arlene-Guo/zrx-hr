package com.zrx.hr.sql.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SqlBackMapper {

	public List<?> queryDataBySql(@Param("preQuerySql") String preQuerySql);

	public int deleteDataBySql(@Param("preDeleteSql") String preDeleteSql);

	public int addDataBySql(@Param("preAddSql") String preAddSql);

	public int updateDataBySql(@Param("preUpdateSql") String preUpdateSql);
	
}
