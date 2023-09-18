package com.goodsteams.wishlistservice;

import com.goodsteams.wishlistservice.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class WishlistserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WishlistserviceApplication.class, args);
	}

}
