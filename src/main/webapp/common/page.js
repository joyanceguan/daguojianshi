var totalheight = 0;
var currentPage = 1;
var isonload = true;
function loadData(keyword){   
	    var url = contextPath+"/list?currentpage="+currentPage+"&type="+$("#doctype").val();
	    if(keyword!=null&&keyword!=''){
	    	url+="&keyword="+keyword;
	    }
        jQuery.ajax({
            type:"POST",
            url: url,async: false,
            dataType: "json",
            success:function(data) {
                var ctntary = eval(data.pageInfo.objects);
                if(ctntary && ctntary.length > 0){
                	appendCtntTmp(ctntary,data.imageContextPath,data.visits);
                }
            }, 
            error:function(){
                console.log("加载失败");
            }
        });   
}
function cre(str){
	return new RegExp(str,"gm");
}
function appendCtntTmp(ctntary,imageContextPath,visits){
	var list = "";
	for(var i=0;i<ctntary.length;i++){
		var val = ctntary[i];
		var ctntTmp = "<article class='excerpt excerpt-1' onclick='location.href=\"contextPath/show/articlescrap_id\"'><a class='focus' href='contextPath/show/articlescrap_id' title='articlescrap_title'>"+
					  "<img class='thumb' data-original='contextPath/front/images/list/timg3.jpeg' src='imageContextPatharticlescrap_show_picture' style='display:inline;'>"+
					  "</a><header><a class='cat' href='javascript:void(0)' title='articlescrap_type_value'>articlescrap_type_value<i></i></a><h2>"+
					  "<a href='contextPath/show/articlescrap_id' title='articlescrap_title'>articlescrap_title</a></h2></header><p class='meta'>"+
					  "<time class='time'><i class='glyphicon glyphicon-time'></i> articlescrap_start_time</time><span class='views' id='new_visit_articlescrap_id'>"+
					  "<i class='glyphicon glyphicon-eye-open'></i> visits</span></p><p class='note'>articlescrap_sub_content</p></article>";
		list += ctntTmp.replace(cre("articlescrap_id"),val.id)
			.replace(cre("contextPath"),contextPath)
			.replace(cre("articlescrap_title"),val.title)
			.replace(cre("articlescrap_show_picture"),val.show_picture)
			.replace(cre("articlescrap_type_value"),val.typeValue)
			.replace(cre("articlescrap_start_time"),val.start_time)
			.replace(cre("imageContextPath"),imageContextPath)
			.replace(cre("articlescrap_sub_content"),val.sub_content)
			.replace(cre("visits"),visits[val.id]);
	}
	$('#content_t').append(list);
	currentPage++;
}
$(window).scroll(function(){
	totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height() <= totalheight) {
       loadData(keyword);
    }
});
window.onload=function(){
	if(keyword!=''&&keyword!=null){
		$("input[name='keyword']").val(keyword);
		searchByKeyword('index');
	}else{
		loadData(keyword);
	}
};
