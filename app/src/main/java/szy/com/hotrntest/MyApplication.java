package szy.com.hotrntest;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.microsoft.codepush.react.CodePush;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;

import szy.com.hotrntest.rn_modules.rn_package.StartNewPageReactPackage;

/**
 * Created by songzhiyang on 2017/4/21.
 */

public class MyApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    public static ReactInstanceManager mReactInstanceManager;
    private final ReactNativeHost reactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> list = new ArrayList<>();
            list.add(new MainReactPackage());
            list.add(new StartNewPageReactPackage());
            list.add(new CodePush("Nxt6xIwzoLeIafX6ocZIOerPMH4LNyHEA5f0z", MyApplication.this, BuildConfig.DEBUG));
            return list;
        }

//        @Override
//        protected String getJSMainModuleName() {
//            return "index.android";
//        }
//
//        @Nullable
//        @Override
//        protected String getBundleAssetName() {
//            return "index.android.bundle";
//        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        mReactInstanceManager = reactNativeHost.getReactInstanceManager();
        return reactNativeHost;
    }
}
