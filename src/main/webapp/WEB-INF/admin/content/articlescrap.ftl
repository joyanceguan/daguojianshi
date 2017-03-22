<!DOCTYPE html>
<html lang="en">
<head>
<#include "/admin/common/head_title.ftl">
<script src="${contextPath}/admin/js/jquery-1.11.1.min.js"></script>
<script language="javascript" src="${contextPath}/admin/js/My97DatePicker/wdatePicker.js"></script>
<script src="${contextPath}/admin/js/support-fileupload.js"></script>
<script src="${contextPath}/admin/js/ajaxfileupload.js"></script>
<script src="${contextPath}/admin/js/validation/jquery.validate.js"></script>
</head>
<body marginwidth="0" marginheight="0">
	<div class="container">
		<div class="public-nav">您当前的位置：<a href="">内容管理</a>><a href="">轮播图管理</a>><a href="javascript:void(0)">添加文章</a></div>
		<div class="public-content">
			<div class="public-content-header">
				<h3>添加文章</h3>
			</div>
			<div class="public-content-cont">
			<form action="${contextPath}/admin/saveArticlescrap" method="post" enctype="multipart/form-data" id="articlescrapForm">
			    <input type="hidden" name="id" value="${(articlescrap.id)!''}">
			    <input type="hidden" name="status" value="${(articlescrap.status)!'DOWN'}">
			    <input type="hidden" name="show_picture" value="${(articlescrap.show_picture)!''}">
			    <fieldset>    
			    <div class="form-group">
					<label for="">文章标题</label>
					<input class="form-input-txt" type="text" name="title" value="${(articlescrap.title)!''}" maxlengt="100"/>
				</div>
				<div class="form-group">
				    <label for="">文章精简内容</label>
				    <textarea style="margin: 0px; width: 690px; height: 125px;" name="sub_content" maxlength="500">${(articlescrap.sub_content)!''}</textarea>
			    </div>
			    <div class="form-group">
				    <label for="">展示图片</label>
				    <img src="<#if articlescrap.show_picture??>${imageContextPath}${articlescrap.show_picture}</#if>" id="showImage" style="width:200px;height:200px;<#if articlescrap.show_picture??>display:block;<#else>display:none;</#if>">
				    <div class="file"><input type="file" class="form-input-file" id="uploadImage" name="uploadImage"/>选择文件</div>
				    <div class="file"><input type="button" class="form-input-file" id="buttonUpload" onClick="return ajaxFileUpload();">上传</div>
			    </div>
				<div class="form-group">
					<label for="">文章展示时间</label>
					<input type="text" name="showTime" value="<#if articlescrap.show_time??>${articlescrap.show_time?datetime}</#if>" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});" class="Wdate" style="width:150px"/>
				</div>
				<div class="form-group">
					<label for="">分类</label>
					<select name="type" class="form-select">
					   <#list types as type>
					     <option value="${type}">${type.value}</option>
					   </#list>
				    </select>
				</div>
				<div class="form-group">
					<label for="">作者</label>
					<input class="form-input-txt" type="text" name="author" value="${(articlescrap.author)!''}" maxlength="255" />
				</div>
				<div class="form-group">
				    <label for="">是否上架：</label>
				    <input style="margin-top:9px" type="checkbox" id="status" value="DOWN" <#if articlescrap.status.key?? && articlescrap.status.key==1>checked</#if> />
			    </div>
			    <!--
			    <div class="form-group">
				    <label for="">文章内容</label>
				    <input class="form-input-txt" type="text" name="content" value="${(articlescrap.content)!''}" />
			    </div>
			    -->
			    <div class="form-group">
				    <label for="">文章内容</label>
				    <textarea id="editor_id" name="content"  class="form-input-textara" style="width:700px;height:300px;">
				          ${(articlescrap.content)!''}
				    </textarea> 
			    </div>
				<div class="form-group" style="margin-left:150px;">
					<input type="submit" class="sub-btn" value="提  交" />
					<input type="reset" class="sub-btn" value="重  置" />
				</div>
				</fieldset>
				</form>
			</div>
		</div>
	</div>
	
	<script src="${contextPath}/admin/js/kingediter/kindeditor-all-min.js"></script>
	<script>
		 KindEditor.ready(function(K) {
	                window.editor = K.create('#editor_id');
	        });
	</script>
	<script type="text/javascript">
	$("#status").click(function(){
		if($('#status').is(':checked')) {
			   $("input[name='status']").val("UP");
		}else{
			$("input[name='status']").val("DOWN");
		}
	});
	function ajaxFileUpload()
	{
	    var contextPath="${contextPath}";
	    var imageContextPath="${imageContextPath}";
	    var uploadFileName="articlescrap";
	    $.ajaxFileUpload
	    (
	        {
	        	async:false,
	            url:contextPath+'/admin/ajaxUpload?imagePath='+uploadFileName,//这个是要提交到上传的php程序文件
	            secureuri:false,
	            fileElementId:'uploadImage',//这里是你文件上传input框的id
	            dataType: 'json',
	            success: function (result)
	            {
	                if(typeof(result.error) != 'undefined')
	                {
	                    if(result.error != '')
	                    {
	                        alert(result.errorMessage);//如有错误则弹出错误
	                    }else
	                    {
	                    	var accessPath=imageContextPath+result.imageUrl;
	                        $("#showImage").attr("src",accessPath);
	                        $("input[name='show_picture']").val(result.imageUrl);
	                        $("#showImage").show();
	                    }
	                }
	            },
	            error: function (result, status, e)
	            {
	                alert(e);
	            }
	        }
	    )
	}
	
	$().ready(function() {
		// 在键盘按下并释放及提交后验证提交表单
		  $("#articlescrapForm").validate({
		    rules: {
			  title: {
		        required: true,
		        rangelength:[1,100]
		      },
		      sub_content: {
		        required: true,
		        rangelength:[1,500]
		      },
		      showTime: {
			    required: true
			  },
			  author:{
				required: true,
				rangelength:[1,20]
			  },
			  content:{
			    required: true
			  }
		    },
		    messages: {
		      title: {
		        required: "请输入文章标题",
		        rangelength:"请输入字符在1-100之间"
		      },
		      sub_content: {
		    	required: "请输入文章精简内容",
		    	rangelength:"请输入字符在1-500之间"
		      },
		      showTime: {
			    required: "请输入文章展示时间"
			  },
			  author:{
			    required: "请输入作者",
			    rangelength:"作者名字长度在1-20之间"
			  },
			  content:{
				required: "请输入文章内容"
			  }
		    },
		    submitHandler:function(form){
	           var content=$("#editor_id").val();
	           if(content.val()==''){
	        	   alert("请输入文章内容")
	           }else if($("input[name='show_picture']").val()==''){
	        	   alert("请选择展示图片")
	           }else{
	               form.submit();
	           }
	        }    
		});
	});
	</script>
</body>
</html>