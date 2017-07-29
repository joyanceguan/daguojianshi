window.onload=function(){
	shishi();
	zhengshi();
};

function shishi(){
	jQuery.ajax({
        type:"POST",
        url: contextPath+"/idxAfis",
        async: true,
        dataType: "json",
        success:function(data) {
            var list = data.list;
            var moreLink = data.moreLink;
            var position1 = 2;
            var content="";
            for(var i=0;i<list.length;i++){
            	var item = list[i];
            	if(i < position1){
            		content+=shishi1.replace(rplc("aId"),item.aid)
            		      .replace(rplc("picUrl"),item.pictures[0])
            		      .replace(rplc("atitle"),item.title)
            		      .replace(rplc("start_time"),item.start_time)
            		      .replace(rplc("contextPath"),contextPath);
            	}else{
            		content+=shishi2.replace(rplc("aId"),item.aid)
            		      .replace(rplc("atitle"),item.title) 
            		      .replace(rplc("sub_content"),item.sub_content)
            		      .replace(rplc("contextPath"),contextPath);
            	}
            }
            $("#shishi").html(content);
            $("#shishimore").attr("href",moreLink);
        }, 
        error:function(){
            console.log("加载失败");
        }
    });   
}

function zhengshi(){
	jQuery.ajax({
        type:"POST",
        url: contextPath+"/idxhstry",
        async: true,
        dataType: "json",
        success:function(data) {
            var list = data.list;
            var moreLink = data.moreLink;
            var position1 = 1;
            var content="";
            for(var i=0;i<list.length;i++){
            	var item = list[i];
            	if(i < position1){
            		content+=zhengshi1.replace(rplc("aId"),item.aid)
            		      .replace(rplc("contextPath"),contextPath)
            		      .replace(rplc("sub_content"),item.sub_content)
            		      .replace(rplc("picUrl1"),item.pictures[0])
            		      .replace(rplc("picUrl2"),item.pictures[1])
            		      .replace(rplc("picUrl3"),item.pictures[2]);
            	}else{
            		content+=zhengshi2.replace(rplc("aId"),item.aid)
            	       	 .replace(rplc("sub_content"),item.sub_content)
            	       	 .replace(rplc("atitle"),item.title)
            	       	.replace(rplc("contextPath"),contextPath);
            	}
            }
            $("#zhengshi").html(content);
            $("#zhengshimore").attr("href",moreLink);
        }, 
        error:function(){
            console.log("加载失败");
        }
    });   
}

function rplc(str){
	return new RegExp(str,"gm");
}

var shishi1="<article class=\"excerpt listright\" onclick=\"location.href='contextPath/show/aId'\">"
	   +"<a class=\"focus\" href=\"javascript:void(0)\">"
	   +"<img class=\"thumb\" src=\"contextPathpicUrl\" style=\"display:inline;\">"
	   +"</a><header>"
	   +"<a class=\"cat\" href=\"javascript:void(0)\">冰岛<i></i></a></h2>"
	   +"<h2><a href=\"javascript:void(0)\">atitle</a></header>"
       +"<p class=\"meta\">"
	   +"<time class=\"time\"><i class=\"glyphicon glyphicon-time\"></i>start_time</time>"	
	   +"</p></article>";
var shishi2="<article class=\"excerpt listtext\" onclick=\"location.href='contextPath/show/aId'\">"
	   +"<header><h2><a href=\"javascript:void(0)\" >&bull;&nbsp atitle</a></h2></header>"
	   +"<p class=\"note\" style=\"display:block\">sub_content</p></article>";
var zhengshi1="<article class=\"excerpt threeimg\" onclick=\"location.href='contextPath/show/aId'\">"
	   +"<div class='diliimg'><img class=\"itemimg\" src=\"contextPathpicUrl1\"></div>"
	   +"<div class='diliimg'><img class=\"itemimg\" src=\"contextPathpicUrl2\"></div>"
	   +"<div class='diliimg'><img class=\"itemimg\" src=\"contextPathpicUrl3\"></div>"
	   +"<p style=\"text-align: right;padding-right: 10px;color: cadetblue;font-size: .5em;\">sub_content</p></article>";
var zhengshi2="<article class=\"excerpt listtext\" onclick=\"location.href='contextPath/show/aId'\">"
	   +"<header><h2><a href=\"javascript:void(0)\" >&bull;&nbsp atitle</a></h2></header>"
	   +"<p class=\"note\" style=\"display:block\">sub_content</p></article>";
			
	
	

	