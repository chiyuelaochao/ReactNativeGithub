package com.rn_github.react;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rn_github.R;

/**
 * Created by Cai Wei on 5/1/2017.
 */

public class DialogAndroid extends ReactContextBaseJavaModule {


    public DialogAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DialogAndroid";
    }

    @ReactMethod
    public void alert(final Callback successCallback, final Callback errorCallback) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle("Title");
        View layout = LayoutInflater.from(getCurrentActivity()).inflate(R.layout.dialog_layout, null);
        final EditText et_input1 = (EditText) layout.findViewById(R.id.et_input1);
        final EditText et_input2 = (EditText) layout.findViewById(R.id.et_input2);
        builder.setView(layout);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                try {
                    String str = et_input1.getText().toString() + et_input2.getText().toString();
                    String result = str;
                    successCallback.invoke(result);
                } catch (Exception e) {
                    e.printStackTrace();
                    errorCallback.invoke(e.getMessage());
                }
            }
        });

        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });

        builder.create().show();
    }
}
