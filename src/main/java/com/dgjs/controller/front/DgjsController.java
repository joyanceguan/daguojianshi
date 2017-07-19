package com.dgjs.controller.front;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.dgjs.model.dto.business.Articlescrap;
import com.dgjs.model.enums.Articlescrap_Type;
import com.dgjs.model.enums.UpDown_Status;
import com.dgjs.model.persistence.Carousel;
import com.dgjs.service.common.PictureService;
import com.dgjs.service.content.CarouselService;
import com.dgjs.service.content.RecommedArticlescrapService;

@Controller
@RequestMapping("/m")
public class DgjsController {

	@Autowired
	CarouselService carouselService;
	@Autowired
	RecommedArticlescrapService recommedArticlescrapService;
	@Autowired
	PictureService pictureService;
	
	@RequestMapping("/index")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response,Articlescrap_Type type,String keyword) throws Exception {  
		ModelAndView mv = new ModelAndView("front/dgjs");
		//加载轮播
		Carousel c=new Carousel();
		c.setStatus(UpDown_Status.UP);
		List<Carousel> carouselList=carouselService.listCarousel(c);
		mv.addObject("carouselList", carouselList);
		//加载推荐文章
		List<Articlescrap> rAEList=recommedArticlescrapService.list(UpDown_Status.UP);
		mv.addObject("rAEList", rAEList);
		mv.addObject("imageContextPath", pictureService.getImageContextPath());
		//加载分类
		mv.addObject("types", Articlescrap_Type.values());
		//加载页面类型
		mv.addObject("doctype",type);
		//加载搜索条件
		mv.addObject("keyword", keyword);
		return mv;
    }
}
