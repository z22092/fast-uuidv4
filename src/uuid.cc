#include <node.h>
#include "uuid_v4.h"

namespace package
{

  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::String;
  using v8::Value;

  UUID::UUIDGenerator<std::mt19937_64> uuidGenerator;
  UUID::UUID uuid = uuidGenerator.getUUID();

  void v4(const FunctionCallbackInfo<Value> &args)
  {
    std::string s = uuid.str();
    const char *c = s.c_str();

    Isolate *isolate = args.GetIsolate();
    args.GetReturnValue()
        .Set(String::NewFromUtf8(
                 isolate, c)
                 .ToLocalChecked());
  }

  void Initialize(Local<Object> exports)
  {
    NODE_SET_METHOD(exports, "uuidV4", v4);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}