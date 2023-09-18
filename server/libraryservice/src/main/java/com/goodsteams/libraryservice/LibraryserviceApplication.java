package com.goodsteams.libraryservice;

import com.goodsteams.libraryservice.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class LibraryserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryserviceApplication.class, args);
	}

}
