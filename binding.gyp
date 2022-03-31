{
    "targets": [
        {
            "target_name": "uuid",
            "sources": ["src/uuid.cc"],
            "conditions": [
                [
                    'OS=="mac"',
                    {
                        "xcode_settings": {
                            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",  # -fno-exceptions
                            "GCC_ENABLE_CPP_RTTI": "YES",  # -fno-rtti
                            "MACOSX_DEPLOYMENT_TARGET": "10.7",  # from MAC OS 10.7
                            "OTHER_CFLAGS": [
                                "-DHAVE_CONFIG_H",
                                "-O3",
                                "-Wno-unused-private-field",
                            ],
                        }
                    },
                    {  # OS!="mac"
                        "cflags!": ["-fno-exceptions"],
                        "cflags": ["-march=native", "-DHAVE_CONFIG_H", "-O3"],
                        "cflags_cc": ["-Wall", "-O3", "-fexceptions"],
                        "cflags_cc!": ["-fno-exceptions"],
                        "cflags_cc!": ["-fno-rtti"],
                    },
                ],
            ],
        }
    ]
}
