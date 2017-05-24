package szy.com.hotrntest.rn_modules;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

import szy.com.hotrntest.rn_framework.BaseRNModule;

/**
 * Created by songzhiyang on 2017/4/26.
 */

public class StartNewActivityModule extends BaseRNModule {
    private static String ANDROID_ACTIVITY_STARTER = "AndroidActivityStarter";
    private static String TEST_CONSTANTS = "test_constants";

    public StartNewActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    protected void setRNConstants(Map<String, Object> rnConstantsMap) {
        rnConstantsMap.put(TEST_CONSTANTS,"test");
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
