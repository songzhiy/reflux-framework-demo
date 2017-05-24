package szy.com.hotrntest.rn_framework;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by songzhiyang on 2017/5/23.
 */

/**
 * Native给RN提供服务的BaseModule
 */
public abstract class BaseRNModule extends ReactContextBaseJavaModule{

    private Map<String,Object> rnConstants = new HashMap();

    public BaseRNModule(ReactApplicationContext reactContext) {
        super(reactContext);
        setRNConstants(rnConstants);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return rnConstants;
    }

    /**
     * 该map用于native给rn输出Constants 如果没有对外输出 可以空实现
     * @param rnConstantsMap
     */
    protected abstract void setRNConstants(Map<String,Object> rnConstantsMap);
}
