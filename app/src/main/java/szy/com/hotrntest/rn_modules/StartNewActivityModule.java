package szy.com.hotrntest.rn_modules;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by songzhiyang on 2017/4/26.
 */

public class StartNewActivityModule extends ReactContextBaseJavaModule {
    private static String ANDROID_ACTIVITY_STARTER = "AndroidActivityStarter";


    public StartNewActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return ANDROID_ACTIVITY_STARTER;
    }

    @ReactMethod
    private void startActivity(String className) {
        Activity activity = getCurrentActivity();
        try {
            Class clazz = Class.forName(className);
            activity.startActivity(new Intent(activity,clazz));
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    private void startActivityFinishCurrent(String className) {
        Activity activity = getCurrentActivity();
        try {
            Class clazz = Class.forName(className);
            activity.startActivity(new Intent(activity,clazz));
            activity.finish();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
