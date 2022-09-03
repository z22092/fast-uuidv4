{
    "targets": [
        {
            "target_name": "uuid",
            "sources": ["<!@(node scripts/sources.js)"],
            "cflags": ["-march=native", "-Wno-cast-function-type"],
            "cflags_cc": ["-Xlinker", "-lc++"],
            "include_dirs": [
                "${workspaceRoot}",
            ],
        }
    ]
}
