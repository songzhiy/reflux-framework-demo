package szy.com.hotrntest;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;

/**
 * Created by songzhiyang on 2017/4/21.
 */

public class RNActivity extends ReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new RNActivityDelegate(this,getMainComponentName());
    }

    public static class RNActivityDelegate extends ReactActivityDelegate{

        public RNActivityDelegate(Activity activity, @Nullable String mainComponentName) {
            super(activity, mainComponentName);
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
        }
    }


}
