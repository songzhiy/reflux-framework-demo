
package szy.com.hotrntest;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;

/**
 * Created by songzhiyang on 2017/4/26.
 */

public class WeatherDetailActivity extends ReactActivity {
    @Nullable
    @Override
    protected String getMainComponentName() {
        return "WeatherDetailContainer";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new WeatherDetailActivityDelegate(this,getMainComponentName());
    }

    static class WeatherDetailActivityDelegate extends ReactActivityDelegate {

        public WeatherDetailActivityDelegate(Activity activity, @Nullable String mainComponentName) {
            super(activity, mainComponentName);
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
        }
    }
}
