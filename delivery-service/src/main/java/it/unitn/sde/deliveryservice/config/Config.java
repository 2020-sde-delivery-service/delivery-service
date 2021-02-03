package it.unitn.sde.deliveryservice.config;

import java.time.Duration;
import java.util.concurrent.Executor;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.client.RestTemplate;
@Configuration
public class Config {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
      RestTemplate restTemplate = new RestTemplate();

      HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
      requestFactory.setConnectTimeout(3000);
      requestFactory.setReadTimeout(3000);
      return restTemplate;
      // restTemplate.setRequestFactory(requestFactory); 
      //   return builder
      //           .setConnectTimeout(Duration.ofMillis(3000))
      //           .setReadTimeout(Duration.ofMillis(3000))
      //           .build();
    }
    @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(2);
    executor.setQueueCapacity(500);
    executor.setThreadNamePrefix("DeliveryService-");
    executor.initialize();
    return executor;
  } 
}
