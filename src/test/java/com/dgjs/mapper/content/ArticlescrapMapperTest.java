package com.dgjs.mapper.content;

import java.math.BigDecimal;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
import com.dgjs.model.persistence.Articlescrap;

@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration(locations = "classpath:spring-mybatis.xml") 
public class ArticlescrapMapperTest {

	@Autowired
	ArticlescrapMapper mapper;
	
	@Test
	public void testListArticlescrap(){
		List<Articlescrap> list=mapper.listArticlescrap(null);
		System.out.println(JSON.toJSONString(list, true));
	}
	
	public static void main(String[] args) {
	}
}
