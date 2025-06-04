package project.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private boolean devmode;

    public boolean isDevmode() {
        return devmode;
    }

    public void setDevmode(boolean devmode) {
        this.devmode = devmode;
    }
}
