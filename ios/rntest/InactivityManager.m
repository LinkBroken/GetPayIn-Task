#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(InactivityManager, RCTEventEmitter)

RCT_EXTERN_METHOD(startTimer:(nonnull NSNumber *)timeoutMs)
RCT_EXTERN_METHOD(resetTimer)
RCT_EXTERN_METHOD(stopTimer)

@end