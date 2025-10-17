import Foundation
import React

@objc(InactivityManager)
class InactivityManager: RCTEventEmitter {
  var timer: Timer?
  var timeoutInterval: TimeInterval = 10.0 
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func startTimer(_ timeoutMs: NSNumber) {
    timeoutInterval = timeoutMs.doubleValue / 1000
    stopTimer()
    timer = Timer.scheduledTimer(withTimeInterval: timeoutInterval, repeats: false) { _ in
      self.sendEvent(withName: "AppLocked", body: nil)
    }
  }
  
  @objc func resetTimer() {
    stopTimer()
    timer = Timer.scheduledTimer(withTimeInterval: timeoutInterval, repeats: false) { _ in
      self.sendEvent(withName: "AppLocked", body: nil)
    }
  }
  
  @objc func stopTimer() {
    if let timer = timer {
      timer.invalidate()
    }
    timer = nil
  }
  
  override func supportedEvents() -> [String]! {
    return ["AppLocked"]
  }
  
  override func startObserving() {
  }
  
  override func stopObserving() {
    
    stopTimer()
  }
}