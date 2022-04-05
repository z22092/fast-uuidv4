#include <node.h>
#include "./uuid4/src/uuid4.h"

namespace uuidV4Other
{

	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::NewStringType;
	using v8::Object;
	using v8::String;
	using v8::Value;

	UUID4_STATE_T state_c_v4;
	UUID4_T uuid_c_v4;

	void c_gen_v4(const FunctionCallbackInfo<Value> &args)
	{
		uuid4_seed(&state_c_v4);
		uuid4_gen(&state_c_v4, &uuid_c_v4);

		char buffer[UUID4_STR_BUFFER_SIZE];

		if (!uuid4_to_s(uuid_c_v4, buffer, sizeof(buffer)))
			exit(EXIT_FAILURE);

		buffer[UUID4_STR_BUFFER_SIZE - 1] = 0;

		Isolate *isolate = args.GetIsolate();

		args.GetReturnValue()
				.Set(String::NewFromUtf8(
								 isolate, buffer, NewStringType::kNormal)
								 .ToLocalChecked());
	}

	void Initialize(Local<Object> exports)
	{
		NODE_SET_METHOD(exports, "c", c_gen_v4);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}
