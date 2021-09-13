package com.abc000.ImageShare;

import android.media.MediaPlayer;
import android.media.PlaybackParams;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.widget.Toast;

public class BridgeApplicationModule extends ReactContextBaseJavaModule {

    BridgeApplicationModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "BridgeApplicationModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void runNativeCode(String message) {
        try {
            Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}