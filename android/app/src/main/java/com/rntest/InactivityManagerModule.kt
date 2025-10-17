package com.rntest

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class InactivityManagerModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext) {

    private val handler = Handler(Looper.getMainLooper())
    private var inactivityTimeout: Long = 10000 // 10 seconds
    private var runnable: Runnable? = null
    private var listenerCount = 0

    override fun getName() = "InactivityManager"

    @ReactMethod
    fun startTimer(timeout: Int) {
        inactivityTimeout = timeout.toLong()
        stopTimer()
        runnable = Runnable {
            sendLockEvent()
        }
        handler.postDelayed(runnable!!, inactivityTimeout)
    }

    @ReactMethod
    fun resetTimer() {
        stopTimer()
        runnable = Runnable {
            sendLockEvent()
        }
        handler.postDelayed(runnable!!, inactivityTimeout)
    }

    @ReactMethod
    fun stopTimer() {
        runnable?.let { handler.removeCallbacks(it) }
        runnable = null
    }

    @ReactMethod
    fun addListener(eventName: String) {
        listenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        listenerCount -= count
        if (listenerCount == 0) {
            stopTimer()
        }
    }

    private fun sendLockEvent() {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("AppLocked", null)
    }
}