{
    "targets": [
        {
            "target_name": "uuid",
            "sources": [
                "src/uuid.cc",
                "uuid_v4.h",
                "endianness.h"
            ],
            "cflags":[
                "-march=native"
            ]
        }
    ]
}
