package com.dgjs.service.content;

import java.util.List;

import com.dgjs.model.persistence.Carousel;

public interface CarouselService {

    public int saveCarousel(Carousel carousel);
	
	public List<Carousel> listCarousel(Carousel carousel);
	
	public Carousel selectById(Long id);
	
	public int deleteById(Long id);
	
	public int updateCarousel(Carousel carousel);
	
	public int saveOrUpdateCarousel(Carousel carousel);
}
