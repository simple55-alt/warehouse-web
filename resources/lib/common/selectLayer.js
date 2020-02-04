//独立的部门菜单的选择弹出层
function openDeptSelecter(pid,callBack){
    layui.use(['form', 'table', 'layer', 'treeTable', 'laydate'], function () {
        var form = layui.form;
        var table = layui.table;
        var layer = layui.layer;
        var laydate = layui.laydate;
        var treeTable = layui.treeTable;
        var tableSelectIns;
        
        selDeptIndex = layer.open({
            type: 1,
            title: '添加部门',
            btn:['<span class="layui-icon layui-icon-ok"> 确定</span>'],
            btnAlign:'c',
            content:'<div style="padding: 15px;"><table class="layui-hide" id="deptSelectTable" lay-filter="deptTable"></table></div>',
            area: ['811px', '500px'],
            yes:function(index){
                //得到选择的ID和名称
                var ckData = tableSelectIns.checkStatus();
                callBack(ckData[0].id,ckData[0].title);
                layer.close(selDeptIndex);
            },
            success: function (index) {
                tableSelectIns = treeTable.render({
                    tree: {
                        iconIndex: 2,  // 折叠图标显示在第几列
                        idName: 'id',  // 自定义id字段的名称
                        pidName: 'pid',  // 自定义标识是否还有子节点的字段名称
                        isPidData: true  // 是否是pid形式数据
                    },
                    elem: '#deptSelectTable',
                    cellMinWidth: true,
                    cols: [
                        { type: "numbers",width:50,align:"center"},
                        { type: "radio" ,title:'请选择',width:75,align:"center"},
                        { field: 'title', title: '部门名称',width:273},
                        { field: 'remark', title: '部门备注',width:233, align: "center"},
                        { field: 'address', title: '部门地址',width:150, align: "center"},
                    ],
                    reqData: function (data, callback) {
                        // 在这里写ajax请求，通过callback方法回调数据
                        $.get(api + 'dept/loadAllDept', function (res) {
                            callback(res.data);  // 参数是数组类型
                            //设置选中数据
                            tableSelectIns.setChecked([pid]);
                        });
                    }
                });
            }
        });
    
    });
}