
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) ansi 
// Source File Name:   TableInfo.java

package com.zrx.hr.common.util.excel;

import java.io.Serializable;
import java.util.List;

// Referenced classes of package com.signway.cdms.model:
//            Organization, User

public class TableInfo
    implements Serializable
{

    public TableInfo()
    {
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return StringUtil.filterHTMLinput(title);
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getContent_color()
    {
        return content_color;
    }

    public void setContent_color(String content_color)
    {
        this.content_color = content_color;
    }

    public String getContent_size()
    {
        return content_size;
    }

    public void setContent_size(String content_size)
    {
        this.content_size = content_size;
    }

    public String getContent_face()
    {
        return content_face;
    }

    public void setContent_face(String content_face)
    {
        this.content_face = content_face;
    }

    public String getBg_color()
    {
        return bg_color;
    }

    public void setBg_color(String bg_color)
    {
        this.bg_color = bg_color;
    }

    public String getGrid_color()
    {
        return grid_color;
    }

    public void setGrid_color(String grid_color)
    {
        this.grid_color = grid_color;
    }

    public String getCreate_time()
    {
        return create_time;
    }

//    public User getCreatorUser()
//    {
//        return creatorUser;
//    }

//    public void setCreatorUser(User creatorUser)
//    {
//        this.creatorUser = creatorUser;
//    }
//
//    public User getUpdateUser()
//    {
//        return updateUser;
//    }

//    public void setUpdateUser(User updateUser)
//    {
//        this.updateUser = updateUser;
//    }

    public void setCreate_time(String create_time)
    {
        this.create_time = create_time;
    }

    public String getUpdate_time()
    {
        return update_time;
    }

    public void setUpdate_time(String update_time)
    {
        this.update_time = update_time;
    }

    public String getRemark()
    {
        return StringUtil.filterHTMLinput(remark);
    }

    public void setRemark(String remark)
    {
        this.remark = remark;
    }

//    public Organization getOrganization()
//    {
//        return organization;
//    }

//    public void setOrganization(Organization organization)
//    {
//        this.organization = organization;
//    }

    public static long getSerialVersionUID()
    {
        return 0x6b1355c49a976201L;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status)
    {
        this.status = status;
    }

    public String getTitle_color()
    {
        return title_color;
    }

    public void setTitle_color(String title_color)
    {
        this.title_color = title_color;
    }

    public String getTitle_size()
    {
        return title_size;
    }

    public void setTitle_size(String title_size)
    {
        this.title_size = title_size;
    }

    public String getTitle_face()
    {
        return title_face;
    }

    public void setTitle_face(String title_face)
    {
        this.title_face = title_face;
    }

    public List getColumns()
    {
        return columns;
    }

    public void setColumns(List columns)
    {
        this.columns = columns;
    }

    public List getValues()
    {
        return values;
    }

    public void setValues(List values)
    {
        this.values = values;
    }

    public String getPath()
    {
        return path;
    }

    public void setPath(String path)
    {
        this.path = path;
    }

    public String getIs_normal()
    {
        return is_normal;
    }

    public void setIs_normal(String is_normal)
    {
        this.is_normal = is_normal;
    }

    private static final long serialVersionUID = 0x6b1355c49a976201L;
    private String id;
    private String title;
    private String name;
    private String title_color;
    private String title_size;
    private String title_face;
    private String content_color;
    private String content_size;
    private String content_face;
    private String bg_color;
    private String grid_color;
//    private Organization organization;
//    private User creatorUser;
    private String create_time;
//    private User updateUser;
    private String update_time;
    private String status;
    private String is_normal;
    private String remark;
    private String path;
    private List columns;
    private List values;
}
